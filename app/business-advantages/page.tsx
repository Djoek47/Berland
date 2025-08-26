"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  Building,
  Store,
  Briefcase,
  BarChart3,
  DollarSign,
  Clock,
  Globe,
  Users,
  ShoppingBag,
  Smartphone,
  Zap,
  TrendingUp,
  MapPin, 
  Gem, 
  Rocket, 
  Crown, 
  Star,
  CheckCircle,
  Target,
  Sparkles
} from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import ROICalculator from "@/components/roi-calculator"
import AnimatedCounter from "@/components/animated-counter"
import AnimatedComparison from "@/components/animated-comparison"
import AnimatedIcon from "@/components/animated-icon"

export default function RoadmapAndBusinessPage() {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1')

  const roadmapPhases = [
    {
      id: 'phase-1',
      title: 'Foundation & Land Acquisition',
      description: 'The birth of Faberland - establishing the virtual real estate market and core infrastructure',
      status: 'completed',
      progress: 100,
      startDate: 'Q1 2024',
      endDate: 'Q2 2024',
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-green-500',
      features: [
        '47 Faberplots virtual real estate system',
        '25 Faberland Estates NFT collection',
        'Stripe payment integration for plot rentals',
        'User dashboard with plot management',
        '3D object upload system for plot customization',
        'Basic marketplace functionality'
      ],
      achievements: [
        '✅ Virtual real estate marketplace launched',
        '✅ Secure payment processing implemented',
        '✅ User plot management system active',
        '✅ 3D object upload capabilities ready'
      ]
    },
    {
      id: 'phase-2',
      title: 'Store Launch & Commerce Revolution',
      description: 'Opening the doors to virtual commerce with the first Faberland stores',
      status: 'in-progress',
      progress: 85,
      startDate: 'Q3 2024',
      endDate: 'Q4 2024',
      icon: <Store className="w-6 h-6" />,
      color: 'bg-amber-500',
      features: [
        'Virtual storefront system launch',
        '3D product showcase capabilities',
        'Interactive shopping experiences',
        'Store management dashboard',
        'Product catalog system',
        'Virtual fitting rooms'
      ],
      achievements: [
        '✅ Store launch countdown active',
        '✅ 3D object management system ready',
        '🔄 Storefront templates in development',
        '⏳ Virtual commerce platform building'
      ]
    },
    {
      id: 'phase-3',
      title: 'Community & Social Hub',
      description: 'Building the heart of Faberland - where communities thrive and connections flourish',
      status: 'upcoming',
      progress: 25,
      startDate: 'Q1 2025',
      endDate: 'Q2 2025',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500',
      features: [
        'Social networking features',
        'Community events and gatherings',
        'Virtual meeting spaces',
        'User profiles and avatars',
        'Chat and communication systems',
        'Community governance tools'
      ],
      achievements: [
        '⏳ Social infrastructure planning',
        '⏳ Avatar system design',
        '⏳ Community tools development',
        '⏳ Event management system'
      ]
    },
    {
      id: 'phase-4',
      title: 'Advanced Virtual Experiences',
      description: 'Pushing the boundaries of virtual reality with immersive experiences and entertainment',
      status: 'upcoming',
      progress: 10,
      startDate: 'Q3 2025',
      endDate: 'Q4 2025',
      icon: <Gem className="w-6 h-6" />,
      color: 'bg-yellow-500',
      features: [
        'VR/AR integration',
        'Interactive games and activities',
        'Virtual concerts and events',
        'Educational experiences',
        'Creative workshops',
        'Virtual tourism'
      ],
      achievements: [
        '⏳ VR technology research',
        '⏳ Interactive experience design',
        '⏳ Entertainment platform planning',
        '⏳ Educational content development'
      ]
    },
    {
      id: 'phase-5',
      title: 'Economic Ecosystem',
      description: 'Creating a thriving virtual economy with jobs, services, and financial systems',
      status: 'future',
      progress: 0,
      startDate: 'Q1 2026',
      endDate: 'Q2 2026',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-emerald-500',
      features: [
        'Virtual job market',
        'Service marketplace',
        'Virtual currency system',
        'Investment opportunities',
        'Business partnerships',
        'Economic governance'
      ],
      achievements: [
        '⏳ Economic system design',
        '⏳ Job market planning',
        '⏳ Currency development',
        '⏳ Partnership framework'
      ]
    },
    {
      id: 'phase-6',
      title: 'The Infinite Metaverse',
      description: 'The ultimate vision - a limitless virtual universe where imagination knows no bounds',
      status: 'future',
      progress: 0,
      startDate: 'Q3 2026',
      endDate: 'Ongoing',
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-yellow-500',
      features: [
        'Infinite world generation',
        'User-created universes',
        'Advanced physics simulation',
        'Time manipulation',
        'Reality blending',
        'Cosmic exploration'
      ],
      achievements: [
        '⏳ Infinite generation algorithms',
        '⏳ User creation tools',
        '⏳ Advanced physics engine',
        '⏳ Reality simulation systems'
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'future': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      case 'upcoming': return <Target className="w-4 h-4" />
      case 'future': return <Star className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  const selectedPhaseData = roadmapPhases.find(phase => phase.id === selectedPhase)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
            Roadmap & Business Solutions
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            The Future of Business in the Metaverse
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            From virtual real estate to infinite possibilities - discover how Faberland is revolutionizing business 
            operations and creating new opportunities in the digital economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
              <a href="#roadmap">View Roadmap</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
              asChild
            >
              <a href="#business-benefits">Business Benefits</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 bg-gradient-to-br from-slate-900 via-amber-900/30 to-slate-900">
        <div className="container mx-auto px-4">
          {/* Roadmap Hero */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Faberland Roadmap
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From virtual real estate to infinite possibilities - the journey of Faberland metaverse
            </p>
            <div className="flex justify-center items-center gap-4 mt-6">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-4 h-4 mr-2" />
                Foundation Complete
              </Badge>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                <Clock className="w-4 h-4 mr-2" />
                Store Launch Coming
              </Badge>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                <Star className="w-4 h-4 mr-2" />
                Infinite Vision
              </Badge>
            </div>
          </div>

          {/* Roadmap Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {roadmapPhases.map((phase) => (
              <Card 
                key={phase.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPhase === phase.id ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => setSelectedPhase(phase.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${phase.color} text-white`}>
                      {phase.icon}
                    </div>
                    <Badge className={getStatusColor(phase.status)}>
                      {getStatusIcon(phase.status)}
                      <span className="ml-1 capitalize">{phase.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{phase.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {phase.startDate} - {phase.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Phase View */}
          {selectedPhaseData && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${selectedPhaseData.color} text-white`}>
                    {selectedPhaseData.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedPhaseData.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {selectedPhaseData.startDate} - {selectedPhaseData.endDate}
                    </CardDescription>
                  </div>
                  <Badge className={`ml-auto ${getStatusColor(selectedPhaseData.status)}`}>
                    {getStatusIcon(selectedPhaseData.status)}
                    <span className="ml-1 capitalize">{selectedPhaseData.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhaseData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Achievements & Status
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhaseData.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{selectedPhaseData.progress}%</span>
                  </div>
                  <Progress value={selectedPhaseData.progress} className="h-3" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vision Statement */}
          <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  The Faberland Vision
                </h2>
                <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                  "In Faberland, we're not just building a metaverse - we're creating a new dimension of human experience. 
                  From the first virtual plot to the infinite possibilities of consciousness, every step forward is a leap 
                  into the future. This roadmap is our promise to you: that the journey never ends, and the adventure 
                  only gets more extraordinary with each passing phase. Together, we'll explore the boundaries of what's 
                  possible and discover what lies beyond."
                </p>
                <div className="mt-6 flex justify-center">
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    <Crown className="w-4 h-4 mr-2" />
                    The Adventure Never Ends
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section id="business-benefits" className="py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
              Business Solutions
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Transform Your Business in the Metaverse
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Discover how Faberland can revolutionize your business operations, reduce costs, and create new revenue
              streams in the digital economy with 24/7 traffic generation.
            </p>
          </div>
        </div>
      </section>

      {/* 24/7 Traffic Generation Section */}
      <section className="py-12 bg-zinc-950">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                24/7 Traffic Generation
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Unlike physical stores with limited hours, your virtual presence in Faberland works around the clock,
              generating traffic and sales opportunities continuously.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur text-center">
              <Clock className="mx-auto mb-4 h-12 w-12 text-amber-400" />
              <h3 className="mb-2 text-xl font-bold">Hours Open Per Week</h3>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div>
                  <div className="text-sm text-red-400">Physical Store</div>
                  <div className="text-4xl font-bold text-white mt-1">
                    <AnimatedCounter end={40} suffix=" hrs" className="text-4xl font-bold" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-green-400">Virtual Store</div>
                  <div className="text-4xl font-bold text-white mt-1">
                    <AnimatedCounter end={168} suffix=" hrs" className="text-4xl font-bold" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-zinc-300">
                Your virtual store never closes, allowing customers from all time zones to shop at their convenience.
              </p>
            </div>

            <div className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur text-center">
              <Globe className="mx-auto mb-4 h-12 w-12 text-amber-400" />
              <h3 className="mb-2 text-xl font-bold">Global Reach</h3>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div>
                  <div className="text-sm text-red-400">Physical Store</div>
                  <div className="text-4xl font-bold text-white mt-1">
                    <AnimatedCounter end={5} suffix=" mi" className="text-4xl font-bold" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-green-400">Virtual Store</div>
                  <div className="text-4xl font-bold text-white mt-1">
                    <AnimatedCounter end={24901} suffix=" mi" className="text-4xl font-bold" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-zinc-300">
                Reach customers worldwide without geographical limitations, expanding your market exponentially.
              </p>
            </div>

            <div className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-amber-400" />
              <h3 className="mb-2 text-xl font-bold">Monthly Visitors</h3>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div>
                  <div className="text-sm text-red-400">Physical Store</div>
                  <div className="text-4xl font-bold text-white mt-1">
                    <AnimatedCounter end={1200} className="text-4xl font-bold" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-green-400">Virtual Store</div>
                  <div className="text-4xl font-bold text-white mt-1">
                    <AnimatedCounter end={8500} className="text-4xl font-bold" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-zinc-300">
                Attract significantly more visitors with 24/7 accessibility and global reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Solutions for Every Business
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-white">
              Whether you're a large established business or a small online-only operation, Faberland offers tailored
              solutions to meet your needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <Building className="h-8 w-8 text-amber-400" />
                <h3 className="text-xl font-bold">Large Established Businesses</h3>
              </div>
              <p className="mb-4 text-white">
                For businesses with physical stores looking to transition to a virtual presence, Faberland offers a
                cost-effective way to maintain your brand presence while significantly reducing overhead costs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">Reduce physical store footprint while expanding market reach</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">
                    Eliminate utility bills, maintenance costs, and staffing expenses
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">
                    Create immersive product demonstrations impossible in physical retail
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">Maintain brand consistency while embracing digital innovation</span>
                </li>
              </ul>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
                <a href="#calculator">Calculate Transition ROI</a>
              </Button>
            </div>

            <div className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="h-8 w-8 text-amber-400" />
                <h3 className="text-xl font-bold">Small Online-Only Businesses</h3>
              </div>
              <p className="mb-4 text-white">
                For small businesses operating exclusively online, Faberland provides an opportunity to create a
                memorable shopping experience that stands out from traditional e-commerce.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">Increase traffic with a unique, immersive shopping experience</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">Showcase products in 3D with interactive VR visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">Build customer loyalty through engaging virtual experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    ✓
                  </span>
                  <span className="text-white">
                    Compete with larger retailers through innovative customer engagement
                  </span>
                </li>
              </ul>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
                <Link href="/marketplace">Explore Virtual Storefronts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Physical vs. Virtual: The Cost Advantage
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              See how virtual stores dramatically reduce operating costs while expanding your business potential.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedComparison
              title="Monthly Rent"
              physicalValue="$5,000"
              virtualValue="$200"
              description="Virtual spaces in Faberland cost a fraction of physical retail space, with premium locations available at significantly lower rates."
              icon={<Building className="h-6 w-6" />}
            />

            <AnimatedComparison
              title="Utilities & Maintenance"
              physicalValue="$2,300"
              virtualValue="$0"
              description="Eliminate electricity, water, heating, cleaning, and maintenance costs entirely with a virtual store."
              icon={<Zap className="h-6 w-6" />}
            />

            <AnimatedComparison
              title="Staffing Costs"
              physicalValue="$12,000"
              virtualValue="$1,000"
              description="Automated virtual assistants and self-service features dramatically reduce staffing requirements while maintaining 24/7 operation."
              icon={<Users className="h-6 w-6" />}
            />

            <AnimatedComparison
              title="Renovation Costs"
              physicalValue="$25,000"
              virtualValue="$500"
              description="Update your virtual store's appearance, layout, and features instantly at minimal cost, without construction or downtime."
              icon={<Store className="h-6 w-6" />}
            />

            <AnimatedComparison
              title="Market Reach"
              physicalValue="Local"
              virtualValue="Global"
              description="Expand from a local customer base to worldwide reach, accessing international markets without additional physical locations."
              icon={<Globe className="h-6 w-6" />}
            />

            <AnimatedComparison
              title="Annual Growth Potential"
              physicalValue="8-12%"
              virtualValue="25-40%"
              description="Virtual stores typically experience significantly higher growth rates due to 24/7 accessibility, global reach, and innovative shopping experiences."
              icon={<TrendingUp className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section with Animations */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Key Business Benefits
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Discover the transformative advantages of establishing your business in the metaverse.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedIcon
              icon={<DollarSign className="h-10 w-10" />}
              title="Reduced Overhead"
              description="Eliminate physical space expenses, utilities, and maintenance costs."
              delay={0}
            />

            <AnimatedIcon
              icon={<Clock className="h-10 w-10" />}
              title="24/7 Availability"
              description="Your virtual store never closes, serving customers around the clock without staffing costs."
              delay={200}
            />

            <AnimatedIcon
              icon={<Globe className="h-10 w-10" />}
              title="Global Reach"
              description="Connect with customers worldwide without geographical limitations."
              delay={400}
            />

            <AnimatedIcon
              icon={<ShoppingBag className="h-10 w-10" />}
              title="Enhanced Experience"
              description="Provide immersive, interactive product demonstrations impossible in physical retail."
              delay={600}
            />

            <AnimatedIcon
              icon={<Store className="h-10 w-10" />}
              title="Flexible Space"
              description="Instantly reconfigure your virtual space without construction costs."
              delay={800}
            />

            <AnimatedIcon
              icon={<Briefcase className="h-10 w-10" />}
              title="New Revenue Streams"
              description="Unlock innovative business models and monetization opportunities."
              delay={1000}
            />

            <AnimatedIcon
              icon={<BarChart3 className="h-10 w-10" />}
              title="Detailed Analytics"
              description="Gain comprehensive insights into customer behavior and preferences."
              delay={1200}
            />

            <AnimatedIcon
              icon={<Calculator className="h-10 w-10" />}
              title="Measurable ROI"
              description="Track performance with clear metrics and see rapid return on investment."
              delay={1400}
            />
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-16 bg-gradient-to-b from-black to-amber-950/20">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Calculate Your Potential ROI
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Use our interactive calculator to estimate the potential return on investment for your business by
              comparing physical retail costs to a virtual presence in Faberland.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Join the Future?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
            Whether you're exploring our roadmap vision or ready to transform your business in the metaverse, 
            Faberland offers endless possibilities. Start your journey today and be part of the digital revolution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
              <Link href="/marketplace">Explore Available Plots</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
              asChild
            >
              <a href="#roadmap">View Full Roadmap</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-950/20"
              asChild
            >
              <Link href="/about">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}
