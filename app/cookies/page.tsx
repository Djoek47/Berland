import type { Metadata } from "next"
import { Cookie, Settings, BarChart3, Shield, Mail, Calendar } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Cookie Policy | Faberland Metaverse",
  description: "Cookie policy for Faberland metaverse platform - how we use cookies and similar technologies",
}

export default function CookiePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-orange-500/20 backdrop-blur-sm border border-orange-500/30">
              <Cookie className="w-12 h-12 text-orange-400" />
            </div>
          </div>
          <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 shadow-lg" variant="secondary">
            Cookie Policy
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Cookie Policy
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Learn about how we use cookies and similar technologies to enhance your Faberland experience.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: May 20, 2025</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Transparent Usage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-orange-400 mb-2">
                Faberland Cookie Policy
              </CardTitle>
              <p className="text-gray-300">
                This policy explains how we use cookies and similar technologies on the Faberland platform.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Section 1: What Are Cookies */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Cookie className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">1. What Are Cookies?</h3>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-4">
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h4 className="font-semibold text-blue-400 mb-2">Session Cookies</h4>
                      <p className="text-sm text-gray-300">Temporary cookies that are deleted when you close your browser.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <h4 className="font-semibold text-green-400 mb-2">Persistent Cookies</h4>
                      <p className="text-sm text-gray-300">Cookies that remain on your device for a set period of time.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Types of Cookies We Use */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Settings className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">2. Types of Cookies We Use</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">2.1 Essential Cookies</h4>
                    <p className="text-gray-300 mb-3">These cookies are necessary for the website to function properly:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Authentication and login status</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Security and fraud prevention</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Basic website functionality</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">2.2 Analytics Cookies</h4>
                    <p className="text-gray-300 mb-3">These cookies help us understand how you use our website:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Page views and user interactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Performance monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Error tracking and debugging</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">2.3 Functional Cookies</h4>
                    <p className="text-gray-300 mb-3">These cookies enhance your experience:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Language and region preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Theme and display settings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>User interface customizations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3: Third-Party Cookies */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">3. Third-Party Cookies</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">3.1 Analytics Services</h4>
                    <p className="text-gray-300 mb-3">We use third-party analytics services to improve our platform:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Vercel Analytics:</strong> Website performance and usage analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Stripe:</strong> Payment processing and fraud detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Thirdweb:</strong> Wallet connection and blockchain interactions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">3.2 Social Media</h4>
                    <p className="text-gray-300">We may use social media cookies for sharing content and connecting with our community on platforms like Twitter, Discord, and other social networks.</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Managing Cookies */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">4. Managing Your Cookie Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-3">4.1 Browser Settings</h4>
                    <p className="text-gray-300 mb-3">You can control cookies through your browser settings:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Block all cookies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Block third-party cookies only</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Delete existing cookies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Set cookie expiration preferences</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">4.2 Impact of Disabling Cookies</h4>
                    <p className="text-gray-300">Please note that disabling certain cookies may affect the functionality of our website. Essential cookies are required for basic website operation and cannot be disabled.</p>
                  </div>
                </div>
              </div>

              {/* Section 5: Updates to This Policy */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">5. Updates to This Policy</h3>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-gray-300">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the updated policy on our website with a new "Last Updated" date.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border border-orange-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-lg bg-orange-500/20">
                    <Mail className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Questions About Cookies?</h3>
                <p className="text-gray-300 mb-4">Contact us if you have any questions about our use of cookies:</p>
                <a 
                  href="mailto:privacy@faberland.com" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-lg transition-colors"
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
