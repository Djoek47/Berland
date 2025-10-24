"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ExternalLink, Info, MapPin, Gem, Clock, Tag, Search, Filter, X, AlertCircle } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"

import { getFaberplotPrice } from "@/lib/plot-prices"
import { getMockFaberlandEstates } from "@/lib/opensea"

interface LandPlot {
  id: string
  name: string
  type: "faberland" | "faberplot"
  description: string
  price: number
  image: string
  color: string
  available: boolean
  opensea?: string
  location: string
  size: string
  visitors: number
  features: string[]
}

// Get Faberland Estates from OpenSea integration
const faberlandEstates = getMockFaberlandEstates()

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

const landPlots: LandPlot[] = [
  // Faberland Estates (25 NFTs - 2025) - Now using OpenSea integration
  ...faberlandEstates,
  
  // Faberplots (48 Properties - 1-48)

  ...Array.from({ length: 48 }, (_, i) => ({
    id: `faberplot-${i + 1}`,
    name: `Faberplot #${i + 1}`,
    type: "faberplot" as const,
    description: `Faberplot #${i + 1} - A versatile virtual plot perfect for businesses, galleries, or creative projects.`,
    price: getFaberplotPrice(i + 1) / 100, // Convert monthly rent to display price (divide by 100 for display)
    image: getStoreImage(i + 1),
    color: ["crystal", "amber", "ruby", "emerald", "bronze", "rose", "sapphire", "fire"][i % 8],
    available: true,
    location: ["Market District", "Business District", "Arts District", "Entertainment District", "Central District"][i % 5],
    size: i < 15 ? "Small (2,500 sq ft)" : i < 30 ? "Medium (5,000 sq ft)" : "Large (7,500 sq ft)",
    visitors: 100,
    features: i < 15 ? ["Retail Ready", "Affordable", "High Foot Traffic"] :
              i < 30 ? ["Corporate Ready", "Meeting Spaces", "Business Hub"] :
              ["Event Space", "Premium Location", "Creative Hub"],
  })),
]

