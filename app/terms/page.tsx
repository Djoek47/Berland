import type { Metadata } from "next"
import { FileText, Shield, Users, DollarSign, AlertTriangle, Scale, Mail, Calendar } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Terms & Conditions | Faberland Metaverse",
  description: "Legal terms and conditions for purchasing and renting virtual land in the Faberland metaverse",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
              <FileText className="w-12 h-12 text-amber-400" />
            </div>
          </div>
          <Badge className="mb-4 bg-amber-500 hover:bg-amber-600 shadow-lg" variant="secondary">
            Legal Documentation
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Clear, transparent terms for your virtual real estate journey in Faberland
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: May 20, 2025</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Legally Binding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-amber-400 mb-2">
                Faberland Virtual Land Purchase & Rental Agreement
              </CardTitle>
              <p className="text-gray-300">
                By using Faberland, you agree to these terms. Please read them carefully.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Section 1: Definitions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">1. Definitions</h3>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">1.1 "Faberland"</h4>
                    <p className="text-gray-300">The virtual metaverse platform operated by Visser Studios.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">1.2 "Faberland Estate"</h4>
                    <p className="text-gray-300">A large virtual land parcel represented as a Fabergé egg NFT, available for purchase on OpenSea and other NFT marketplaces.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">1.3 "Faberplot"</h4>
                    <p className="text-gray-300">A smaller virtual land parcel represented as a Fabergé egg, available exclusively through the Faberland marketplace.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">1.4 "User"</h4>
                    <p className="text-gray-300">Any individual or entity that purchases, rents, or interacts with Faberland virtual real estate.</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Ownership Rights */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">2. Ownership Rights</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">2.1 Rights Granted</h4>
                    <p className="text-gray-300 mb-3">Ownership of a Faberland Estate or Faberplot grants you certain rights within the Faberland metaverse:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to build and customize virtual structures on the owned land</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to host events and activities within the owned space</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to monetize the owned space through rental, advertising, or other approved means</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to transfer ownership through sale or gift</span>
                      </li>
          </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">2.2 Platform Rights</h4>
                    <p className="text-gray-300">Ownership of virtual land does not confer any ownership rights to the Faberland platform itself, its code, assets, or intellectual property.</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Rental Terms */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">3. Rental Terms</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">3.1 Rental Period</h4>
                    <p className="text-gray-300">Land rental agreements are available in increments of 30, 90, or 365 days.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">3.2 Rental Rights</h4>
                    <p className="text-gray-300 mb-3">Renters receive limited usage rights to the virtual land:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to build temporary structures (subject to owner-defined limitations)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to host events (subject to owner-defined limitations)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>The right to display content (subject to owner-defined limitations and platform guidelines)</span>
                      </li>
          </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">3.3 Restrictions</h4>
                    <p className="text-gray-300 mb-3">Renters may not:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Transfer rental rights to another party</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Modify the underlying land parameters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Claim ownership of the rented space</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Violate any platform guidelines or terms of service</span>
                      </li>
          </ul>
                  </div>
                </div>
              </div>

              {/* Section 4: Payment Terms */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">4. Payment Terms</h3>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">4.1 Currency</h4>
                    <p className="text-gray-300">All purchases and rentals are denominated in US Dollars (USD) but may be paid in cryptocurrency at the current exchange rate at the time of transaction.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">4.2 NFT Marketplaces</h4>
                    <p className="text-gray-300">Faberland Estates purchased as NFTs on OpenSea or other marketplaces are subject to the payment terms of those platforms.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">4.3 Direct Purchases</h4>
                    <p className="text-gray-300">Faberplots purchased directly through the Faberland marketplace require payment in full at the time of purchase.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">4.4 Rental Payments</h4>
                    <p className="text-gray-300">Rental payments are due in full at the beginning of the rental period.</p>
                  </div>
                </div>
              </div>

              {/* Section 5: Content Guidelines */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">5. Content Guidelines</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">5.1 Compliance</h4>
                    <p className="text-gray-300">All content created, displayed, or hosted on Faberland virtual real estate must comply with the Faberland Community Guidelines and applicable laws.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">5.2 Prohibited Content</h4>
                    <p className="text-gray-300 mb-3">Prohibited content includes but is not limited to:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Illegal content or activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Hateful, discriminatory, or harassing content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Sexually explicit or excessively violent content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Content that infringes on intellectual property rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Malicious code or exploits</span>
                      </li>
          </ul>
                  </div>
                </div>
              </div>

              {/* Section 6: Legal & Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Scale className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">6. Legal Information</h3>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Termination</h4>
                    <p className="text-gray-300">Visser Studios reserves the right to terminate access to the Faberland platform for Users who violate these terms or the Community Guidelines. In the event of termination due to violations, ownership of virtual land may be suspended or revoked without refund.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Changes to Terms</h4>
                    <p className="text-gray-300">Visser Studios reserves the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the platform after changes to the terms constitutes acceptance of the new terms.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Limitation of Liability</h4>
                    <p className="text-gray-300">Visser Studios is not liable for any loss of value, access, or functionality of virtual land due to platform changes, technical issues, or market fluctuations. Users acknowledge that virtual assets carry inherent risks and that values may fluctuate significantly.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Governing Law</h4>
                    <p className="text-gray-300">These terms are governed by and construed in accordance with the laws of the jurisdiction in which Visser Studios operates. Any disputes arising from these terms shall be resolved through arbitration in accordance with the rules of the American Arbitration Association.</p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-amber-600/20 to-purple-600/20 border border-amber-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-lg bg-amber-500/20">
                    <Mail className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Questions or Concerns?</h3>
                <p className="text-gray-300 mb-4">For questions or concerns regarding these terms, please contact us:</p>
                <a 
                  href="mailto:legal@faberland.com" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
              legal@faberland.com
            </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <MetaverseFooter />
      </div>
  )
}
