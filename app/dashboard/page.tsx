"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Gem, Clock, Tag, ExternalLink, Settings, Users, Home, DoorOpen } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { useRouter } from "next/navigation"

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

export default function DashboardPage() {
  const router = useRouter()
  const address = useAddress()
  const [activeTab, setActiveTab] = useState("overview")
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load NFTs when address changes
  useEffect(() => {
    if (address) {
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
          },
          {
            id: "portal-alpha",
            name: "Portal Alpha",
            type: "portal",
            description: "A gateway to exclusive virtual experiences and events.",
            image: "/images/portals/portal-alpha.png",
            location: "Central Hub",
            size: "Medium",
            visitors: 3200,
            features: ["Event Access", "VIP Entry", "Customizable"],
            rentalStatus: "rented",
            rentalEndDate: "2024-12-31"
          }
        ])
        setIsLoading(false)
      }, 1000)
    } else {
      // Clear data when disconnected
      setNfts([])
      setIsLoading(false)
    }
  }, [address])

  // Redirect to home if not connected
  useEffect(() => {
    if (!address) {
      router.push("/")
    }
  }, [address, router])

  if (!address) {
    return null // Don't render anything while redirecting
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
                <TabsTrigger value="portals">Portals</TabsTrigger>
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
                      <p className="text-3xl font-bold">{nfts.filter(nft => nft.type === "land").length}</p>
                      <p className="text-sm text-zinc-400">Virtual properties owned</p>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <DoorOpen className="h-5 w-5 text-amber-400" />
                        <CardTitle className="text-white">Total Portals</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{nfts.filter(nft => nft.type === "portal").length}</p>
                      <p className="text-sm text-zinc-400">Virtual gateways owned</p>
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
                      <p className="text-3xl font-bold">{nfts.reduce((sum, nft) => sum + nft.visitors, 0).toLocaleString()}</p>
                      <p className="text-sm text-zinc-400">Across all properties</p>
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
                      <p className="text-3xl font-bold">{nfts.filter(nft => nft.rentalStatus === "rented").length}</p>
                      <p className="text-sm text-zinc-400">Currently rented out</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h2 className="mb-4 text-2xl font-bold">Recent Activity</h2>
                  <div className="rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
                    <p className="text-zinc-400">No recent activity to display</p>
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
                            <span className="text-zinc-400">Size</span>
                            <p className="font-medium text-white">{nft.size}</p>
                          </div>
                          <div className="rounded-md bg-zinc-800/50 p-2">
                            <span className="text-zinc-400">Visitors</span>
                            <p className="font-medium text-white">{nft.visitors.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {nft.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-amber-700/30 text-amber-400">
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

              <TabsContent value="portals" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {nfts.filter(nft => nft.type === "portal").map((nft) => (
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
                            <span className="text-zinc-400">Size</span>
                            <p className="font-medium text-white">{nft.size}</p>
                          </div>
                          <div className="rounded-md bg-zinc-800/50 p-2">
                            <span className="text-zinc-400">Visitors</span>
                            <p className="font-medium text-white">{nft.visitors.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {nft.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-amber-700/30 text-amber-400">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-950/20">
                            <Settings className="mr-2 h-4 w-4" /> Manage
                          </Button>
                          {nft.rentalStatus === "rented" && (
                            <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">
                              Rented until {nft.rentalEndDate}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rentals" className="mt-0">
                <div className="rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
                  <h2 className="mb-4 text-xl font-bold">Rental Management</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Active Rentals</h3>
                      <div className="space-y-4">
                        {nfts.filter(nft => nft.rentalStatus === "rented").map((nft) => (
                          <div key={nft.id} className="rounded-lg bg-zinc-800/50 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{nft.name}</p>
                                <p className="text-sm text-zinc-400">Rental ends: {nft.rentalEndDate}</p>
                              </div>
                              <Button variant="outline" size="sm" className="border-amber-500 text-amber-400 hover:bg-amber-950/20">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Available for Rent</h3>
                      <div className="space-y-4">
                        {nfts.filter(nft => nft.rentalStatus === "available").map((nft) => (
                          <div key={nft.id} className="rounded-lg bg-zinc-800/50 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{nft.name}</p>
                                <p className="text-sm text-zinc-400">{nft.type === "land" ? "Land" : "Portal"}</p>
                              </div>
                              <Button variant="outline" size="sm" className="border-amber-500 text-amber-400 hover:bg-amber-950/20">
                                List for Rent
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

      <MetaverseFooter />
    </div>
  )
} 