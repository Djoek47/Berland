"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  MapPin, 
  Gem, 
  Store, 
  Users, 
  Rocket, 
  Zap, 
  Globe, 
  Crown, 
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Palette,
  Gamepad2,
  Building2,
  Car,
  Plane,
  Ship,
  TreePine,
  Mountain,
  Waves,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'

interface RoadmapPhase {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming' | 'future'
  progress: number
  startDate: string
  endDate: string
  features: string[]
  icon: React.ReactNode
  color: string
  achievements: string[]
}

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1')

  const roadmapPhases: RoadmapPhase[] = [
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
      color: 'bg-blue-500',
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
      color: 'bg-purple-500',
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
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-orange-500',
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
      title: 'AI & Automation Integration',
      description: 'Harnessing artificial intelligence to create intelligent virtual assistants and automated systems',
      status: 'future',
      progress: 0,
      startDate: 'Q3 2026',
      endDate: 'Q4 2026',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-cyan-500',
      features: [
        'AI-powered virtual assistants',
        'Automated property management',
        'Smart city infrastructure',
        'Predictive analytics',
        'Personalized experiences',
        'Intelligent customer service'
      ],
      achievements: [
        '⏳ AI technology research',
        '⏳ Automation system design',
        '⏳ Smart infrastructure planning',
        '⏳ Personalization algorithms'
      ]
    },
    {
      id: 'phase-7',
      title: 'Cross-Platform Expansion',
      description: 'Breaking down barriers - bringing Faberland to every device and platform',
      status: 'future',
      progress: 0,
      startDate: 'Q1 2027',
      endDate: 'Q2 2027',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-indigo-500',
      features: [
        'Mobile app development',
        'Console integration',
        'Smart TV compatibility',
        'Wearable device support',
        'Cross-platform synchronization',
        'Offline capabilities'
      ],
      achievements: [
        '⏳ Platform compatibility research',
        '⏳ Mobile development planning',
        '⏳ Cross-platform architecture',
        '⏳ Offline mode design'
      ]
    },
    {
      id: 'phase-8',
      title: 'Metaverse Federation',
      description: 'Connecting Faberland with other virtual worlds to create a unified metaverse experience',
      status: 'future',
      progress: 0,
      startDate: 'Q3 2027',
      endDate: 'Q4 2027',
      icon: <Rocket className="w-6 h-6" />,
      color: 'bg-pink-500',
      features: [
        'Inter-world travel system',
        'Cross-metaverse commerce',
        'Shared virtual currency',
        'Universal avatar system',
        'Collaborative events',
        'Metaverse standards'
      ],
      achievements: [
        '⏳ Federation protocol design',
        '⏳ Inter-world communication',
        '⏳ Universal standards development',
        '⏳ Partnership network building'
      ]
    },
    {
      id: 'phase-9',
      title: 'Advanced AI & Consciousness',
      description: 'Exploring the frontiers of virtual consciousness and artificial intelligence',
      status: 'future',
      progress: 0,
      startDate: 'Q1 2028',
      endDate: 'Q2 2028',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-violet-500',
      features: [
        'Advanced AI consciousness',
        'Emotional intelligence systems',
        'Virtual life simulation',
        'AI-human collaboration',
        'Ethical AI governance',
        'Consciousness research'
      ],
      achievements: [
        '⏳ Consciousness research',
        '⏳ AI ethics framework',
        '⏳ Emotional AI development',
        '⏳ Human-AI collaboration'
      ]
    },
    {
      id: 'phase-10',
      title: 'The Infinite Metaverse',
      description: 'The ultimate vision - a limitless virtual universe where imagination knows no bounds',
      status: 'future',
      progress: 0,
      startDate: 'Q3 2028',
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
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Faberland Roadmap
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From virtual real estate to infinite possibilities - the journey of Faberland metaverse
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="w-4 h-4 mr-2" />
              Foundation Complete
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              <Clock className="w-4 h-4 mr-2" />
              Store Launch Coming
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
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
                selectedPhase === phase.id ? 'ring-2 ring-purple-500' : ''
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
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
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
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
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
    </div>
  )
}
