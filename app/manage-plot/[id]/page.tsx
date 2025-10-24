"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  Box, 
  Eye, 
  Settings, 
  Trash2, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  ArrowLeft,
  Store,
  Calendar,
  Clock
} from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { useWallet } from "@/hooks/use-wallet"
import { getFaberplotPrice } from "@/lib/plot-prices"

// Function to get store images for faberplots (only for plots 1-4)
const getStoreImage = (plotNumber: number): string => {
  if (plotNumber <= 4) {
    const storeNumber = plotNumber // Direct mapping for plots 1-4
    const imageNumber = 1 // Use first image for now
    return `/images/stores/store${storeNumber}/store${storeNumber}-image${imageNumber}.jpg`
  }
  // For plots 5-48, use original Faberge eggs logic
  const eggIndex = (plotNumber - 1) % 8
  const eggImages = [
    "/images/faberge-eggs/crystal-amber.jpeg",
    "/images/faberge-eggs/amber-glow.png", 
    "/images/faberge-eggs/ruby-red.png",
    "/images/faberge-eggs/emerald-green.png",
    "/images/faberge-eggs/bronze-glow.png",
    "/images/faberge-eggs/rose-quartz.jpeg",
    "/images/faberge-eggs/sapphire-blue.png",
    "/images/faberge-eggs/fire-opal.png"
  ]
  return eggImages[eggIndex]
}

interface Plot {
  id: number
  name: string
  description: string
  image: string
  location: string
  size: string
  visitors: number
  features: string[]
  monthlyRent: number
  rentalStartDate: string
  rentalEndDate: string
  selectedTerm: "monthly" | "quarterly" | "yearly"
  totalPrice: number
}

interface UploadedObject {
  id: string
  name: string
  type: "clothing" | "furniture" | "electronics" | "vehicles" | "other"
  file: File
  preview: string
  uploadDate: Date
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
}

