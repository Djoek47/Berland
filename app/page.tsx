import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Layers, Users, Zap, Gamepad2, HeadsetIcon as VrHeadset, Sparkles, Download, Expand } from "lucide-react"
import ThreeDScene from "@/components/three-d-scene"
import HeroAnimation from "@/components/hero-animation"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import DownloadButton from "@/components/download-button"
import Image from "next/image"
import React from "react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gradient-apple-dark text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-apple-green hover:bg-apple-teal shadow-apple" variant="secondary">
            Welcome to the future
          </Badge>
          <div className="mx-auto mb-6 flex flex-col items-center justify-center">
            <Image src="/images/faberland-emblem.png" alt="Faberland" width={180} height={180} className="mb-4" />
            <Image src="/images/faberland-logo.png" alt="Faberland" width={300} height={80} className="h-auto" />
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Experience a new dimension of reality where digital and physical worlds converge. Connect, create, and
            explore in ways never before possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-apple-green hover:bg-apple-teal text-white font-semibold shadow-apple" asChild>
              <Link href="/discover">
                Get Started
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-apple-green text-apple-green hover:bg-apple-green/10 glass-apple"
              asChild
            >
              <Link href="/marketplace">Explore Faberplots</Link>
            </Button>
          </div>

          {/* Download VR Demo Button */}
          <div className="mt-12">
            <DownloadButton />
          </div>
        </div>
      </section>

      {/* 3D Interactive Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-apple-green to-apple-teal bg-clip-text text-transparent">
                Explore Virtual Worlds
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Interact with our 3D environment to get a taste of the metaverse experience
            </p>
          </div>
          <div className="mx-auto aspect-video max-w-5xl rounded-xl border border-apple-green/30 glass-apple-dark p-1 shadow-apple-dark">
            <div className="h-full w-full rounded-lg bg-black/50">
              <ThreeDScene />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button className="bg-apple-green hover:bg-apple-teal text-white font-semibold shadow-apple" asChild>
              <Link href="/screenshots">
                <Expand className="mr-2 h-4 w-4" /> View VR Demo Screenshots
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-apple-green to-apple-teal bg-clip-text text-transparent">
                Metaverse Features
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white">
              Discover the endless possibilities in our digital universe
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<VrHeadset className="h-10 w-10 text-amber-400" />}
              title="Immersive Experiences"
              description="Step into fully immersive 3D environments that feel as real as the physical world."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-amber-400" />}
              title="Social Connection"
              description="Meet friends and make new connections in shared virtual spaces regardless of physical distance."
            />
            <FeatureCard
              icon={<Gamepad2 className="h-10 w-10 text-amber-400" />}
              title="Interactive Entertainment"
              description="Experience games and entertainment that blur the line between observer and participant."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-amber-400" />}
              title="Virtual Economy"
              description="Buy, sell, and trade digital assets with real-world value in our decentralized marketplace."
            />
            <FeatureCard
              icon={<Layers className="h-10 w-10 text-amber-400" />}
              title="Digital Ownership"
              description="Own unique digital assets secured by blockchain technology and NFTs."
            />
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-amber-400" />}
              title="Create & Build"
              description="Design your own spaces, experiences, and assets to share with the metaverse community."
            />
          </div>
        </div>
      </section>

      {/* Marketplace Teaser */}
      <section className="py-16 md:py-24 bg-black/50">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-apple-green to-apple-teal bg-clip-text text-transparent">
                Faberplots Marketplace
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white">
              Stake your claim in the metaverse with virtual land, plots, and store spaces
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-apple-green/30 glass-apple-dark shadow-apple transition-all hover:border-apple-green/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Buy Virtual Land</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white">
                  Purchase Faberland property and build your own virtual estate with complete ownership rights.
                </CardDescription>
                <div className="mt-4 aspect-video rounded-md bg-zinc-800"></div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button className="w-full bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple" asChild>
                  <Link href="/marketplace">Browse Land</Link>
                </Button>
              </div>
            </Card>

            <Card className="border-apple-green/30 glass-apple-dark shadow-apple transition-all hover:border-apple-green/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Rent Faberplots</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white">
                  Lease plots and store spaces for your business or creative projects without long-term commitment.
                </CardDescription>
                <div className="mt-4 aspect-video rounded-md bg-zinc-800"></div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button className="w-full bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple" asChild>
                  <Link href="/marketplace?tab=rent">Find Rentals</Link>
                </Button>
              </div>
            </Card>

            <Card className="border-apple-green/30 glass-apple-dark shadow-apple transition-all hover:border-apple-green/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Premium Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white">
                  Discover featured properties in high-traffic areas with special amenities and visibility.
                </CardDescription>
                <div className="mt-4 aspect-video rounded-md bg-zinc-800"></div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button className="w-full bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple" asChild>
                  <Link href="/marketplace?tab=featured">View Featured</Link>
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-apple-green hover:bg-apple-teal text-black font-bold shadow-apple" asChild>
              <Link href="/marketplace">Explore All Faberplots</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Business Benefits Teaser */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Virtual Stores: The Future of Retail
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Discover why businesses are moving to the metaverse with significant cost savings and new opportunities
            </p>
          </div>

          <div className="mx-auto max-w-5xl rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-amber-400">The Cost Advantage</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      ✓
                    </span>
                    <span className="text-zinc-300">No electricity or utility bills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      ✓
                    </span>
                    <span className="text-zinc-300">Zero cleaning and maintenance costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      ✓
                    </span>
                    <span className="text-zinc-300">Instant modifications without construction fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      ✓
                    </span>
                    <span className="text-zinc-300">Premium locations with higher foot traffic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      ✓
                    </span>
                    <span className="text-zinc-300">24/7 shopping without staffing costs</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
                    <Link href="/business-advantages">See Full Comparison</Link>
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold text-amber-400">For Every Industry</h3>
                <p className="mb-4 text-zinc-300">
                  From furniture to fashion, automotive to art, virtual stores provide superior shopping experiences
                  across all product categories.
                </p>
                <p className="mb-4 text-zinc-300">
                  Customers can shop from the comfort of their homes while enjoying immersive, interactive product
                  demonstrations impossible in physical retail.
                </p>
                <div className="mt-6">
                  <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-950/20" asChild>
                    <Link href="/business-advantages">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">Learn how to get started in the metaverse</p>
          </div>
          <Tabs defaultValue="connect" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
              <TabsTrigger value="connect">Connect</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="create">Create</TabsTrigger>
            </TabsList>
            <TabsContent
              value="connect"
              className="mt-6 rounded-xl border border-amber-700/50 bg-zinc-900/50 p-6 backdrop-blur"
            >
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-amber-400">Connect Your Digital Identity</h3>
                  <p className="mb-4 text-zinc-300">
                    Create your digital avatar and connect your wallet to establish your unique identity in the
                    metaverse.
                  </p>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Create a personalized avatar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Connect your digital wallet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Establish your digital presence</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 rounded-lg bg-zinc-800 p-4">
                  <div className="aspect-video rounded bg-zinc-700 flex items-center justify-center">
                    <Image src="/images/faberland-emblem.png" alt="Faberland Emblem" width={120} height={120} />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="explore"
              className="mt-6 rounded-xl border border-amber-700/50 bg-zinc-900/50 p-6 backdrop-blur"
            >
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-amber-400">Explore Virtual Worlds</h3>
                  <p className="mb-4 text-zinc-300">
                    Discover diverse environments, from realistic simulations to fantastical realms beyond imagination.
                  </p>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Visit public and private spaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Attend virtual events and concerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Interact with other users in real-time</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 rounded-lg bg-zinc-800 p-4">
                  <div className="aspect-video rounded bg-zinc-700 flex items-center justify-center">
                    <Image src="/images/faberland-emblem.png" alt="Faberland Emblem" width={120} height={120} />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="create"
              className="mt-6 rounded-xl border border-amber-700/50 bg-zinc-900/50 p-6 backdrop-blur"
            >
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-amber-400">Create and Build</h3>
                  <p className="mb-4 text-zinc-300">
                    Design your own virtual spaces, assets, and experiences using our intuitive creation tools.
                  </p>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Design virtual environments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Create digital assets and NFTs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <span>Program interactive experiences</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 rounded-lg bg-zinc-800 p-4">
                  <div className="aspect-video rounded bg-zinc-700 flex items-center justify-center">
                    <Image src="/images/faberland-emblem.png" alt="Faberland Emblem" width={120} height={120} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 md:py-24 bg-gradient-to-b from-black to-amber-950/30">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Image src="/images/faberland-emblem.png" alt="Faberland" width={100} height={100} />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Experience Faberland VR</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white">
              Download our VR metaverse demo and take your first step into the Faberland experience. Explore immersive
              worlds, connect with others, and discover the future of digital interaction.
            </p>

            <div className="flex justify-center">
              <DownloadButton size="lg" />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
                <VrHeadset className="mx-auto mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">VR Compatible</h3>
                <p className="text-zinc-300">
                  Works with all major VR headsets including Oculus, Vive, and Valve Index.
                </p>
              </div>
              <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
                <Download className="mx-auto mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">Easy Setup</h3>
                <p className="text-zinc-300">Simple installation process gets you into the metaverse in minutes.</p>
              </div>
              <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
                <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">Interactive Demo</h3>
                <p className="text-zinc-300">Explore a fully interactive preview of the Faberland metaverse.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-amber-900/50 to-amber-700/30 p-8 text-center backdrop-blur md:p-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Enter Faberland?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white">
              Join thousands of pioneers already exploring the digital frontier. Your virtual adventure begins now.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
                <Link href="/marketplace">Explore Faberplots</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-apple-green text-apple-green hover:bg-apple-green/10 glass-apple">
                <Download className="mr-2 h-4 w-4" />
                Download VR Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}

// Define interface for FeatureCard props
interface FeatureCardProps {
  icon: React.ReactNode; // Type for the icon (React element)
  title: string;       // Type for the title
  description: string; // Type for the description
}

// Use the interface for the component props
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-amber-700/50 bg-zinc-900/50 backdrop-blur transition-all hover:border-amber-500/50 hover:bg-zinc-900/80">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-zinc-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
