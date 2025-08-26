"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Gem, Clock, Tag, ExternalLink, Settings, Users, Home, DoorOpen } from "lucide-react"
import { loadStripe } from '@stripe/stripe-js'
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
// Removed thirdweb import - using Stripe now
import { useRouter } from "next/navigation"
import { PlotDatabase } from "@/lib/database"
import { useWallet } from "@/hooks/use-wallet"

interface NFT {
  id: string
  name: string
  type: "land" | "portal"
  description: string
  image: string
  location: string
  size: string
  visitors: number
  features: string[]
  opensea?: string
  rentalStatus?: "available" | "rented" | "none"
  rentalEndDate?: string
}

interface Faberplot {
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

export default function DashboardPage() {
  const router = useRouter()
  const { isConnected, address, isLoading: walletLoading } = useWallet()
  const [activeTab, setActiveTab] = useState("overview")
  const [nfts, setNfts] = useState<NFT[]>([])
  const [faberplots, setFaberplots] = useState<Faberplot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successDetails, setSuccessDetails] = useState<any>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRenewing, setIsRenewing] = useState<number | null>(null)

  // Handle wallet disconnection - redirect to main page
  useEffect(() => {
    if (!walletLoading && !isConnected) {
      router.push('/')
    }
  }, [isConnected, walletLoading, router])

  // Load NFTs and Faberplots
  useEffect(() => {
    if (!isConnected) return // Don't load data if not connected
    
    setIsLoading(true)
    // Simulate loading NFTs from blockchain
    setTimeout(() => {
      setNfts([
        {
          id: "crystal-amber",
          name: "Crystal Amber Estate",
          type: "land",
          description: "A premium crystal estate with amber accents, located in the central district of Faberland.",
          image: "/images/faberge-eggs/crystal-amber.jpeg",
          location: "Central District",
          size: "Large (10,000 sq ft)",
          visitors: 5200,
          features: ["Water View", "High Traffic", "Premium Location"],
          opensea: "https://opensea.io/collection/faberland",
          rentalStatus: "available"
        }
      ])
      
      // Load Faberplots from server database
      const userPlots = PlotDatabase.getUserPlots(address || '')
      console.log('Loaded Faberplots from database:', userPlots)
      setFaberplots(userPlots.map(plot => ({
        id: plot.id,
        name: `Faberplot #${plot.id}`,
        description: `Faberplot #${plot.id} - A versatile virtual plot perfect for businesses, galleries, or creative projects.`,
        monthlyRent: 40 + Math.floor(Math.random() * 41), // Random price between $40-$80
        image: (plot.id % 8 === 0) ? "/images/faberge-eggs/crystal-amber.jpeg" :
               (plot.id % 8 === 1) ? "/images/faberge-eggs/amber-glow.png" :
               (plot.id % 8 === 2) ? "/images/faberge-eggs/ruby-red.png" :
               (plot.id % 8 === 3) ? "/images/faberge-eggs/emerald-green.png" :
               (plot.id % 8 === 4) ? "/images/faberge-eggs/bronze-glow.png" :
               (plot.id % 8 === 5) ? "/images/faberge-eggs/rose-quartz.jpeg" :
               (plot.id % 8 === 6) ? "/images/faberge-eggs/sapphire-blue.png" :
               "/images/faberge-eggs/fire-opal.png",
        location: ["Market District", "Business District", "Arts District", "Entertainment District", "Central District"][plot.id % 5],
        size: plot.id < 15 ? "Small (2,500 sq ft)" : plot.id < 30 ? "Medium (5,000 sq ft)" : "Large (7,500 sq ft)",
        visitors: 1500 + (plot.id * 100),
        features: plot.id < 15 ? ["Retail Ready", "Affordable", "High Foot Traffic", "Quick Setup", "24/7 Access"] :
                  plot.id < 30 ? ["Corporate Ready", "Meeting Spaces", "Business Hub", "Professional Environment", "Networking Opportunities"] :
                  ["Event Space", "Premium Location", "Creative Hub", "Exclusive Access", "Custom Branding"],
        rentalStartDate: plot.soldAt || new Date().toISOString(),
        rentalEndDate: plot.rentalEndDate || '',
        selectedTerm: "monthly" as const,
        totalPrice: 0
      })))
      
      // Also check database status
      fetch('/api/database-status')
        .then(response => response.json())
        .then(data => {
          console.log('Database status:', data)
        })
        .catch(error => {
          console.error('Error fetching database status:', error)
        })
      
      setIsLoading(false)
    }, 1000)
  }, [isConnected]) // Run when wallet connection changes

  // Real-time countdown for expiring plots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  // Handle expired plots - separate from rendering
  useEffect(() => {
    if (!isConnected) return // Don't process if not connected
    
    // Only check for expired plots if we have plots
    const userFaberplots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
    if (userFaberplots.length === 0) return

    const now = currentTime
    let hasExpiredPlots = false
    let updatedFaberplots = [...userFaberplots]

    // Check if any plots are expired or expiring soon (within the next minute)
    const hasExpiringPlots = userFaberplots.some((plot: any) => {
      const endDate = new Date(plot.rentalEndDate)
      const timeLeft = endDate.getTime() - now.getTime()
      return timeLeft <= 60 * 1000 // Within 1 minute
    })

    // Only process if there are plots that could expire soon
    if (hasExpiringPlots) {
      userFaberplots.forEach((plot: any) => {
        const endDate = new Date(plot.rentalEndDate)
        const timeLeft = endDate.getTime() - now.getTime()
        const isExpired = timeLeft <= 0

        if (isExpired) {
          // Remove from database to make it available again
          PlotDatabase.removeExpiredPlots()

          // Mark for removal from userFaberplots
          hasExpiredPlots = true
          updatedFaberplots = updatedFaberplots.filter((p: any) => p.id !== plot.id)
        }
      })

      // Update state only if there were expired plots
      if (hasExpiredPlots) {
        localStorage.setItem('userFaberplots', JSON.stringify(updatedFaberplots))
        setFaberplots(updatedFaberplots)
      }
    }
  }, [currentTime, isConnected]) // Only run when currentTime changes or connection status changes

  // No pending rental logic needed - using Stripe directly

  // Handle URL parameters for rental flow
  useEffect(() => {
    if (!isConnected) return // Don't process if not connected
    
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const sessionId = urlParams.get('session_id')
    const plotId = urlParams.get('plot_id')
    const isRenewal = urlParams.get('renewal') === 'true'
    
    if (success === 'true' && sessionId) {
      // Stripe payment was successful
      const plotIdNum = plotId ? parseInt(plotId) : null
      
      // Handle renewal or new rental
      if (plotIdNum) {
        if (isRenewal) {
          // Handle renewal - extend the existing plot's rental period
          const userFaberplots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
          const existingPlotIndex = userFaberplots.findIndex((plot: any) => plot.id === plotIdNum)
          
                     if (existingPlotIndex !== -1) {
             const existingPlot = userFaberplots[existingPlotIndex]
             const currentEndDate = new Date(existingPlot.rentalEndDate)
             const newEndDate = new Date(currentEndDate.getTime() + 30 * 24 * 60 * 60 * 1000) // Add 30 days
             
             // Update the existing plot's end date
             userFaberplots[existingPlotIndex] = {
               ...existingPlot,
               rentalEndDate: newEndDate.toISOString()
             }
             
             localStorage.setItem('userFaberplots', JSON.stringify(userFaberplots))
             setFaberplots(userFaberplots)
             // Don't call setRefreshTrigger here to avoid infinite loop
           }
        } else {
          // Handle new rental - mark plot as sold in database
          if (!PlotDatabase.isPlotSold(plotIdNum)) {
            // This will be handled by the Stripe webhook, but for now we'll mark it here
            // In production, this should be handled server-side after successful payment
            PlotDatabase.markPlotAsSold(plotIdNum, 'temp-wallet', 'temp-email', 'monthly')
          }
          
          // Add the plot to user's Faberplots
          const newPlot = {
            id: plotIdNum,
            name: `Faberplot #${plotIdNum}`,
            description: `A premium virtual plot in the heart of Faberland, perfect for building your digital empire.`,
            image: plotIdNum % 8 === 0 ? "/images/faberge-eggs/crystal-amber.jpeg" :
                   plotIdNum % 8 === 1 ? "/images/faberge-eggs/amber-glow.png" :
                   plotIdNum % 8 === 2 ? "/images/faberge-eggs/ruby-red.png" :
                   plotIdNum % 8 === 3 ? "/images/faberge-eggs/emerald-green.png" :
                   plotIdNum % 8 === 4 ? "/images/faberge-eggs/bronze-glow.png" :
                   plotIdNum % 8 === 5 ? "/images/faberge-eggs/rose-quartz.jpeg" :
                   plotIdNum % 8 === 6 ? "/images/faberge-eggs/sapphire-blue.png" :
                   "/images/faberge-eggs/fire-opal.png",
            location: "Faberland District",
            size: "Medium (5,000 sq ft)",
            visitors: Math.floor(Math.random() * 1000) + 500,
            features: ["Premium Location", "High Traffic", "Development Ready"],
            monthlyRent: Math.floor(Math.random() * 40) + 40, // $40-$80
            rentalStartDate: new Date().toISOString(),
            rentalEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            selectedTerm: "monthly" as const,
            totalPrice: Math.floor(Math.random() * 40) + 40
          }
          
          // Add to user's Faberplots
          const userFaberplots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
          const existingPlotIndex = userFaberplots.findIndex((plot: any) => plot.id === plotIdNum)
          
                     if (existingPlotIndex === -1) {
             userFaberplots.push(newPlot)
             localStorage.setItem('userFaberplots', JSON.stringify(userFaberplots))
             setFaberplots(userFaberplots) // Update the state immediately
             // Don't call setRefreshTrigger here to avoid infinite loop
           }
        }
      }
      
      setSuccessDetails({
        sessionId,
        plotId: plotIdNum,
        message: isRenewal 
          ? 'Renewal successful! Your Faberplot rental has been extended.'
          : 'Payment successful! Your Faberplot rental has been activated.'
      })
      setShowSuccessMessage(true)
      // Clean up URL
      router.replace('/dashboard')
    }
     }, [router]) // Only depend on router

  // Handle plot renewal
  const handleRenewPlot = async (plot: Faberplot) => {
    try {
      setIsRenewing(plot.id)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plotId: plot.id,
          plotName: plot.name,
          plotImage: plot.image,
          monthlyRent: plot.monthlyRent,
          isRenewal: true, // Flag to indicate this is a renewal
          currentEndDate: plot.rentalEndDate
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Stripe checkout error:', error)
          alert('Payment failed. Please try again.')
        }
      }
    } catch (error) {
      console.error('Renewal error:', error)
      alert('Failed to process renewal. Please try again.')
    } finally {
      setIsRenewing(null)
    }
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
            <p className="text-zinc-400 mb-4">Please connect your wallet to access the dashboard.</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-zinc-300">Manage your virtual assets and properties</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
                <p className="text-zinc-400">Loading your assets...</p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                             <TabsList className="mb-8 bg-zinc-900">
                 <TabsTrigger value="overview">Overview</TabsTrigger>
                 <TabsTrigger value="land">Land</TabsTrigger>
                 <TabsTrigger value="faberplots">Faberplots</TabsTrigger>
                 <TabsTrigger value="rentals">Rentals</TabsTrigger>
               </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-amber-400" />
                        <CardTitle className="text-white">Total Land</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-white">{nfts.filter(nft => nft.type === "land").length}</p>
                      <p className="text-sm text-white">Virtual properties owned</p>
                    </CardContent>
                  </Card>

                                     <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                     <CardHeader>
                       <div className="flex items-center gap-2">
                         <DoorOpen className="h-5 w-5 text-amber-400" />
                         <CardTitle className="text-white">Rented Faberplots</CardTitle>
                       </div>
                     </CardHeader>
                     <CardContent>
                       <p className="text-3xl font-bold text-white">{faberplots.length}</p>
                       <p className="text-sm text-white">Active rentals</p>
                     </CardContent>
                   </Card>

                  <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-400" />
                        <CardTitle className="text-white">Total Visitors</CardTitle>
                      </div>
                    </CardHeader>
                                         <CardContent>
                       <p className="text-3xl font-bold text-white">
                         {(nfts.reduce((sum, nft) => sum + nft.visitors, 0) + 
                           faberplots.reduce((sum, plot) => sum + plot.visitors, 0)).toLocaleString()}
                       </p>
                       <p className="text-sm text-white">Across all properties</p>
                     </CardContent>
                  </Card>

                  <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-400" />
                        <CardTitle className="text-white">Active Rentals</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-white">{nfts.filter(nft => nft.rentalStatus === "rented").length}</p>
                      <p className="text-sm text-white">Currently rented out</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h2 className="mb-4 text-2xl font-bold">Recent Activity</h2>
                  <div className="rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
                    <p className="text-zinc-400">No recent activity to display</p>
                  </div>
                </div>

                {/* Database Reset Section */}
                <div className="mt-8">
                  <h2 className="mb-4 text-2xl font-bold">Developer Tools</h2>
                  <div className="rounded-xl border border-red-700/30 bg-zinc-900/50 p-6 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-red-400 mb-2">Reset Database</h3>
                        <p className="text-zinc-400 text-sm">Clear all plot data for testing purposes</p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Environment: {typeof window !== 'undefined' ? window.location.hostname : 'Unknown'}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-red-500 text-red-400 hover:bg-red-950/20"
                        onClick={async () => {
                          console.log('Reset button clicked')
                          console.log('Current environment:', window.location.hostname)
                          
                          if (confirm('Are you sure you want to reset all plot data? This action cannot be undone.')) {
                            console.log('User confirmed reset')
                            try {
                              console.log('Making API call to reset database...')
                              const response = await fetch('/api/reset-database', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                              })
                              
                              console.log('Response status:', response.status)
                              console.log('Response ok:', response.ok)
                              
                              if (response.ok) {
                                const result = await response.json()
                                console.log('Reset result:', result)
                                alert('✅ Database reset successfully! All plots are now available.')
                                window.location.reload()
                              } else {
                                const errorText = await response.text()
                                console.error('Reset failed:', errorText)
                                alert('❌ Failed to reset database: ' + errorText)
                              }
                            } catch (error) {
                              console.error('Reset error:', error)
                              alert('❌ Error resetting database: ' + error)
                            }
                          }
                        }}
                      >
                        Reset All Data
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="land" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {nfts.filter(nft => nft.type === "land").map((nft) => (
                    <Card key={nft.id} className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                      <div className="relative aspect-square">
                        <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white">{nft.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {nft.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-zinc-300">{nft.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="rounded-md bg-zinc-800/50 p-2">
                            <span className="text-white">Size</span>
                            <p className="font-medium text-white">{nft.size}</p>
                          </div>
                          <div className="rounded-md bg-zinc-800/50 p-2">
                            <span className="text-white">Visitors</span>
                            <p className="font-medium text-white">{nft.visitors.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {nft.features.map((feature, index) => (
                            <Badge key={`${nft.id}-feature-${index}`} variant="outline" className="border-amber-700/30 text-amber-400">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-950/20">
                            <Settings className="mr-2 h-4 w-4" /> Manage
                          </Button>
                          {nft.opensea && (
                            <a
                              href={nft.opensea}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
                            >
                              <span>View on OpenSea</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

                             <TabsContent value="faberplots" className="mt-0">
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                   {faberplots.length === 0 ? (
                     <div className="col-span-full text-center py-12">
                       <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-amber-500/30 flex items-center justify-center">
                         <DoorOpen className="h-8 w-8 text-amber-400" />
                       </div>
                       <h3 className="text-xl font-semibold mb-2">No Faberplots Rented</h3>
                       <p className="text-zinc-400 mb-4">You haven't rented any Faberplots yet.</p>
                       <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                         <Link href="/marketplace">Browse Faberplots</Link>
                       </Button>
                     </div>
                                       ) : (
                      faberplots.map((plot) => {
                        const endDate = new Date(plot.rentalEndDate)
                        const now = currentTime // Use currentTime for real-time updates
                        const timeLeft = endDate.getTime() - now.getTime()
                        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))
                        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
                        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
                        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)
                        const isExpired = timeLeft <= 0
                        const isExpiringSoon = timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000 // Less than 24 hours
                        
                        return (
                         <Card key={plot.id} className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                           <div className="relative aspect-square">
                             <Image src={plot.image} alt={plot.name} fill className="object-cover" />
                             {isExpired ? (
                               <div className="absolute top-4 right-4">
                                 <Badge className="bg-red-500/80 text-white">Expired</Badge>
                               </div>
                             ) : (
                               <div className="absolute top-4 right-4">
                                 <Badge className="bg-emerald-500/80 text-white">Active</Badge>
                               </div>
                             )}
                           </div>
                           <CardHeader>
                             <CardTitle className="text-white">{plot.name}</CardTitle>
                             <CardDescription className="flex items-center gap-1">
                               <MapPin className="h-3 w-3" /> {plot.location}
                             </CardDescription>
                           </CardHeader>
                           <CardContent>
                             <div className="mb-4">
                               <p className="text-zinc-300">{plot.description}</p>
                             </div>
                             
                             {/* Rental Timer */}
                             <div className="mb-4 p-3 rounded-lg bg-zinc-800/50 border border-amber-700/30">
                               <div className="flex items-center justify-between mb-2">
                                 <span className="text-sm text-zinc-400">Rental Period</span>
                                 <span className="text-sm font-medium text-amber-400 capitalize">{plot.selectedTerm}</span>
                               </div>
                                                               {isExpired ? (
                                  <div className="text-red-400 text-sm">Rental expired on {endDate.toLocaleDateString()}</div>
                                ) : isExpiringSoon ? (
                                  <div className="text-orange-400 text-sm font-mono">
                                    {hoursLeft > 0 && `${hoursLeft}h `}
                                    {minutesLeft > 0 && `${minutesLeft}m `}
                                    {secondsLeft}s remaining
                                  </div>
                                ) : (
                                  <div className="text-green-400 text-sm">
                                    {daysLeft} days remaining (expires {endDate.toLocaleDateString()})
                                  </div>
                                )}
                             </div>
                             
                             <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                               <div className="rounded-md bg-zinc-800/50 p-2">
                                 <span className="text-zinc-400">Size</span>
                                 <p className="font-medium text-white">{plot.size}</p>
                               </div>
                               <div className="rounded-md bg-zinc-800/50 p-2">
                                 <span className="text-zinc-400">Monthly Rent</span>
                                 <p className="font-medium text-white">${plot.monthlyRent}</p>
                               </div>
                               <div className="rounded-md bg-zinc-800/50 p-2">
                                 <span className="text-zinc-400">Visitors</span>
                                 <p className="font-medium text-white">{plot.visitors.toLocaleString()}</p>
                               </div>
                               <div className="rounded-md bg-zinc-800/50 p-2">
                                 <span className="text-zinc-400">Total Paid</span>
                                 <p className="font-medium text-white">${plot.totalPrice}</p>
                               </div>
                             </div>
                             
                             <div className="mb-4">
                               <h4 className="text-sm font-medium text-zinc-300 mb-2">Features</h4>
                               <div className="flex flex-wrap gap-2">
                                 {plot.features.slice(0, 3).map((feature, index) => (
                                   <Badge key={`${plot.id}-feature-${index}`} variant="outline" className="border-amber-700/30 text-amber-400 text-xs">
                                     {feature}
                                   </Badge>
                                 ))}
                                 {plot.features.length > 3 && (
                                   <Badge key={`${plot.id}-more-features`} variant="outline" className="border-amber-700/30 text-amber-400 text-xs">
                                     +{plot.features.length - 3} more
                                   </Badge>
                                 )}
                               </div>
                             </div>
                             
                             <div className="flex items-center justify-between">
                               <Button 
                                 variant="outline" 
                                 className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
                                 onClick={() => router.push(`/manage-plot/${plot.id}`)}
                               >
                                 <Settings className="mr-2 h-4 w-4" /> Manage
                               </Button>
                                                               {!isExpired && (
                                  <Button 
                                    variant="outline" 
                                    className="border-green-500 text-green-400 hover:bg-green-950/20"
                                    onClick={() => handleRenewPlot(plot)}
                                    disabled={isRenewing === plot.id}
                                  >
                                    {isRenewing === plot.id ? (
                                      <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-green-400 border-t-transparent"></div>
                                        Processing...
                                      </>
                                    ) : (
                                      'Renew'
                                    )}
                                  </Button>
                                )}
                             </div>
                           </CardContent>
                         </Card>
                       )
                     })
                   )}
                 </div>
               </TabsContent>

              <TabsContent value="rentals" className="mt-0">
                <div className="grid gap-6 md:grid-cols-1">
                  <div className="rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
                    <h3 className="mb-4 text-2xl font-semibold">Rental Properties</h3>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Available for Rent</h3>
                      <div className="space-y-4">
                        {nfts.filter(nft => nft.rentalStatus === "available").map((nft) => (
                          <div key={nft.id} className="rounded-lg bg-zinc-800/50 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-white">{nft.name}</p>
                                <p className="text-sm text-white">{nft.type === "land" ? "Land" : "Portal"}</p>
                              </div>
                              <Button variant="outline" size="sm" className="border-amber-500 text-amber-400 hover:bg-amber-950/20">
                                List for Rent
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="mb-2 text-lg font-semibold">Currently Rented Out</h3>
                      <div className="space-y-4">
                        {nfts.filter(nft => nft.rentalStatus === "rented").map((nft) => (
                          <div key={nft.id} className="rounded-lg bg-zinc-800/50 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-white">{nft.name}</p>
                                <p className="text-sm text-white">{nft.type === "land" ? "Land" : "Portal"}</p>
                              </div>
                              <Button variant="outline" size="sm" className="border-red-500 text-red-400 hover:bg-red-950/20">
                                End Rental
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

             {/* Rental Modal removed - using Stripe directly */}

             {/* Success Message Modal */}
       {showSuccessMessage && successDetails && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
           <div className="mx-4 w-full max-w-md rounded-xl border border-green-700/30 bg-zinc-900 p-6 backdrop-blur">
             <div className="mb-6 text-center">
               <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center">
                 <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
               </div>
               <h2 className="mb-2 text-2xl font-bold text-white">Payment Successful!</h2>
               <p className="text-zinc-300">{successDetails.message}</p>
             </div>

             <div className="mb-6 space-y-4">
               <div className="rounded-lg border border-green-700/30 bg-green-900/20 p-4">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="h-2 w-2 rounded-full bg-green-400"></div>
                   <span className="text-sm font-medium text-green-400">Payment Confirmed</span>
                 </div>
                 <p className="text-xs text-zinc-300">
                   Session ID: {successDetails.sessionId}
                 </p>
                 {successDetails.plotId && (
                   <p className="text-xs text-zinc-300">
                     Faberplot #{successDetails.plotId}
                   </p>
                 )}
               </div>
             </div>

             <div className="flex gap-3">
                               <Button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold"
                                     onClick={() => {
                     setShowSuccessMessage(false)
                     setSuccessDetails(null)
                     // No need to trigger refresh since we already updated the state
                   }}
                >
                  Continue to Dashboard
                </Button>
             </div>
           </div>
         </div>
       )}

       <MetaverseFooter />
     </div>
   )
 } 