export default function ManagePlotPage() {
  const params = useParams()
  const router = useRouter()
  const plotId = parseInt(params.id as string)
  const { isConnected, address, isLoading: walletLoading } = useWallet()
  
  const [plot, setPlot] = useState<Plot | null>(null)
  const [uploadedObjects, setUploadedObjects] = useState<UploadedObject[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [objectName, setObjectName] = useState("")
  const [objectType, setObjectType] = useState<UploadedObject["type"]>("other")
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Handle wallet disconnection - redirect to main page
  useEffect(() => {
    // Don't redirect immediately, give wallet time to reconnect
    const timer = setTimeout(() => {
      if (!walletLoading && !isConnected) {
        console.log('Manage plot: Not connected after timeout, redirecting to home')
        router.push('/')
      }
    }, 3000) // Wait 3 seconds for wallet to reconnect

    return () => clearTimeout(timer)
  }, [isConnected, walletLoading, router])

  // Load plot data and verify ownership
  useEffect(() => {
    const loadPlotData = async () => {
      if (!isConnected) return // Don't load data if not connected
      
      try {
        // Get user's plots from server
        const response = await fetch(`/api/user-plots?address=${address}`)
        if (response.ok) {
          const userPlots = await response.json()
          const foundPlot = userPlots.find((p: any) => p.id === plotId)
          
          if (foundPlot) {
            // Check if the plot is still active (not expired)
            const endDate = new Date(foundPlot.rentalEndDate)
            const now = new Date()
            const isExpired = endDate.getTime() <= now.getTime()
            
            if (isExpired) {
              // Plot has expired, redirect to dashboard
              alert('This plot has expired. Please renew your rental to access the management page.')
              router.push('/dashboard')
              return
            }
            
            // Transform the plot data to match our interface
            const plotData: Plot = {
              id: foundPlot.id,
              name: `Faberplot #${foundPlot.id}`,
              description: `Faberplot #${foundPlot.id} - A versatile virtual plot perfect for businesses, galleries, or creative projects.`,
              monthlyRent: getFaberplotPrice(foundPlot.id), // Fixed price from price database
              image: getStoreImage(foundPlot.id),
              location: ["Market District", "Business District", "Arts District", "Entertainment District", "Central District"][foundPlot.id % 5],
              size: foundPlot.id < 15 ? "Small (2,500 sq ft)" : foundPlot.id < 30 ? "Medium (5,000 sq ft)" : "Large (7,500 sq ft)",
              visitors: 100,
              features: foundPlot.id < 15 ? ["Retail Ready", "Affordable", "High Foot Traffic", "Quick Setup", "24/7 Access"] :
                        foundPlot.id < 30 ? ["Corporate Ready", "Meeting Spaces", "Business Hub", "Professional Environment", "Networking Opportunities"] :
                        ["Event Space", "Premium Location", "Creative Hub", "Exclusive Access", "Custom Branding"],
              rentalStartDate: foundPlot.soldAt || new Date().toISOString(),
              rentalEndDate: foundPlot.rentalEndDate || '',
              selectedTerm: "monthly" as const,
              totalPrice: 0
            }
            
            setPlot(plotData)
          } else {
            // User doesn't own this plot, redirect to dashboard
            alert('You do not have access to this plot. Please rent it first.')
            router.push('/dashboard')
          }
        } else {
          console.error('Failed to load user plots')
          alert('Failed to load plot data. Please try again.')
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error loading plot data:', error)
        alert('Error loading plot data. Please try again.')
        router.push('/dashboard')
      }
    }
    
    loadPlotData()
  }, [plotId, router, isConnected, address])

  // Countdown to store launch (September 17th, 2025)
  useEffect(() => {
    const storeLaunchDate = new Date('2025-09-17T00:00:00')
    
    const updateCountdown = () => {
      const now = new Date()
      const timeLeft = storeLaunchDate.getTime() - now.getTime()
      
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        
        setCountdown({ days, hours, minutes, seconds })
      } else {
        // Store has launched!
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('model/') || file?.name.endsWith('.glb') || file?.name.endsWith('.gltf')) {
      setSelectedFile(file)
      setObjectName(file.name.replace(/\.[^/.]+$/, "")) // Remove file extension
    } else {
      alert('Please select a valid 3D model file (.glb, .gltf)')
    }
  }

  // Handle object upload
  const handleUpload = async () => {
    if (!selectedFile || !objectName.trim()) {
      alert('Please select a file and enter a name')
      return
    }

    setIsUploading(true)
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newObject: UploadedObject = {
        id: Date.now().toString(),
        name: objectName,
        type: objectType,
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
        uploadDate: new Date(),
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      }
      
      setUploadedObjects(prev => [...prev, newObject])
      setSelectedFile(null)
      setObjectName("")
      setObjectType("other")
      
      // Save to localStorage
      const storedObjects = JSON.parse(localStorage.getItem(`plot-${plotId}-objects`) || '[]')
      storedObjects.push(newObject)
      localStorage.setItem(`plot-${plotId}-objects`, JSON.stringify(storedObjects))
      
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // Load uploaded objects from localStorage
  useEffect(() => {
    if (plotId) {
      const storedObjects = JSON.parse(localStorage.getItem(`plot-${plotId}-objects`) || '[]')
      setUploadedObjects(storedObjects)
    }
  }, [plotId])

  // Delete object
  const handleDeleteObject = (objectId: string) => {
    setUploadedObjects(prev => prev.filter(obj => obj.id !== objectId))
    
    // Update localStorage
    const storedObjects = JSON.parse(localStorage.getItem(`plot-${plotId}-objects`) || '[]')
    const updatedObjects = storedObjects.filter((obj: UploadedObject) => obj.id !== objectId)
    localStorage.setItem(`plot-${plotId}-objects`, JSON.stringify(updatedObjects))
  }

  // Show loading state while wallet is connecting
  if (walletLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <MetaverseNavbar />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
            <p className="text-zinc-400">Connecting wallet...</p>
          </div>
        </div>
        <MetaverseFooter />
      </div>
    )
  }

  // Redirect if wallet is not connected
  if (!isConnected) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <MetaverseNavbar />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 rounded-full border-4 border-red-500 flex items-center justify-center">
              <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-zinc-400 mb-4">Please connect your wallet to access plot management.</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
        <MetaverseFooter />
      </div>
    )
  }

  if (!plot) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <MetaverseNavbar />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
            <p className="text-zinc-400">Loading plot...</p>
          </div>
        </div>
        <MetaverseFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Header */}
      <section className="border-b border-amber-700/20 bg-gradient-to-r from-amber-900/20 to-transparent">
        <div className="container px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-amber-400 hover:text-amber-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden">
              <Image src={plot.image} alt={plot.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{plot.name}</h1>
              <p className="text-zinc-300">{plot.location} • {plot.size}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Launch Countdown */}
      <section className="border-b border-amber-700/20 bg-gradient-to-r from-green-900/20 to-amber-900/20">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            <Store className="h-6 w-6 text-green-400" />
            <h2 className="text-xl font-semibold text-green-400">Store Launch Countdown</h2>
            <Calendar className="h-6 w-6 text-green-400" />
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.days}</div>
              <div className="text-sm text-zinc-400">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.hours}</div>
              <div className="text-sm text-zinc-400">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.minutes}</div>
              <div className="text-sm text-zinc-400">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.seconds}</div>
              <div className="text-sm text-zinc-400">Seconds</div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-zinc-300">
            Get ready! The Faberland Store opens on September 10th, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8">
        <div className="container px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-zinc-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="upload">Upload 3D Objects</TabsTrigger>
              <TabsTrigger value="viewer">3D Viewer</TabsTrigger>
              <TabsTrigger value="objects">My Objects</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white">Plot Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-400">Location:</span>
                        <p className="font-medium text-white">{plot.location}</p>
                      </div>
                      <div>
                        <span className="text-zinc-400">Size:</span>
                        <p className="font-medium text-white">{plot.size}</p>
                      </div>
                      <div>
                        <span className="text-zinc-400">Monthly Rent:</span>
                        <p className="font-medium text-white">${plot.monthlyRent}</p>
                      </div>
                      <div>
                        <span className="text-zinc-400">Visitors:</span>
                        <p className="font-medium text-white">{plot.visitors.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-zinc-400">Features:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {plot.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="border-amber-700/30 text-amber-400">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={() => setActiveTab("upload")}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload 3D Object
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("viewer")}
                      variant="outline"
                      className="w-full border-amber-500 text-amber-400 hover:bg-amber-950/20"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View 3D Scene
                    </Button>
                                          <Button 
                        onClick={() => setActiveTab("objects")}
                        variant="outline"
                        className="w-full border-amber-500 text-amber-400 hover:bg-amber-950/20"
                      >
                        <Box className="mr-2 h-4 w-4" />
                        Manage Objects
                      </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">Upload 3D Objects</CardTitle>
                  <CardDescription className="text-zinc-300">
                    Upload 3D models to display on your plot. Supported formats: .glb, .gltf
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="object-name">Object Name</Label>
                    <Input
                      id="object-name"
                      value={objectName}
                      onChange={(e) => setObjectName(e.target.value)}
                      placeholder="Enter object name"
                      className="border-amber-700/50 bg-zinc-900/50 text-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="object-type">Object Type</Label>
                    <select
                      id="object-type"
                      value={objectType}
                      onChange={(e) => setObjectType(e.target.value as UploadedObject["type"])}
                      className="w-full rounded-md border border-amber-700/50 bg-zinc-900/50 px-3 py-2 text-white"
                    >
                      <option value="clothing">Clothing & Accessories</option>
                      <option value="furniture">Furniture</option>
                      <option value="electronics">Electronics</option>
                      <option value="vehicles">Vehicles</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="file-upload">3D Model File</Label>
                    <div className="border-2 border-dashed border-amber-700/50 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-amber-400 mb-4" />
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".glb,.gltf,model/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-amber-400 hover:text-amber-300 font-medium">
                          Click to select file
                        </span>
                        <span className="text-zinc-400"> or drag and drop</span>
                      </Label>
                      <p className="text-sm text-zinc-500 mt-2">
                        {selectedFile ? `Selected: ${selectedFile.name}` : "No file selected"}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleUpload}
                    disabled={!selectedFile || !objectName.trim() || isUploading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  >
                    {isUploading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Object
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="viewer" className="mt-0">
              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">3D Scene Viewer</CardTitle>
                  <CardDescription className="text-zinc-300">
                    View and interact with your 3D objects in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg border border-amber-700/30 flex items-center justify-center">
                    {uploadedObjects.length > 0 ? (
                      <div className="text-center">
                        <Box className="mx-auto h-16 w-16 text-amber-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">3D Scene Ready</h3>
                        <p className="text-zinc-400 mb-4">
                          {uploadedObjects.length} object{uploadedObjects.length !== 1 ? 's' : ''} loaded
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm" className="border-amber-500 text-amber-400">
                            <RotateCcw className="mr-1 h-3 w-3" />
                            Reset View
                          </Button>
                          <Button variant="outline" size="sm" className="border-amber-500 text-amber-400">
                            <ZoomIn className="mr-1 h-3 w-3" />
                            Zoom In
                          </Button>
                          <Button variant="outline" size="sm" className="border-amber-500 text-amber-400">
                            <ZoomOut className="mr-1 h-3 w-3" />
                            Zoom Out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Box className="mx-auto h-16 w-16 text-zinc-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Objects Yet</h3>
                        <p className="text-zinc-400 mb-4">
                          Upload some 3D objects to see them here
                        </p>
                        <Button 
                          onClick={() => setActiveTab("upload")}
                          className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload First Object
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objects" className="mt-0">
              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">My 3D Objects</CardTitle>
                  <CardDescription className="text-zinc-300">
                    Manage your uploaded 3D objects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {uploadedObjects.length === 0 ? (
                    <div className="text-center py-12">
                      <Box className="mx-auto h-16 w-16 text-zinc-600 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Objects Yet</h3>
                      <p className="text-zinc-400 mb-4">
                        Start by uploading your first 3D object
                      </p>
                      <Button 
                        onClick={() => setActiveTab("upload")}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload First Object
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {uploadedObjects.map((object) => (
                        <Card key={object.id} className="border-amber-700/30 bg-zinc-800/50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-white">{object.name}</h4>
                                <p className="text-sm text-zinc-400 capitalize">{object.type}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteObject(object.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="aspect-square bg-zinc-900 rounded-lg border border-amber-700/30 flex items-center justify-center mb-3">
                              <Box className="h-8 w-8 text-amber-400" />
                            </div>
                            <div className="text-xs text-zinc-400">
                              Uploaded: {object.uploadDate.toLocaleDateString()}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}
