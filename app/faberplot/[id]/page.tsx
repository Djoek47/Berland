"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, Calendar, DollarSign, CheckCircle, ArrowLeft, ExternalLink, CreditCard, Wallet, AlertCircle } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { redirectToCheckout } from "@/lib/stripe-client"
import { useWallet } from "@/hooks/use-wallet"
import { getFaberplotPrice } from "@/lib/plot-prices"

// Faberplot data with monthly rent pricing
  const faberplotData = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  name: `Faberplot #${i + 1}`,
  description: `Faberplot #${i + 1} - A versatile virtual plot perfect for businesses, galleries, or creative projects. This premium location offers excellent visibility and foot traffic for your virtual enterprise.`,
  monthlyRent: getFaberplotPrice(i + 1), // Fixed price from price database
  image: i % 8 === 0 ? "/images/faberge-eggs/crystal-amber.jpeg" :
         i % 8 === 1 ? "/images/faberge-eggs/amber-glow.png" :
         i % 8 === 2 ? "/images/faberge-eggs/ruby-red.png" :
         i % 8 === 3 ? "/images/faberge-eggs/emerald-green.png" :
         i % 8 === 4 ? "/images/faberge-eggs/bronze-glow.png" :
         i % 8 === 5 ? "/images/faberge-eggs/rose-quartz.jpeg" :
         i % 8 === 6 ? "/images/faberge-eggs/sapphire-blue.png" :
         "/images/faberge-eggs/fire-opal.png",
  color: ["crystal", "amber", "ruby", "emerald", "bronze", "rose", "sapphire", "fire"][i % 8],
  location: ["Market District", "Business District", "Arts District", "Entertainment District", "Central District"][i % 5],
  size: i < 15 ? "Small (2,500 sq ft)" : i < 30 ? "Medium (5,000 sq ft)" : "Large (7,500 sq ft)",
  visitors: 100,
  features: i < 15 ? ["Retail Ready", "Affordable", "High Foot Traffic", "Quick Setup", "24/7 Access"] :
            i < 30 ? ["Corporate Ready", "Meeting Spaces", "Business Hub", "Professional Environment", "Networking Opportunities"] :
            ["Event Space", "Premium Location", "Creative Hub", "Exclusive Access", "Custom Branding"],
  amenities: [
    "Virtual Storefront",
    "Customizable Interior",
    "Analytics Dashboard",
    "Customer Support",
    "Marketing Tools",
    "Inventory Management",
    "Payment Processing",
    "Multi-language Support"
  ],
  leaseTerms: [
    "Month-to-month rental",
    "No long-term commitment",
    "Flexible cancellation",
    "Instant setup",
    "24/7 customer support",
    "Free customization tools"
  ]
}))

