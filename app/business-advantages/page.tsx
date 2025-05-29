import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import ROICalculator from "@/components/roi-calculator"
import AnimatedCounter from "@/components/animated-counter"
import AnimatedComparison from "@/components/animated-comparison"
import AnimatedIcon from "@/components/animated-icon"

export default function BusinessAdvantagesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
            Business Solutions
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Transform Your Business in the Metaverse
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            Discover how Faberland can revolutionize your business operations, reduce costs, and create new revenue
            streams in the digital economy with 24/7 traffic generation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
              <a href="#calculator">Calculate Your ROI</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
              asChild
            >
              <Link href="/marketplace">Explore Virtual Spaces</Link>
            </Button>
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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Transform Your Business?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
            Join the growing number of businesses establishing their presence in the Faberland metaverse. Our team can
            help you create a customized virtual space tailored to your specific business needs.
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
              <Link href="/about">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}