export default function MarketplacePage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Handle URL tab parameter after component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get('tab')
    if (tabParam && ['all', 'faberland', 'faberplot', 'featured'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  // Derived states
  const [filteredPlots, setFilteredPlots] = useState<LandPlot[]>(landPlots)

  // Get unique values for filters
  const locations = Array.from(new Set(landPlots.map((plot) => plot.location)))
  const sizes = Array.from(new Set(landPlots.map((plot) => plot.size)))
  const features = Array.from(new Set(landPlots.flatMap((plot) => plot.features)))

  // Real-time database refresh
  useEffect(() => {
    const refreshDatabase = async () => {
      try {
        const response = await fetch('/api/database-status')
        if (response.ok) {
          const data = await response.json()
          console.log('Marketplace: Database refreshed, sold plots:', data.soldPlots?.length || 0)
          
          // Update the filtered plots to reflect new sold status
          setFilteredPlots(prev => prev.map(plot => {
            if (plot.type === "faberplot") {
              const plotNumber = parseInt(plot.id.replace('faberplot-', ''))
              const isSold = data.soldPlots?.some((soldPlot: any) => soldPlot.id === plotNumber) || false
              return { ...plot, available: !isSold }
            }
            return plot
          }))
        }
      } catch (error) {
        console.error('Error refreshing database:', error)
      }
    }

    // Refresh immediately
    refreshDatabase()

    // Refresh every 5 seconds
    const interval = setInterval(refreshDatabase, 5000)

    return () => clearInterval(interval)
  }, [])

  // Filter plots based on search, filters, and availability
  useEffect(() => {
    let result = [...landPlots]
    
    // Mark sold Faberplots as unavailable using real-time data
    result = result.map(plot => {
      if (plot.type === "faberplot") {
        // The real-time refresh mechanism will handle sold status
        // This just applies the current filtered state
        return plot
      }
      return plot
    })

    // Filter by tab
    if (activeTab === "faberland") {
      result = result.filter((plot) => plot.type === "faberland")
    } else if (activeTab === "faberplot") {
      result = result.filter((plot) => plot.type === "faberplot")
    } else if (activeTab === "featured") {
      result = result.filter((plot) => plot.visitors > 5000)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (plot) =>
          plot.name.toLowerCase().includes(query) ||
          plot.description.toLowerCase().includes(query) ||
          plot.location.toLowerCase().includes(query),
      )
    }

    // Filter by price range
    result = result.filter((plot) => plot.price >= priceRange[0] && plot.price <= priceRange[1])

    // Filter by location
    if (selectedLocations.length > 0) {
      result = result.filter((plot) => selectedLocations.includes(plot.location))
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter((plot) => selectedSizes.includes(plot.size))
    }

    // Filter by features
    if (selectedFeatures.length > 0) {
      result = result.filter((plot) => plot.features.some((feature) => selectedFeatures.includes(feature)))
    }

    // Filter by availability
    if (showAvailableOnly) {
      result = result.filter((plot) => plot.available)
    }

    setFilteredPlots(result)
  }, [searchQuery, priceRange, selectedLocations, selectedSizes, selectedFeatures, showAvailableOnly, activeTab])

  // Toggle location selection
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 5])
    setSelectedLocations([])
    setSelectedSizes([])
    setSelectedFeatures([])
    setShowAvailableOnly(false)
  }

  return (
    <div className="flex min-h-screen flex-col gradient-apple-dark text-white">
      <MetaverseNavbar />


      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-apple-green/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-apple-green hover:bg-apple-teal shadow-apple" variant="secondary">
            Virtual Real Estate
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Faberland Marketplace</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Own a piece of the Faberland metaverse. 25 exclusive Faberland Estates (NFTs) launching in 2025, plus 48 Faberplots available now. Each plot is represented as a unique Fabergé egg, symbolizing the precious nature of virtual real estate.
          </p>

        </div>
      </section>

      {/* Info Banner */}
      <section className="py-4">
        <div className="container px-4">
          <div className="rounded-xl border border-apple-green/30 glass-apple-dark p-6 shadow-apple">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Land Types</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Faberland Estates (25 NFTs on OpenSea - 2025)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                    <span className="text-sm">Faberplots (48 Properties - 1-48)</span>
                  </div>
                </div>
              </div>
              <Link
                href="/terms"
                className="flex items-center gap-2 text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                <Info className="h-4 w-4" />
                <span>Terms & Conditions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-4">
        <div className="container px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
              <Input
                placeholder="Search by name, description, or location..."
                className="pl-10 border-apple-green/30 glass-apple-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-apple-green text-white hover:bg-apple-green/10 glass-apple"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters {showFilters ? "(Hide)" : "(Show)"}
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 rounded-xl border border-apple-green/30 glass-apple-dark p-6 shadow-apple">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="text-white hover:text-apple-green" onClick={resetFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Reset All
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Price Range Filter */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Price Range (ETH)</h4>
                  <div className="space-y-4">
                    <Slider min={0} max={5} step={0.1} value={priceRange} onValueChange={setPriceRange} />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{priceRange[0]} ETH</span>
                      <span className="text-sm text-white">{priceRange[1]} ETH</span>
                    </div>
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Location</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center">
                        <Checkbox
                          id={`location-${location}`}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => toggleLocation(location)}
                        />
                        <Label htmlFor={`location-${location}`} className="ml-2 text-sm text-white cursor-pointer">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Size</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <Checkbox
                          id={`size-${size}`}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleSize(size)}
                        />
                        <Label htmlFor={`size-${size}`} className="ml-2 text-sm text-white cursor-pointer">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Filter */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Features</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                        />
                        <Label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-white cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <Checkbox
                  id="available-only"
                  checked={showAvailableOnly}
                  onCheckedChange={(checked) => setShowAvailableOnly(!!checked)}
                />
                <Label htmlFor="available-only" className="ml-2 text-sm text-white cursor-pointer">
                  Show available properties only
                </Label>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Marketplace Tabs */}
      <section className="py-8">
        <div className="container px-4">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="mb-8 flex justify-center">
              <TabsList className="bg-zinc-900/50 border border-apple-green/30">
                <TabsTrigger value="all">All Properties</TabsTrigger>
                <TabsTrigger value="faberland">Faberland Estates</TabsTrigger>
                <TabsTrigger value="faberplot">Faberplots</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlots.map((plot) => (
                    <LandCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-white">No properties match your search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-apple-green text-white hover:bg-apple-green/10 glass-apple"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="faberland" className="mt-0">
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlots.map((plot) => (
                    <LandCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-white">No Faberland estates match your search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="faberplot" className="mt-0">
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlots.map((plot) => (
                    <LandCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-white">No Faberplots match your search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>


            <TabsContent value="featured" className="mt-0">
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlots.map((plot) => (
                    <LandCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-white">No featured properties match your search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Benefits of Owning Virtual Land</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-apple-green/30 glass-apple-dark shadow-apple">
              <CardHeader>
                <Gem className="h-10 w-10 text-apple-green" />
                <CardTitle>Digital Asset Ownership</CardTitle>
                <CardDescription>Secure ownership with blockchain technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Faberland Estates are minted as NFTs, providing verifiable ownership that can be traded on secondary
                  markets like OpenSea.
                </p>
              </CardContent>
            </Card>

            <Card className="border-apple-green/30 glass-apple-dark shadow-apple">
              <CardHeader>
                <Tag className="h-10 w-10 text-apple-green" />
                <CardTitle>High Traffic Potential</CardTitle>
                <CardDescription>Access to a growing user base</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Prime locations in Faberland attract thousands of daily visitors, creating opportunities for
                  visibility, engagement, and monetization.
                </p>
              </CardContent>
            </Card>

            <Card className="border-apple-green/30 glass-apple-dark shadow-apple">
              <CardHeader>
                <Tag className="h-10 w-10 text-apple-green" />
                <CardTitle>Value Appreciation</CardTitle>
                <CardDescription>Investment with growth potential</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  As the Faberland community grows and the metaverse expands, early property investments have the
                  potential to increase in value.
                </p>
              </CardContent>
            </Card>

            <Card className="border-apple-green/30 glass-apple-dark shadow-apple">
              <CardHeader>
                <Clock className="h-10 w-10 text-apple-green" />
                <CardTitle>Passive Income</CardTitle>
                <CardDescription>Monetize your virtual property</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Generate revenue by renting your space, hosting events, displaying advertisements, or creating
                  pay-to-access experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-amber-950/20">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Secure Your Place in Faberland</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white">
            Don't miss the opportunity to be part of the metaverse revolution. 47 Faberplots available now, with 25 exclusive Faberland Estates launching in 2025. Whether you're an individual collector, business owner, or investor, Faberland offers unique opportunities for digital property ownership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple">
              Contact Sales Team
            </Button>
                          <Button
                size="lg"
                variant="outline"
                className="border-apple-green text-white hover:bg-apple-green/10 glass-apple"
                asChild
              >
              <Link href="/business-advantages">Learn About Business Benefits</Link>
            </Button>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}

interface LandCardProps {
  plot: LandPlot
}

function LandCard({ plot }: LandCardProps) {
  return (
    <Card
      className={`overflow-hidden border ${
        plot.type === "faberland" ? "border-purple-500/30" : "border-apple-green/30"
      } glass-apple-dark shadow-apple transition-all ${
        plot.type === "faberland" ? "hover:border-purple-500/50" : "hover:border-apple-green/50"
      }`}
    >
      <div className="relative aspect-square">
        {plot.type === "faberplot" && plot.available ? (
          <Link href={`/faberplot/${plot.id.replace('faberplot-', '')}`}>
            <Image src={plot.image || "/placeholder.svg"} alt={plot.name} fill className="object-cover cursor-pointer" />
          </Link>
        ) : (
          <Image src={plot.image || "/placeholder.svg"} alt={plot.name} fill className="object-cover" />
        )}
        {plot.type === "faberplot" && !plot.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-xl font-bold text-white">SOLD OUT</span>
          </div>
        )}
        <div
          className={`absolute top-4 right-4 rounded-full px-2 py-1 text-xs font-medium ${
            plot.type === "faberland" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-apple-green/80 text-white"
          }`}
        >
          {plot.type === "faberland" ? "Faberland Estate" : "Faberplot"}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-white">{plot.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {plot.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-white">{plot.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-black/20 p-2">
            <span className="text-white">Size</span>
            <p className="font-medium text-white">{plot.size}</p>
          </div>
          <div className="rounded-md bg-black/20 p-2">
            <span className="text-white">Monthly Visitors</span>
            <p className="font-medium text-white">{plot.visitors.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {plot.features.map((feature, index) => (
            <Badge 
              key={`${plot.id}-feature-${index}`} 
              variant="outline" 
              className={plot.type === "faberland" ? "border-purple-500 text-white" : "border-apple-green text-white"}
            >
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Price</p>
            <div className="flex items-baseline gap-1">
              {plot.type === "faberplot" ? (
                <>
                  <span className="text-2xl font-bold text-white">${getFaberplotPrice(parseInt(plot.id.replace('faberplot-', '')))}</span>
                  <span className="text-sm text-white">/month</span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-bold text-white">${(plot.price * 1000).toLocaleString()}</span>
                  <span className="text-sm text-white">≈ {plot.price} ETH</span>
                </>
              )}
            </div>
          </div>
          {plot.type === "faberplot" ? (
            plot.available ? (
              <Button 
                className="bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple"
                asChild
              >
                <Link href={`/faberplot/${plot.id.replace('faberplot-', '')}`}>Rent Now</Link>
              </Button>
            ) : (
              <Button disabled className="bg-black/30 text-white cursor-not-allowed">
                Sold Out
              </Button>
            )
          ) : (
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-apple">
              View Details
            </Button>
          )}
        </div>

        {plot.type === "faberland" && plot.opensea && (
          <div className="pt-2">
            <a
              href={plot.opensea}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-purple-500/50 bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-2 text-sm text-white transition-colors hover:from-blue-500/20 hover:to-purple-600/20"
            >
              <span>View on OpenSea</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
