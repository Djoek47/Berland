"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  CreditCard, 
  Wallet, 
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { useWallet } from "@/hooks/use-wallet"
import { redirectToCheckout } from "@/lib/stripe-client"

// Types
interface Faberplot {
  id: number
  name: string
  description: string
  monthlyRent: number
  image: string
  location: string
  size: string
  visitors: number
  features: string[]
  rentalStartDate: string
  rentalEndDate: string
  selectedTerm: 'monthly' | 'quarterly' | 'yearly'
  totalPrice: number
}

interface NFT {
  id: string
  name: string
  type: string
  description: string
  image: string
  location: string
  size: string
  visitors: number
  features: string[]
  opensea: string
  rentalStatus: string
}

interface SuccessDetails {
  sessionId: string
  plotId: number | null
  message: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("faberplots")
  const [nfts, setNfts] = useState<NFT[]>([])
  const [faberplots, setFaberplots] = useState<Faberplot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRenewing, setIsRenewing] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successDetails, setSuccessDetails] = useState<SuccessDetails | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isWaitingForWallet, setIsWaitingForWallet] = useState(false)

  // Wallet connection
  const { isConnected, address, isLoading: walletLoading } = useWallet()

  // Redirect if not connected - but be patient with wallet reconnection
  useEffect(() => {
    // Check if we have success parameters (indicating we just came from Stripe)
    const urlParams = new URLSearchParams(window.location.search)
    const hasSuccessParams = urlParams.get('success') === 'true'
    
    if (hasSuccessParams && !isConnected) {
      console.log('Dashboard: Success redirect detected, waiting for wallet reconnection...')
      setIsWaitingForWallet(true)
    }

    // Don't redirect immediately, give wallet time to reconnect after Stripe redirect
    const timer = setTimeout(() => {
      if (!walletLoading && !isConnected) {
        console.log('Dashboard: Not connected after timeout, redirecting to home')
        setIsWaitingForWallet(false)
        router.push('/')
      } else if (isConnected) {
        console.log('Dashboard: Wallet reconnected successfully')
        setIsWaitingForWallet(false)
      }
    }, 5000) // Wait 5 seconds for wallet to reconnect

    return () => clearTimeout(timer)
  }, [isConnected, walletLoading, router])

  // Load user data from server
  useEffect(() => {
    const loadUserData = async () => {
      if (!isConnected || !address) {
        console.log('Dashboard: Not connected or no address, skipping data load')
        setIsLoading(false)
        return
      }

      console.log('Dashboard: Loading data for wallet:', address)
      setIsLoading(true)

      try {
        // Load user's plots from server
        const response = await fetch(`/api/user-plots?address=${address}`)
        if (response.ok) {
          const userPlots = await response.json()
          console.log('Dashboard: Loaded user plots:', userPlots)

          setFaberplots(userPlots.map((plot: any) => ({
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
        } else {
          console.error('Dashboard: Failed to load user plots')
          setFaberplots([])
        }

        // Load mock NFTs (placeholder for now)
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

      } catch (error) {
        console.error('Dashboard: Error loading data:', error)
        setFaberplots([])
        setNfts([])
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [isConnected, address, refreshTrigger])

  // Real-time countdown for expiring plots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  // Handle success redirect from Stripe
  useEffect(() => {
    const handleSuccessRedirect = async () => {
      if (!isConnected) {
        console.log('Dashboard: Not connected, skipping success redirect')
        return
      }

      const urlParams = new URLSearchParams(window.location.search)
      const success = urlParams.get('success')
      const sessionId = urlParams.get('session_id')
      const plotId = urlParams.get('plot_id')
      const isRenewal = urlParams.get('renewal') === 'true'

      console.log('Dashboard: Checking URL params:', { success, sessionId, plotId, isRenewal })
      console.log('Dashboard: Current URL:', window.location.href)

      if (success === 'true' && sessionId && plotId) {
        console.log('Dashboard: Processing successful payment for plot:', plotId)
        
        // Mark plot as sold via API
        try {
          const markResponse = await fetch('/api/test-mark-sold', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              plotId: parseInt(plotId),
              userAddress: address,
              userEmail: 'user@email.com',
              rentalTerm: 'monthly'
            }),
          })

          if (markResponse.ok) {
            const result = await markResponse.json()
            console.log('Dashboard: Plot marked as sold:', result)
          } else {
            console.error('Dashboard: Failed to mark plot as sold')
          }
        } catch (error) {
          console.error('Dashboard: Error marking plot as sold:', error)
        }

        setSuccessDetails({
          sessionId,
          plotId: parseInt(plotId),
          message: isRenewal 
            ? 'Renewal successful! Your Faberplot rental has been extended.'
            : 'Payment successful! Your Faberplot rental has been activated.'
        })
        setShowSuccessMessage(true)

        // Force refresh of dashboard data
        setRefreshTrigger(prev => prev + 1)

        // Clean up URL
        router.replace('/dashboard')
      }
    }

    handleSuccessRedirect()
  }, [isConnected, address, router])

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
          isRenewal: true,
          currentEndDate: plot.rentalEndDate
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error renewing plot:', error)
      alert('Failed to renew plot. Please try again.')
    } finally {
      setIsRenewing(null)
    }
  }

  // Calculate time remaining for a plot
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = currentTime
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0 }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return { expired: false, days, hours, minutes }
  }

  // Reset database (for testing)
  const handleResetDatabase = async () => {
    try {
      const response = await fetch('/api/reset-database', {
        method: 'POST',
      })
      
      if (response.ok) {
        console.log('Database reset successfully')
        setRefreshTrigger(prev => prev + 1)
      } else {
        console.error('Failed to reset database')
      }
    } catch (error) {
      console.error('Error resetting database:', error)
    }
  }

  // Loading state
  if (walletLoading || isLoading || isWaitingForWallet) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <MetaverseNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent mx-auto"></div>
            <p className="text-zinc-400">
              {isWaitingForWallet ? 'Reconnecting wallet after payment...' : 'Loading your dashboard...'}
            </p>
            <p className="text-zinc-500 text-sm mt-2">
              {isWaitingForWallet ? 'Please wait while we restore your connection' : 'Please wait...'}
            </p>
          </div>
        </div>
        <MetaverseFooter />
      </div>
    )
  }

  // Not connected state
  if (!isConnected) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <MetaverseNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Wallet className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Wallet Required</h1>
            <p className="text-zinc-400 mb-6">Please connect your wallet to access your dashboard.</p>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
        <MetaverseFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4">
          <div className="mb-8 text-center">
            <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
              Personal Dashboard
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to Your Faberland
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-300 sm:text-xl">
              Manage your virtual real estate portfolio, track your investments, and explore new opportunities in the metaverse.
            </p>
          </div>

          {/* Wallet Info */}
          <Card className="mb-8 border-amber-700/30 bg-zinc-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Wallet className="h-6 w-6 text-amber-400" />
                  <div>
                    <p className="text-sm text-zinc-400">Connected Wallet</p>
                    <p className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                  onClick={() => setRefreshTrigger(prev => prev + 1)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 border border-amber-700/30">
              <TabsTrigger value="faberplots" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Faberplots ({faberplots.length})
              </TabsTrigger>
              <TabsTrigger value="nfts" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                NFTs ({nfts.length})
              </TabsTrigger>
            </TabsList>

            {/* Faberplots Tab */}
            <TabsContent value="faberplots" className="mt-8">
              {faberplots.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-amber-500 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Faberplots Yet</h3>
                  <p className="text-zinc-400 mb-6">Start building your virtual real estate portfolio by renting your first Faberplot.</p>
                  <Button asChild>
                    <Link href="/marketplace">Browse Marketplace</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {faberplots.map((plot) => {
                    const timeRemaining = getTimeRemaining(plot.rentalEndDate)
                    const isExpiringSoon = !timeRemaining.expired && timeRemaining.days <= 7

                    return (
                      <Card key={plot.id} className="border-amber-700/30 bg-zinc-900/50 overflow-hidden">
                        <div className="relative aspect-video">
                          <Image src={plot.image} alt={plot.name} fill className="object-cover" />
                          <div className="absolute top-2 right-2">
                            {timeRemaining.expired ? (
                              <Badge className="bg-red-500/80 text-white">
                                Expired
                              </Badge>
                            ) : isExpiringSoon ? (
                              <Badge className="bg-orange-500/80 text-white">
                                Expiring Soon
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500/80 text-white">
                                Active
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-white">{plot.name}</CardTitle>
                          <CardDescription className="text-zinc-400">{plot.location}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-amber-400" />
                              <span>{plot.visitors.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-amber-400" />
                              <span>${plot.monthlyRent}/mo</span>
                            </div>
                          </div>

                          {/* Time Remaining */}
                          {!timeRemaining.expired ? (
                            <div className="bg-zinc-800/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-4 w-4 text-amber-400" />
                                <span className="text-sm font-medium">Time Remaining</span>
                              </div>
                              <div className="text-sm text-zinc-300">
                                {timeRemaining.days > 0 && `${timeRemaining.days}d `}
                                {timeRemaining.hours > 0 && `${timeRemaining.hours}h `}
                                {timeRemaining.minutes}m
                              </div>
                            </div>
                          ) : (
                            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-red-400" />
                                <span className="text-sm text-red-400">Rental expired</span>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
                              onClick={() => handleRenewPlot(plot)}
                              disabled={isRenewing === plot.id}
                            >
                              {isRenewing === plot.id ? (
                                <>
                                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                                  Renewing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Renew
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                              asChild
                            >
                              <Link href={`/manage-plot/${plot.id}`}>Manage</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            {/* NFTs Tab */}
            <TabsContent value="nfts" className="mt-8">
              {nfts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-amber-500 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
                  <p className="text-zinc-400 mb-6">Your NFT collection will appear here once you acquire some.</p>
                  <Button asChild>
                    <Link href="/marketplace">Browse Marketplace</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {nfts.map((nft) => (
                    <Card key={nft.id} className="border-amber-700/30 bg-zinc-900/50 overflow-hidden">
                      <div className="relative aspect-video">
                        <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white">{nft.name}</CardTitle>
                        <CardDescription className="text-zinc-400">{nft.location}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-amber-400" />
                            <span>{nft.visitors.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-amber-400" />
                            <span>{nft.size}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                          asChild
                        >
                          <Link href={nft.opensea} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on OpenSea
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Developer Tools Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Developer Tools</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-amber-700/30 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Database Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleResetDatabase}
                    variant="outline"
                    className="w-full border-red-700/30 text-red-400 hover:bg-red-950/20"
                  >
                    Reset All Data
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-amber-700/30 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Wallet Connected:</span>
                      <span className={isConnected ? "text-green-400" : "text-red-400"}>
                        {isConnected ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Faberplots Owned:</span>
                      <span className="text-white">{faberplots.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">NFTs Owned:</span>
                      <span className="text-white">{nfts.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message Modal */}
      {showSuccessMessage && successDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="mx-4 w-full max-w-md rounded-xl border border-amber-700/30 bg-zinc-900 p-6 backdrop-blur">
            <div className="mb-6 text-center">
              <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-amber-500 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Success!</h2>
              <p className="text-zinc-300">{successDetails.message}</p>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold"
                onClick={() => setShowSuccessMessage(false)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      <MetaverseFooter />
    </div>
  )
} 