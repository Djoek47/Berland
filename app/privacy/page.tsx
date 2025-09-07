import type { Metadata } from "next"
import { Shield, Eye, Lock, Database, Mail, Calendar } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Privacy Policy | Faberland Metaverse",
  description: "Privacy policy for Faberland metaverse platform - how we collect, use, and protect your data",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-green-500/20 backdrop-blur-sm border border-green-500/30">
              <Shield className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <Badge className="mb-4 bg-green-500 hover:bg-green-600 shadow-lg" variant="secondary">
            Privacy & Security
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: May 20, 2025</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-green-400 mb-2">
                Faberland Privacy Policy
              </CardTitle>
              <p className="text-gray-300">
                This policy describes how we collect, use, and protect your information when you use Faberland.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Section 1: Information We Collect */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">1. Information We Collect</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">1.1 Personal Information</h4>
                    <p className="text-gray-300 mb-3">We may collect the following personal information:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Email address (for account creation and communication)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Wallet addresses (for virtual land transactions)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Payment information (processed securely through Stripe)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Usage data and analytics (to improve our services)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">1.2 Technical Information</h4>
                    <p className="text-gray-300">We automatically collect technical information including IP addresses, browser type, device information, and usage patterns to provide and improve our services.</p>
                  </div>
                </div>
              </div>

              {/* Section 2: How We Use Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">2. How We Use Your Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">2.1 Service Provision</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Process virtual land purchases and rentals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Provide customer support and account management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Send important updates about your virtual properties</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">2.2 Platform Improvement</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Analyze usage patterns to improve user experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Develop new features and services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Ensure platform security and prevent fraud</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3: Data Protection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Lock className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">3. Data Protection & Security</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">3.1 Security Measures</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>End-to-end encryption for sensitive data transmission</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Secure cloud storage with industry-standard protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Regular security audits and updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Limited access to personal data on a need-to-know basis</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">3.2 Data Retention</h4>
                    <p className="text-gray-300">We retain your personal information only as long as necessary to provide our services and comply with legal obligations. Account data is deleted upon request or after account inactivity.</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Your Rights */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">4. Your Privacy Rights</h3>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Access & Portability</h4>
                    <p className="text-gray-300">You have the right to access your personal data and receive a copy in a portable format.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Correction & Updates</h4>
                    <p className="text-gray-300">You can update or correct your personal information at any time through your account settings.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Deletion</h4>
                    <p className="text-gray-300">You can request deletion of your personal data, subject to legal and operational requirements.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Opt-out</h4>
                    <p className="text-gray-300">You can opt out of marketing communications while still receiving essential service updates.</p>
                  </div>
                </div>
              </div>

              {/* Section 5: Third Parties */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Database className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">5. Third-Party Services</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">5.1 Service Providers</h4>
                    <p className="text-gray-300 mb-3">We work with trusted third-party services:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Stripe:</strong> Secure payment processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Vercel:</strong> Hosting and analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Thirdweb:</strong> Wallet connection services</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">5.2 Data Sharing</h4>
                    <p className="text-gray-300">We do not sell your personal information. We only share data with third parties as necessary to provide our services, and they are bound by strict data protection agreements.</p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Questions About Privacy?</h3>
                <p className="text-gray-300 mb-4">Contact us for any privacy-related questions or to exercise your rights:</p>
                <a 
                  href="mailto:privacy@faberland.com" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  privacy@faberland.com
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
