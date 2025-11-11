import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Expand, HeadsetIcon as VrHeadset, Gamepad2, Users, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import DownloadButton from "@/components/download-button"
import VideoPlayer from "@/components/video-player"

export default function DiscoverPage() {
  // This would normally come from a database or CMS
  const screenshots = [
    {
      id: 1,
      title: "Immersive Horizon View",
      description:
        "Experience breathtaking vistas with virtual hands reaching toward floating objects in the distance.",
      category: "environments",
      image: "/screenshots/vr-screenshot-1.jpeg",
    },
    {
      id: 2,
      title: "Zero Gravity Experience",
      description: "Float freely in the metaverse with our advanced physics system that simulates weightlessness.",
      category: "features",
      image: "/screenshots/vr-screenshot-2.jpeg",
    },
    {
      id: 3,
      title: "Interactive Objects",
      description: "Engage with responsive virtual objects that react to your touch and movements.",
      category: "features",
      image: "/screenshots/vr-screenshot-3.jpeg",
    },
    {
      id: 4,
      title: "Avatar Customization",
      description: "Express yourself with fully customizable avatars and unique clothing options.",
      category: "features",
      image: "/screenshots/vr-screenshot-4.png",
    },
    {
      id: 5,
      title: "Aerial Perspective",
      description: "Gain a bird's eye view of your property and the surrounding landscape.",
      category: "properties",
      image: "/screenshots/vr-screenshot-5.png",
    },
    {
      id: 6,
      title: "Night Sky Exploration",
      description: "Witness stunning cosmic vistas with our realistic celestial environments.",
      category: "environments",
      image: "/screenshots/vr-screenshot-6.jpeg",
    },
    {
      id: 7,
      title: "Sunset Vistas",
      description: "Experience day-night cycles with breathtaking sunsets across the virtual horizon.",
      category: "environments",
      image: "/screenshots/vr-screenshot-7.jpeg",
    },
    {
      id: 8,
      title: "Aurora Borealis Experience",
      description: "Witness the northern lights in our special atmospheric environments.",
      category: "environments",
      image: "/screenshots/vr-screenshot-8.jpeg",
    },
    {
      id: 9,
      title: "Advanced Avatar Physics",
      description: "Our avatars feature realistic movement and physics for an immersive experience.",
      category: "features",
      image: "/screenshots/vr-screenshot-9.jpeg",
    },
    {
      id: 10,
      title: "Cosmic Structures",
      description: "Explore unique architectural elements that defy physical world limitations.",
      category: "properties",
      image: "/screenshots/vr-screenshot-10.jpeg",
    },
  ]

  // Video content for the video player with the new YouTube links
  const videos = [
    {
      id: "VnblkXuEzVo",
      title: "Faberland Virtual World Tour",
      description: "Take a guided tour through the stunning landscapes and architecture of Faberland.",
    },
    {
      id: "McKQziN6TWg",
      title: "Metaverse Business Opportunities",
      description: "Discover how businesses are leveraging virtual spaces in Faberland.",
    },
    {
      id: "r3sLReKV1PU",
      title: "Virtual Reality Experience",
      description: "See how users interact with Faberland using VR technology.",
    },
    {
      id: "2ttQoNxzRjc",
      title: "Digital Asset Creation",
      description: "Learn about creating and monetizing digital assets in the metaverse.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
            Visual Tour
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Discover Faberland</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Take a visual journey through the Faberland metaverse. Explore environments, features, and available
            properties in our virtual world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <DownloadButton />
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-12 bg-zinc-950">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Experience Faberland
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white mb-8">
              Watch our showcase videos to see the Faberland metaverse in action
            </p>
            <div className="mx-auto max-w-4xl">
              <VideoPlayer videos={videos} autoplay={false} autoRotate={true} rotationInterval={180000} />
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-12">
        <div className="container px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="bg-zinc-900">
                <TabsTrigger value="all">All Screenshots</TabsTrigger>
                <TabsTrigger value="environments">Environments</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screenshots.map((screenshot) => (
                  <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="environments" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screenshots
                  .filter((s) => s.category === "environments")
                  .map((screenshot) => (
                    <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screenshots
                  .filter((s) => s.category === "features")
                  .map((screenshot) => (
                    <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="properties" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screenshots
                  .filter((s) => s.category === "properties")
                  .map((screenshot) => (
                    <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Experience Faberland
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white">
              Our VR demo showcases the best features of the Faberland metaverse
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <VrHeadset className="mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">Immersive VR</h3>
                <p className="text-white">
                  Full VR support with intuitive controls and seamless movement throughout the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Users className="mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">Social Interaction</h3>
                <p className="text-white">
                  Connect with other users, communicate via voice chat, and express yourself with gestures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Globe className="mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">Explore Environments</h3>
                <p className="text-white">
                  Visit diverse districts, each with unique architecture, activities, and atmosphere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Gamepad2 className="mb-4 h-12 w-12 text-amber-400" />
                <h3 className="mb-2 text-xl font-bold">Interactive Elements</h3>
                <p className="text-white">
                  Engage with interactive objects, play mini-games, and participate in events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Faberstore Section */}
      <section className="py-16 bg-gradient-to-b from-zinc-950 to-black">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Fabershop - VR Merch Shop
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white">
              The only functional shop in the metaverse! Experience Proof of Concept collection
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/Minimal_-_Artboard_2-removebg-preview.png"
                  alt="Proof of Concept Logo"
                  width={60}
                  height={60}
                  className="w-15 h-15 object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">Proof of Concept Collection</h3>
                  <p className="text-amber-400">Premium VR Merchandise</p>
                </div>
              </div>
              
              <p className="text-lg text-white">
                Fabershop is the first functional VR merchandise shop in the Faberland metaverse. 
                Each item in our Proof of Concept collection comes with a unique QR code that connects 
                to your Faberland avatar, unlocking exclusive in-game items and experiences.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-lg p-4 border border-white/20 backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500/20 before:via-purple-500/20 before:to-blue-500/20 before:opacity-50 before:blur-sm">
                  <div className="relative z-10">
                    <h4 className="font-semibold text-white mb-2">Metaverse to Reality</h4>
                    <p className="text-sm text-white">Bridge digital and physical worlds with premium merchandise</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg p-4 border border-white/20 backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/20 before:via-emerald-500/20 before:to-amber-500/20 before:opacity-50 before:blur-sm">
                  <div className="relative z-10">
                    <h4 className="font-semibold text-white mb-2">Digital Identity</h4>
                    <p className="text-sm text-white">Connect your purchases to your Faberland avatar</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  asChild
                >
                  <a href="https://www.faberland.shop/" target="_blank" rel="noopener noreferrer">
                    Visit Fabershop
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
                  asChild
                >
                  <Link href="/marketplace?tab=faberplot">Rent Your Own Shop</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden border border-amber-500/30">
                <Image
                  src="/images/Minimal_-_Artboard_2-removebg-preview.png"
                  alt="Fabershop - Proof of Concept Collection"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-500 text-black px-4 py-2 rounded-lg font-bold">
                Live in VR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Business Case Studies
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white">
              Discover how businesses are leveraging Faberland to transform their operations
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <h3 className="text-2xl font-medium mb-4">Global Tech Company Transforms Training with Faberland</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">87%</div>
                <p className="text-white">Increase in training engagement</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">42%</div>
                <p className="text-white">Reduction in training costs</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">3.5x</div>
                <p className="text-white">Improvement in knowledge retention</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
                <Link href="/business-advantages">Explore Business Benefits</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-amber-950/20">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Step Inside?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white">
            Download the Faberland VR demo today and experience the metaverse firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <DownloadButton size="lg" />
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
              asChild
            >
              <a href="/installation-guide">Installation Guide</a>
            </Button>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}

interface ScreenshotCardProps {
  screenshot: {
    id: number
    title: string
    description: string
    category: string
    image: string
  }
}

function ScreenshotCard({ screenshot }: ScreenshotCardProps) {
  return (
    <Card className="overflow-hidden border-amber-700/30 bg-zinc-900/50 backdrop-blur transition-all hover:border-amber-500/50 hover:bg-zinc-900/80">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer group">
            <Image
              src={screenshot.image || "/placeholder.svg"}
              alt={screenshot.title}
              width={800}
              height={600}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Expand className="h-10 w-10 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl border-amber-700/30 bg-zinc-900/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-white">{screenshot.title}</DialogTitle>
            <DialogDescription className="text-white">{screenshot.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 overflow-hidden rounded-lg">
            <Image
              src={screenshot.image || "/placeholder.svg"}
              alt={screenshot.title}
              width={1200}
              height={800}
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
      <CardContent className="p-4">
        <h3 className="mb-1 text-lg font-bold text-white">{screenshot.title}</h3>
        <p className="text-sm text-white">{screenshot.description}</p>
      </CardContent>
    </Card>
  )
}