export default function FaberplotPage() {
  const params = useParams()
  const router = useRouter()
  const plotId = parseInt(params.id as string)
  const plot = faberplotData.find(p => p.id === plotId)
  const [selectedTerm, setSelectedTerm] = useState<"monthly" | "quarterly" | "yearly">("monthly")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSold, setIsSold] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [showCancelMessage, setShowCancelMessage] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  
  // Wallet connection
  const { isConnected, address, isLoading: walletLoading } = useWallet()
  
  // Check if plot is sold using API call
  useEffect(() => {
    const checkSoldStatus = async () => {
      try {
        const response = await fetch(`/api/database-status`)
        if (response.ok) {
          const data = await response.json()
          const soldPlots = data.soldPlots || []
          const sold = soldPlots.some((plot: any) => plot.id === plotId && plot.isSold)
          setIsSold(sold)
        }
      } catch (error) {
        console.error('Error checking sold status:', error)
      }
    }
    checkSoldStatus()
  }, [plotId])

  // Check for cancel parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const canceled = urlParams.get('canceled')
    if (canceled === 'true') {
      setShowCancelMessage(true)
      // Clean up URL
      router.replace(`/faberplot/${plotId}`)
    }
  }, [plotId, router])

  if (!plot) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <MetaverseNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Faberplot Not Found</h1>
            <p className="text-zinc-400 mb-6">The Faberplot you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/marketplace">Back to Marketplace</Link>
            </Button>
          </div>
        </div>
        <MetaverseFooter />
      </div>
    )
  }

  const getDiscount = (term: "monthly" | "quarterly" | "yearly") => {
    switch (term) {
      case "quarterly": return 0.10 // 10% discount
      case "yearly": return 0.20 // 20% discount
      default: return 0
    }
  }

  const getTermMultiplier = (term: "monthly" | "quarterly" | "yearly") => {
    switch (term) {
      case "quarterly": return 3
      case "yearly": return 12
      default: return 1
    }
  }

  const discount = getDiscount(selectedTerm)
  const multiplier = getTermMultiplier(selectedTerm)
  const basePrice = plot.monthlyRent * multiplier
  const discountedPrice = basePrice * (1 - discount)
  const savings = basePrice - discountedPrice

  const handleCheckout = async () => {
    // Check wallet connection first
    if (!isConnected) {
      setShowWalletModal(true)
      return
    }
    
    // Double-check wallet connection before proceeding
    if (!address) {
      alert('Wallet connection lost. Please reconnect your wallet and try again.')
      setShowWalletModal(true)
      return
    }
    
    if (isSold) {
      alert('This Faberplot has already been sold.')
      return
    }
    
    if (!userEmail) {
      alert('Please enter your email address to continue.')
      return
    }
    
    if (!userEmail.includes('@')) {
      alert('Please enter a valid email address.')
      return
    }
    
    setIsProcessing(true)
    
    try {
      console.log('Starting checkout with wallet address:', address)
      
      await redirectToCheckout({
        plotId: plot.id,
        plotName: plot.name,
        selectedTerm,
        monthlyRent: plot.monthlyRent,
        userEmail,
        userAddress: address, // Pass wallet address
        plotImage: plot.image, // Pass the plot image for Stripe
      })
    } catch (error) {
      console.error('Checkout error:', error)
      
      // Check if wallet is still connected
      if (!isConnected || !address) {
        alert('Wallet connection was lost during checkout. Please reconnect your wallet and try again.')
        setShowWalletModal(true)
      } else {
        alert('Failed to start checkout. Please try again.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />


      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-amber-400 hover:text-amber-300">
              <Link href="/marketplace" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={plot.image} alt={plot.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  {isSold ? (
                    <Badge className="bg-red-500/80 text-white">
                      Sold Out
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/80 text-white">
                      Available
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                <div className="relative aspect-square w-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={plot.image} alt={plot.name} fill className="object-cover" />
                </div>
                <div className="relative aspect-square w-20 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 flex items-center justify-center">
                  <span className="text-xs text-zinc-400">Floor Plan</span>
                </div>
                <div className="relative aspect-square w-20 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 flex items-center justify-center">
                  <span className="text-xs text-zinc-400">3D View</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-emerald-500 hover:bg-emerald-600" variant="secondary">
                  Faberplot
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{plot.name}</h1>
                <p className="text-zinc-300 text-lg">{plot.description}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-amber-700/30 bg-zinc-900/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-zinc-400">Location</span>
                  </div>
                  <p className="font-semibold">{plot.location}</p>
                </div>
                <div className="rounded-lg border border-amber-700/30 bg-zinc-900/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-zinc-400">Monthly Visitors</span>
                  </div>
                  <p className="font-semibold">{plot.visitors.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-amber-700/30 bg-zinc-900/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-zinc-400">Size</span>
                  </div>
                  <p className="font-semibold">{plot.size}</p>
                </div>
                <div className="rounded-lg border border-amber-700/30 bg-zinc-900/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-zinc-400">Monthly Rent</span>
                  </div>
                  <p className="font-semibold">${plot.monthlyRent}</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {plot.features.map((feature, index) => (
                    <Badge key={`${plot.id}-feature-${index}`} variant="outline" className="border-amber-700/30 text-amber-400">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Rental Term</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              {/* Monthly */}
              <Card 
                className={`cursor-pointer transition-all ${
                  selectedTerm === "monthly" 
                    ? "border-amber-500 bg-amber-950/20" 
                    : "border-amber-700/30 bg-zinc-900/50"
                }`}
                onClick={() => setSelectedTerm("monthly")}
              >
                <CardHeader>
                  <CardTitle className="text-white">Monthly</CardTitle>
                  <CardDescription>No commitment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">${plot.monthlyRent}</div>
                  <p className="text-zinc-400 text-sm">per month</p>
                </CardContent>
              </Card>

              {/* Quarterly */}
              <Card 
                className={`cursor-pointer transition-all ${
                  selectedTerm === "quarterly" 
                    ? "border-amber-500 bg-amber-950/20" 
                    : "border-amber-700/30 bg-zinc-900/50"
                }`}
                onClick={() => setSelectedTerm("quarterly")}
              >
                <CardHeader>
                  <CardTitle className="text-white">Quarterly</CardTitle>
                  <CardDescription>10% discount</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">${(plot.monthlyRent * 3 * 0.9).toFixed(0)}</div>
                  <p className="text-zinc-400 text-sm">for 3 months</p>
                  <p className="text-green-400 text-sm mt-1">Save ${(plot.monthlyRent * 3 * 0.1).toFixed(0)}</p>
                </CardContent>
              </Card>

              {/* Yearly */}
              <Card 
                className={`cursor-pointer transition-all ${
                  selectedTerm === "yearly" 
                    ? "border-amber-500 bg-amber-950/20" 
                    : "border-amber-700/30 bg-zinc-900/50"
                }`}
                onClick={() => setSelectedTerm("yearly")}
              >
                <CardHeader>
                  <CardTitle className="text-white">Yearly</CardTitle>
                  <CardDescription>20% discount</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">${(plot.monthlyRent * 12 * 0.8).toFixed(0)}</div>
                  <p className="text-zinc-400 text-sm">for 12 months</p>
                  <p className="text-green-400 text-sm mt-1">Save ${(plot.monthlyRent * 12 * 0.2).toFixed(0)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Email Input */}
            <Card className="mt-8 border-amber-700/30 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-zinc-400 mt-1">
                    We'll send your rental confirmation to this email
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Selected Plan Details */}
            <Card className="mt-8 border-amber-700/30 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-white">Selected Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white capitalize">{selectedTerm} Plan</h4>
                    <p className="text-zinc-400 text-sm">
                      {selectedTerm === "monthly" ? "Month-to-month rental" :
                       selectedTerm === "quarterly" ? "3-month commitment" :
                       "12-month commitment"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${discountedPrice.toFixed(0)}</div>
                    {savings > 0 && (
                      <p className="text-green-400 text-sm">Save ${savings.toFixed(0)}</p>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Rent with Card'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Included Amenities</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold mb-4">Virtual Store Features</h3>
                <div className="space-y-3">
                  {plot.amenities.slice(0, 4).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-zinc-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Business Tools</h3>
                <div className="space-y-3">
                  {plot.amenities.slice(4).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-zinc-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lease Terms Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Lease Terms</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {plot.leaseTerms.map((term) => (
                <div key={term} className="flex items-center gap-3 p-4 rounded-lg border border-amber-700/30 bg-zinc-900/50">
                  <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span className="text-zinc-300">{term}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-amber-950/20">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Virtual Business?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
            Join hundreds of entrepreneurs who have already established their presence in Faberland. 
            Start generating revenue from day one with our comprehensive virtual business platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className={`font-bold ${
                isSold 
                  ? "bg-red-500 hover:bg-red-600 text-white cursor-not-allowed" 
                  : !isConnected
                  ? "bg-gray-500 hover:bg-gray-600 text-white cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600 text-black"
              }`}
              onClick={handleCheckout}
              disabled={isProcessing || isSold || !isConnected}
            >
              {isSold ? (
                `Faberplot #${plot.id} - Sold Out`
              ) : !isConnected ? (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet to Rent
                </>
              ) : isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Rent Faberplot #{plot.id} with Card
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
              asChild
            >
              <Link href="/marketplace">Browse Other Plots</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cancel Message Modal */}
      {showCancelMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="mx-4 w-full max-w-md rounded-xl border border-amber-700/30 bg-zinc-900 p-6 backdrop-blur">
            <div className="mb-6 text-center">
              <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-amber-500 flex items-center justify-center">
                <svg className="h-8 w-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Payment Cancelled</h2>
              <p className="text-zinc-300">Your payment was cancelled. You can try again anytime.</p>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold"
                onClick={() => setShowCancelMessage(false)}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="mx-4 w-full max-w-md rounded-xl border border-amber-700/30 bg-zinc-900 p-6 backdrop-blur">
            <div className="mb-6 text-center">
              <div className="mb-4 h-16 w-16 mx-auto rounded-full border-4 border-amber-500 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Wallet Required</h2>
              <p className="text-zinc-300 mb-4">You need to connect your wallet before renting a Faberplot.</p>
              <div className="bg-amber-950/20 border border-amber-700/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">Why Connect Wallet?</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-1">
                  <li>• Secure digital identity verification</li>
                  <li>• Access to your dashboard and plot management</li>
                  <li>• Track your rental history and payments</li>
                  <li>• Manage your virtual real estate portfolio</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold"
                onClick={() => setShowWalletModal(false)}
              >
                Connect Wallet
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                onClick={() => setShowWalletModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <MetaverseFooter />
    </div>
  )
}
