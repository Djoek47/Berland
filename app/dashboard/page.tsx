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
import { useNFTs } from "@/hooks/use-nfts"
import { redirectToCheckout } from "@/lib/stripe-client"
import { getFaberplotPrice } from "@/lib/plot-prices"

// Function to get store images for faberplots (only for plots 1-4)
const getStoreImage = (plotNumber: number): string => {
  if (plotNumber <= 4) {
    const storeNumber = plotNumber // Direct mapping for plots 1-4
    const imageNumber = 0 // Use first image (0.0.PNG)
    return `/images/stores/store${storeNumber}/${storeNumber}.${imageNumber}.PNG`
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
  
  // NFT detection
  const { nfts, isLoading: nftsLoading, error: nftsError, refreshNFTs } = useNFTs()

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

  // Handle wallet reconnection after payment
  useEffect(() => {
    if (!isConnected && !walletLoading) {
      console.log('Dashboard: Wallet disconnected, attempting to reconnect...')
      
      // Add a delay before attempting reconnection
      const timer = setTimeout(() => {
        console.log('Dashboard: Attempting wallet reconnection...')
        // Force a page refresh to reconnect wallet
        window.location.reload()
      }, 3000) // Wait 3 seconds before attempting reconnection

      return () => clearTimeout(timer)
    }
  }, [isConnected, walletLoading])

  // Handle Thirdweb authentication errors
  useEffect(() => {
    const handleThirdwebError = (event: any) => {
      if (event.detail && event.detail.error && event.detail.error.includes('401')) {
        console.error('Dashboard: Thirdweb authentication error detected:', event.detail.error)
        console.log('Dashboard: Attempting to reconnect wallet...')
        
        // Show user-friendly error message
        alert('Wallet connection issue detected. Please reconnect your wallet.')
        
        // Force wallet reconnection
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    }

    // Listen for Thirdweb errors
    window.addEventListener('thirdweb-error', handleThirdwebError)
    
    return () => {
      window.removeEventListener('thirdweb-error', handleThirdwebError)
    }
  }, [])

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
            monthlyRent: getFaberplotPrice(plot.id), // Fixed price from price database
            image: getStoreImage(plot.id),
            location: ["Market District", "Business District", "Arts District", "Entertainment District", "Central District"][plot.id % 5],
            size: plot.id < 15 ? "Small (2,500 sq ft)" : plot.id < 30 ? "Medium (5,000 sq ft)" : "Large (7,500 sq ft)",
            visitors: 1500 + (plot.id * 100),
            features: plot.id < 15 ? ["Retail Ready", "Affordable", "High Foot Traffic", "Quick Setup", "24/7 Access"] :
                      plot.id < 30 ? ["Corporate Ready", "Meeting Spaces", "Business Hub", "Professional Environment", "Networking Opportunities"] :
                      ["Event Space", "Premium Location", "Creative Hub", "Exclusive Access", "Custom Branding"],
            rentalStartDate: plot.soldAt || new Date().toISOString(),
            rentalEndDate: plot.rentalEndDate || '',
            selectedTerm: plot.rentalTerm || "monthly" as const,
            totalPrice: 0
          })))
        } else {
          console.error('Dashboard: Failed to load user plots')
          setFaberplots([])
        }

      } catch (error) {
        console.error('Dashboard: Error loading data:', error)
        setFaberplots([])
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
      const term = urlParams.get('term') || 'monthly'

      console.log('Dashboard: Checking URL params:', { success, sessionId, plotId, isRenewal, term })
      console.log('Dashboard: Current URL:', window.location.href)

      if (success === 'true' && sessionId && plotId) {
        console.log('Dashboard: Processing successful payment for plot:', plotId)
        
        // Add a small delay to ensure webhook has time to process
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Process the rental immediately since webhooks don't work on localhost
        try {
          const response = await fetch('/api/process-rental', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              plotId: parseInt(plotId),
              userAddress: address,
              userEmail: 'user@email.com',
              rentalTerm: term as 'monthly' | 'quarterly' | 'yearly',
              isRenewal: isRenewal
            }),
          })

          if (response.ok) {
            const result = await response.json()
            console.log('Dashboard: Rental processed successfully:', result)
            
            setSuccessDetails({
              sessionId,
              plotId: parseInt(plotId),
              message: isRenewal 
                ? 'Renewal successful! Your Faberplot rental has been extended.'
                : 'Payment successful! Your Faberplot rental has been activated and will be available in your dashboard.'
            })
            setShowSuccessMessage(true)

            // Force refresh of dashboard data with a small delay
            setTimeout(() => {
              setRefreshTrigger(prev => prev + 1)
      }, 1000)
    } else {
            console.error('Dashboard: Failed to process rental')
            const errorData = await response.json()
            console.error('Dashboard: Error details:', errorData)
          }
        } catch (error) {
          console.error('Dashboard: Error processing rental:', error)
        }

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
          selectedTerm: plot.selectedTerm,
          userAddress: address, // Add wallet address
          userEmail: 'user@email.com', // Add email (could be made dynamic)
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

  // Get rental period display text
  const getRentalPeriodText = (term: string) => {
    switch (term) {
      case 'monthly': return 'Monthly Rental'
      case 'quarterly': return 'Quarterly Rental (3 months)'
      case 'yearly': return 'Yearly Rental (12 months)'
      default: return 'Monthly Rental'
    }
  }



  // Loading state
  if (walletLoading || isLoading || nftsLoading || isWaitingForWallet) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-apple-green border-t-transparent mx-auto"></div>
            <p className="text-white">
              {isWaitingForWallet ? 'Reconnecting wallet after payment...' : 'Loading your dashboard...'}
            </p>
            <p className="text-white text-sm mt-2">
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
      <div className="flex min-h-screen flex-col gradient-apple-dark text-white">
        <MetaverseNavbar />
        <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
            <Wallet className="h-16 w-16 text-apple-green mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Wallet Required</h1>
            <p className="text-white mb-6">Please connect your wallet to access your dashboard.</p>
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
    <div className="flex min-h-screen flex-col gradient-apple-dark text-white">
      <MetaverseNavbar />


      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-apple-green/20 via-apple-green/10 to-black"></div>
        <div className="container relative z-10 px-4">
          <div className="mb-8 text-center">
            <Badge className="mb-4 bg-apple-green hover:bg-apple-teal text-black font-semibold shadow-apple border-0" variant="secondary">
              Personal Dashboard
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-apple-green/90 to-white bg-clip-text text-transparent">
              Welcome to Your Faberland
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              Manage your virtual real estate portfolio, track your investments, and explore new opportunities in the metaverse.
            </p>
                      </div>

          {/* Wallet Info */}
          <Card className="mb-8 border-apple-green/40 glass-apple-dark shadow-apple bg-gradient-to-r from-black/40 to-apple-green/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-apple-green/20 rounded-full">
                    <Wallet className="h-6 w-6 text-apple-green" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 font-medium">Connected Wallet</p>
                    <p className="font-mono text-sm text-white font-semibold bg-apple-green/20 border border-apple-green/30 px-3 py-1.5 rounded-lg">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                      </div>
                      </div>
                                  <Button
                    variant="outline"
                    size="sm"
                    className="border-apple-green/50 text-apple-green hover:bg-apple-green/20 hover:border-apple-green glass-apple transition-all duration-200"
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
            <TabsList className="grid w-full grid-cols-2 glass-apple-dark border border-apple-green/40 bg-black/30">
              <TabsTrigger value="faberplots" className="text-white/80 data-[state=active]:bg-apple-green data-[state=active]:text-black data-[state=active]:shadow-apple transition-all duration-200">
                Faberplots ({faberplots.length})
              </TabsTrigger>
              <TabsTrigger value="nfts" className="text-white/80 data-[state=active]:bg-apple-green data-[state=active]:text-black data-[state=active]:shadow-apple transition-all duration-200">
                NFTs ({nfts.length})
              </TabsTrigger>
            </TabsList>

            {/* Faberplots Tab */}
            <TabsContent value="faberplots" className="mt-8">
              {faberplots.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-apple-green flex items-center justify-center bg-apple-green/10">
                    <MapPin className="h-8 w-8 text-apple-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">No Faberplots Yet</h3>
                  <p className="text-white/80 mb-6">Start building your virtual real estate portfolio by renting your first Faberplot.</p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild className="bg-apple-green hover:bg-apple-teal text-black font-semibold shadow-apple">
                      <Link href="/marketplace">Browse Marketplace</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setRefreshTrigger(prev => prev + 1)}
                      className="border-apple-green/50 text-apple-green hover:bg-apple-green/20 hover:border-apple-green transition-all duration-200"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh Data
                    </Button>

                  </div>

                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {faberplots.map((plot) => {
                    const timeRemaining = getTimeRemaining(plot.rentalEndDate)
                    const isExpiringSoon = !timeRemaining.expired && timeRemaining.days <= 7

                    return (
                      <Card key={plot.id} className="border-apple-green/40 glass-apple-dark shadow-apple overflow-hidden bg-gradient-to-b from-black/40 to-black/20 hover:from-black/50 hover:to-black/30 transition-all duration-300">
                        <div className="relative aspect-video">
                          <Image src={plot.image} alt={plot.name} fill className="object-cover" />
                          <div className="absolute top-2 right-2">
                            {timeRemaining.expired ? (
                              <Badge className="bg-red-500/90 text-white font-medium shadow-lg">
                                Expired
                              </Badge>
                            ) : isExpiringSoon ? (
                              <Badge className="bg-orange-500/90 text-white font-medium shadow-lg">
                                Expiring Soon
                              </Badge>
                            ) : (
                              <Badge className="bg-apple-green/90 text-black font-medium shadow-lg">
                                Active
                              </Badge>
                            )}
                          </div>
                      </div>
                      <CardHeader className="bg-gradient-to-r from-apple-green/5 to-transparent">
                          <CardTitle className="text-white font-semibold">{plot.name}</CardTitle>
                          <CardDescription className="text-white/80">{plot.location}</CardDescription>
                      </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-apple-green/20 rounded">
                                <Users className="h-4 w-4 text-apple-green" />
                              </div>
                              <span className="text-white font-medium">{plot.visitors.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-apple-green/20 rounded">
                                <DollarSign className="h-4 w-4 text-apple-green" />
                              </div>
                              <span className="text-white font-medium">${plot.monthlyRent}/mo</span>
                            </div>
                        </div>

                          {/* Rental Period and Time Remaining */}
                          {!timeRemaining.expired ? (
                            <div className="bg-gradient-to-r from-apple-green/10 to-apple-green/5 border border-apple-green/20 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 bg-apple-green/20 rounded">
                                  <Clock className="h-4 w-4 text-apple-green" />
                                </div>
                                <span className="text-sm font-medium text-white">Time Remaining</span>
                                <Badge className="ml-auto bg-apple-green/30 text-apple-green border-apple-green/50 font-medium">
                                  {getRentalPeriodText(plot.selectedTerm)}
                                </Badge>
                          </div>
                              <div className="text-sm text-white font-medium">
                                {timeRemaining.days > 0 && `${timeRemaining.days}d `}
                                {timeRemaining.hours > 0 && `${timeRemaining.hours}h `}
                                {timeRemaining.minutes}m
                          </div>
                        </div>
                          ) : (
                            <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/40 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <div className="p-1 bg-red-500/20 rounded">
                                  <AlertCircle className="h-4 w-4 text-red-400" />
                                </div>
                                <span className="text-sm text-red-400 font-medium">Rental expired</span>
                              </div>
                        </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-apple-green hover:bg-apple-teal text-black font-semibold"
                              onClick={() => handleRenewPlot(plot)}
                              disabled={isRenewing === plot.id}
                            >
                              {isRenewing === plot.id ? (
                                <>
                                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                                  Renewing...
                                </>
                              ) : (
                                'Renew'
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-apple-green/50 text-white hover:bg-apple-green/20 hover:border-apple-green glass-apple transition-all duration-200"
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
                  <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-apple-green flex items-center justify-center bg-apple-green/10">
                    <ExternalLink className="h-8 w-8 text-apple-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">No NFTs Yet</h3>
                  <p className="text-white/80 mb-6">Your NFT collection will appear here once you acquire some.</p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild className="bg-apple-green hover:bg-apple-teal text-black font-semibold shadow-apple">
                      <Link href="/marketplace">Browse Marketplace</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={refreshNFTs}
                      className="border-apple-green/50 text-apple-green hover:bg-apple-green/20 hover:border-apple-green transition-all duration-200"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh NFTs
                    </Button>
                  </div>
                  
                  {nftsError && (
                    <div className="mt-4 p-3 bg-red-900/20 border border-red-700/40 rounded-lg">
                      <p className="text-red-400 text-sm">Error loading NFTs: {nftsError}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {nfts.map((nft) => (
                    <Card key={nft.id} className="border-apple-green/40 glass-apple-dark shadow-apple overflow-hidden bg-gradient-to-b from-black/40 to-black/20 hover:from-black/50 hover:to-black/30 transition-all duration-300">
                      <div className="relative aspect-video">
                        <Image src={nft.image} alt={nft.name} fill className="object-cover" />
                      </div>
                      <CardHeader className="bg-gradient-to-r from-apple-green/5 to-transparent">
                        <CardTitle className="text-white font-semibold">{nft.name}</CardTitle>
                        <CardDescription className="text-white/80">{nft.location}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-apple-green/20 rounded">
                              <Users className="h-4 w-4 text-apple-green" />
                            </div>
                            <span className="text-white font-medium">{nft.visitors.toLocaleString()}</span>
                        </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-apple-green/20 rounded">
                              <MapPin className="h-4 w-4 text-apple-green" />
                            </div>
                            <span className="text-white font-medium">{nft.size}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-apple-green/50 text-white hover:bg-apple-green/20 hover:border-apple-green glass-apple transition-all duration-200"
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

      

      {/* Success Message Modal */}
      {showSuccessMessage && successDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="mx-4 w-full max-w-md rounded-xl border border-apple-green/30 glass-apple-dark p-6 shadow-apple">
            <div className="mb-6 text-center">
              <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-apple-green flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-apple-green" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Success!</h2>
              <p className="text-white">{successDetails.message}</p>
                              </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple"
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