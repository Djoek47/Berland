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
import { ExternalLink, Info, MapPin, Gem, Clock, Tag, Search, Filter, X } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"

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

const landPlots: LandPlot[] = [
  {
    id: "crystal-amber",
    name: "Crystal Amber Estate",
    type: "faberland",
    description: "A premium crystal estate with amber accents, located in the central district of Faberland.",
    price: 2.5,
    image: "/images/faberge-eggs/crystal-amber.jpeg",
    color: "amber",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Central District",
    size: "Large (10,000 sq ft)",
    visitors: 5200,
    features: ["Water View", "High Traffic", "Premium Location"],
  },
  {
    id: "amber-glow",
    name: "Amber Glow Manor",
    type: "faberland",
    description: "A luxurious manor with a warm amber glow, perfect for hosting virtual events.",
    price: 3.2,
    image: "/images/faberge-eggs/amber-glow.png",
    color: "amber",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Entertainment District",
    size: "Extra Large (15,000 sq ft)",
    visitors: 7800,
    features: ["Event Space", "High Traffic", "Premium Location"],
  },
  {
    id: "ruby-red",
    name: "Ruby Red Residence",
    type: "faberland",
    description: "A striking ruby-colored estate in the exclusive northern district of Faberland.",
    price: 4.1,
    image: "/images/faberge-eggs/ruby-red.png",
    color: "ruby",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Northern District",
    size: "Large (12,000 sq ft)",
    visitors: 4100,
    features: ["Mountain View", "Exclusive Area", "Premium Location"],
  },
  {
    id: "emerald-green",
    name: "Emerald Green Haven",
    type: "faberland",
    description: "A verdant emerald estate surrounded by virtual gardens and water features.",
    price: 3.8,
    image: "/images/faberge-eggs/emerald-green.png",
    color: "emerald",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Garden District",
    size: "Large (11,000 sq ft)",
    visitors: 6300,
    features: ["Garden View", "Water Features", "Premium Location"],
  },
  {
    id: "bronze-glow",
    name: "Bronze Glow Retreat",
    type: "faberland",
    description: "A warm bronze estate with a central courtyard, located in the artistic quarter.",
    price: 2.9,
    image: "/images/faberge-eggs/bronze-glow.png",
    color: "bronze",
    available: false,
    opensea: "https://opensea.io/collection/faberland",
    location: "Arts District",
    size: "Medium (8,000 sq ft)",
    visitors: 3900,
    features: ["Art Gallery", "Central Courtyard", "Creative Hub"],
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz Sanctuary",
    type: "faberland",
    description: "A serene rose quartz estate with meditation spaces and relaxation zones.",
    price: 3.5,
    image: "/images/faberge-eggs/rose-quartz.jpeg",
    color: "rose",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Wellness District",
    size: "Medium (9,000 sq ft)",
    visitors: 4700,
    features: ["Meditation Space", "Relaxation Zones", "Wellness Hub"],
  },
  {
    id: "copper-plot-1",
    name: "Copper Plot Alpha",
    type: "faberplot",
    description: "A smaller copper-toned plot, perfect for a boutique virtual store or gallery.",
    price: 0.8,
    image: "/images/faberge-eggs/copper-solid.png",
    color: "copper",
    available: true,
    location: "Market District",
    size: "Small (2,500 sq ft)",
    visitors: 1800,
    features: ["Retail Ready", "Affordable", "High Foot Traffic"],
  },
  {
    id: "sapphire-blue",
    name: "Sapphire Blue Domain",
    type: "faberland",
    description: "A majestic sapphire estate with waterfront views in the coastal district.",
    price: 4.5,
    image: "/images/faberge-eggs/sapphire-blue.png",
    color: "sapphire",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Coastal District",
    size: "Extra Large (16,000 sq ft)",
    visitors: 8200,
    features: ["Ocean View", "Private Beach", "Premium Location"],
  },
  {
    id: "fire-opal",
    name: "Fire Opal Residence",
    type: "faberland",
    description: "A vibrant fire opal estate in the entertainment district, perfect for virtual events.",
    price: 3.9,
    image: "/images/faberge-eggs/fire-opal.png",
    color: "fire",
    available: true,
    opensea: "https://opensea.io/collection/faberland",
    location: "Entertainment District",
    size: "Large (12,500 sq ft)",
    visitors: 7100,
    features: ["Event Space", "Entertainment Hub", "Premium Location"],
  },
  {
    id: "obsidian-plot-1",
    name: "Obsidian Plot Omega",
    type: "faberplot",
    description: "A sleek obsidian plot in the business district, ideal for a corporate presence.",
    price: 1.2,
    image: "/images/faberge-eggs/obsidian-black.png",
    color: "obsidian",
    available: true,
    location: "Business District",
    size: "Medium (5,000 sq ft)",
    visitors: 2900,
    features: ["Corporate Ready", "Meeting Spaces", "Business Hub"],
  },
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

  // Derived states
  const [filteredPlots, setFilteredPlots] = useState<LandPlot[]>(landPlots)

  // Get unique values for filters
  const locations = Array.from(new Set(landPlots.map((plot) => plot.location)))
  const sizes = Array.from(new Set(landPlots.map((plot) => plot.size)))
  const features = Array.from(new Set(landPlots.flatMap((plot) => plot.features)))

  // Apply filters
  useEffect(() => {
    let result = [...landPlots]

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
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
            Virtual Real Estate
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Faberland Marketplace</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            Own a piece of the Faberland metaverse. Each plot is represented as a unique Fabergé egg, symbolizing the
            precious nature of virtual real estate.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-4">
        <div className="container px-4">
          <div className="rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Land Types</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Faberland Estates (NFTs on OpenSea)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                    <span className="text-sm">Faberplots (Exclusive to this marketplace)</span>
                  </div>
                </div>
              </div>
              <Link
                href="/about"
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Search by name, description, or location..."
                className="pl-10 border-amber-700/30 bg-zinc-900/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-amber-700/30 text-amber-400 hover:bg-amber-950/20"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters {showFilters ? "(Hide)" : "(Show)"}
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" onClick={resetFilters}>
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
                      <span className="text-sm text-zinc-400">{priceRange[0]} ETH</span>
                      <span className="text-sm text-zinc-400">{priceRange[1]} ETH</span>
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
                        <Label htmlFor={`location-${location}`} className="ml-2 text-sm text-zinc-300 cursor-pointer">
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
                        <Label htmlFor={`size-${size}`} className="ml-2 text-sm text-zinc-300 cursor-pointer">
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
                        <Label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-zinc-300 cursor-pointer">
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
                <Label htmlFor="available-only" className="ml-2 text-sm text-zinc-300 cursor-pointer">
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
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="mb-8 flex justify-center">
              <TabsList className="bg-zinc-900">
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
                  <p className="text-xl text-zinc-400">No properties match your search criteria.</p>
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

            <TabsContent value="faberland" className="mt-0">
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlots.map((plot) => (
                    <LandCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-zinc-400">No Faberland estates match your search criteria.</p>
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
                  <p className="text-xl text-zinc-400">No Faberplots match your search criteria.</p>
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
                  <p className="text-xl text-zinc-400">No featured properties match your search criteria.</p>
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
            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardHeader>
                <Gem className="h-10 w-10 text-amber-400" />
                <CardTitle>Digital Asset Ownership</CardTitle>
                <CardDescription>Secure ownership with blockchain technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
                  Faberland Estates are minted as NFTs, providing verifiable ownership that can be traded on secondary
                  markets like OpenSea.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardHeader>
                <Tag className="h-10 w-10 text-amber-400" />
                <CardTitle>High Traffic Potential</CardTitle>
                <CardDescription>Access to a growing user base</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
                  Prime locations in Faberland attract thousands of daily visitors, creating opportunities for
                  visibility, engagement, and monetization.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardHeader>
                <Tag className="h-10 w-10 text-amber-400" />
                <CardTitle>Value Appreciation</CardTitle>
                <CardDescription>Investment with growth potential</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
                  As the Faberland community grows and the metaverse expands, early property investments have the
                  potential to increase in value.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardHeader>
                <Clock className="h-10 w-10 text-amber-400" />
                <CardTitle>Passive Income</CardTitle>
                <CardDescription>Monetize your virtual property</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
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
          <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
            Don't miss the opportunity to be part of the metaverse revolution. Whether you're an individual collector,
            business owner, or investor, Faberland offers unique opportunities for digital property ownership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
              Contact Sales Team
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
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
        plot.type === "faberland" ? "border-purple-500/30" : "border-emerald-500/30"
      } bg-zinc-900/50 backdrop-blur transition-all hover:border-amber-500/50`}
    >
      <div className="relative aspect-square">
        <Image src={plot.image || "/placeholder.svg"} alt={plot.name} fill className="object-cover" />
        {!plot.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-xl font-bold text-white">SOLD OUT</span>
          </div>
        )}
        <div
          className={`absolute top-4 right-4 rounded-full px-2 py-1 text-xs font-medium ${
            plot.type === "faberland" ? "bg-purple-500/80 text-white" : "bg-emerald-500/80 text-white"
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
        <p className="text-zinc-300">{plot.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-zinc-800/50 p-2">
            <span className="text-zinc-400">Size</span>
            <p className="font-medium text-white">{plot.size}</p>
          </div>
          <div className="rounded-md bg-zinc-800/50 p-2">
            <span className="text-zinc-400">Monthly Visitors</span>
            <p className="font-medium text-white">{plot.visitors.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {plot.features.map((feature) => (
            <Badge key={feature} variant="outline" className="border-amber-700/30 text-amber-400">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Price</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">${(plot.price * 1000).toLocaleString()}</span>
              {plot.type === "faberland" && <span className="text-sm text-white">≈ {plot.price} ETH</span>}
            </div>
          </div>
          {plot.available ? (
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
              {plot.type === "faberland" ? "View Details" : "Purchase"}
            </Button>
          ) : (
            <Button disabled className="bg-zinc-700 text-zinc-400 cursor-not-allowed">
              Sold Out
            </Button>
          )}
        </div>

        {plot.type === "faberland" && plot.opensea && (
          <div className="pt-2">
            <a
              href={plot.opensea}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-purple-500/50 bg-purple-500/10 py-2 text-sm text-purple-300 transition-colors hover:bg-purple-500/20"
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
