"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { X, Code, PieChart, Briefcase } from "lucide-react"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import EmblemAnimation from "@/components/emblem-animation"
import { ContactForm } from "@/components/contact-form"

export default function AboutPage() {
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-amber-500 hover:bg-amber-600" variant="secondary">
            Our Story
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">About Faberland</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            Learn about our vision, the team behind Faberland, and our mission to create the ultimate metaverse
            experience.
          </p>
        </div>
      </section>

      {/* Faberland Vision */}
      <section className="py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold">Our Vision</h2>
              <p className="mb-4 text-lg text-zinc-300">
                Faberland represents a revolutionary approach to digital real estate and virtual experiences. Inspired
                by the intricate craftsmanship of Fabergé eggs, we've created a metaverse where beauty, functionality,
                and value converge.
              </p>
              <p className="mb-4 text-lg text-zinc-300">
                Our mission is to build a digital realm where creativity knows no bounds, where communities thrive, and
                where digital ownership carries real meaning and value.
              </p>
              <p className="text-lg text-zinc-300">
                Each plot of land in Faberland is unique, represented by our signature Fabergé egg design, symbolizing
                both the precious nature of digital real estate and the infinite possibilities contained within.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-80 w-80">
                <EmblemAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visser Studios Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Visser Studios</h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-300">
              A visual, commercial, and entertainment studio dedicated to pushing the boundaries of the metaverse
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="col-span-1 md:col-span-3">
              <div className="rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
                <div className="flex flex-col items-center md:flex-row md:items-start">
                  <div className="mb-6 flex flex-shrink-0 items-center justify-center md:mb-0 md:mr-6">
                    <Image
                      src="/images/visser-studios-logo.png"
                      alt="Visser Studios"
                      width={60}
                      height={60}
                      className="h-auto w-auto"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-lime-400">Powered by Visser Studios</h3>
                    <p className="mb-4 text-zinc-300">
                      Visser Studios is a pioneering team of designers, developers, and digital artists dedicated to
                      pushing the boundaries of virtual experiences. With expertise in immersive technologies,
                      blockchain integration, and user-centered design, we're building the foundation for the next
                      evolution of digital interaction.
                    </p>
                    <p className="text-zinc-300">
                      Our multidisciplinary team combines technical expertise with creative vision to deliver
                      cutting-edge metaverse experiences that bridge the gap between physical and digital realities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-amber-500/20 p-3">
                  <Code className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Djoek47</h3>
                <p className="mb-2 text-sm font-medium text-amber-400">Technical Director</p>
                <p className="text-zinc-300">
                  Leading all development and technical aspects of Faberland, Djoek47 brings extensive experience in
                  immersive technologies, blockchain integration, and 3D environment creation. Responsible for the
                  technical architecture and implementation of the Faberland metaverse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-amber-500/20 p-3">
                  <Briefcase className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Jolipoulet</h3>
                <p className="mb-2 text-sm font-medium text-amber-400">Commercial Director</p>
                <p className="text-zinc-300">
                  Overseeing all commercial aspects including funding, advertising, communications, and branding.
                  Jolipoulet drives the strategic vision for Faberland's market presence and ensures our metaverse
                  experience resonates with users and partners alike.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-amber-500/20 p-3">
                  <PieChart className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cizur</h3>
                <p className="mb-2 text-sm font-medium text-amber-400">Financial Advisor</p>
                <p className="text-zinc-300">
                  Providing expert guidance on financial strategies and growth opportunities, Cizur ensures the
                  sustainable development of Faberland. With a background in both traditional finance and blockchain
                  economics, he shapes our approach to digital asset valuation and investment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
            <p className="mx-auto max-w-2xl text-zinc-300">
              Have questions about Faberland or interested in partnering with us? Reach out to our team.
            </p>
          </div>

          <div className="mx-auto max-w-2xl rounded-xl border border-amber-700/30 bg-zinc-900/50 p-6 backdrop-blur">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-12 bg-zinc-950">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Legal Information</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
            Review our terms and conditions to understand the legal aspects of using Faberland.
          </p>

          <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">View Terms & Conditions</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-amber-700/30 bg-zinc-900/90 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Terms & Conditions</DialogTitle>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-y-auto pr-6">
                <div className="prose prose-invert max-w-none">
                  <h2>Faberland Virtual Land Purchase & Rental Agreement</h2>
                  <p className="text-gray-300">Last Updated: May 20, 2025</p>

                  <h3>1. Definitions</h3>
                  <p>
                    <strong>1.1 "Faberland"</strong> refers to the virtual metaverse platform operated by Visser
                    Studios.
                  </p>
                  <p>
                    <strong>1.2 "Faberland Estate"</strong> refers to a large virtual land parcel represented as a
                    Fabergé egg NFT, available for purchase on OpenSea and other NFT marketplaces.
                  </p>
                  <p>
                    <strong>1.3 "Faberplot"</strong> refers to a smaller virtual land parcel represented as a Fabergé
                    egg, available exclusively through the Faberland marketplace.
                  </p>
                  <p>
                    <strong>1.4 "User"</strong> refers to any individual or entity that purchases, rents, or interacts
                    with Faberland virtual real estate.
                  </p>

                  <h3>2. Ownership Rights</h3>
                  <p>
                    <strong>2.1</strong> Ownership of a Faberland Estate or Faberplot grants the User certain rights
                    within the Faberland metaverse, including but not limited to:
                  </p>
                  <ul>
                    <li>The right to build and customize virtual structures on the owned land</li>
                    <li>The right to host events and activities within the owned space</li>
                    <li>The right to monetize the owned space through rental, advertising, or other approved means</li>
                    <li>The right to transfer ownership through sale or gift</li>
                  </ul>
                  <p>
                    <strong>2.2</strong> Ownership of virtual land does not confer any ownership rights to the Faberland
                    platform itself, its code, assets, or intellectual property.
                  </p>

                  <h3>3. Rental Terms</h3>
                  <p>
                    <strong>3.1 Rental Period</strong>: Land rental agreements are available in increments of 30, 90, or
                    365 days.
                  </p>
                  <p>
                    <strong>3.2 Rental Rights</strong>: Renters receive limited usage rights to the virtual land,
                    including:
                  </p>
                  <ul>
                    <li>The right to build temporary structures (subject to owner-defined limitations)</li>
                    <li>The right to host events (subject to owner-defined limitations)</li>
                    <li>The right to display content (subject to owner-defined limitations and platform guidelines)</li>
                  </ul>
                  <p>
                    <strong>3.3 Restrictions</strong>: Renters may not:
                  </p>
                  <ul>
                    <li>Transfer rental rights to another party</li>
                    <li>Modify the underlying land parameters</li>
                    <li>Claim ownership of the rented space</li>
                    <li>Violate any platform guidelines or terms of service</li>
                  </ul>

                  <h3>4. Payment Terms</h3>
                  <p>
                    <strong>4.1</strong> All purchases and rentals are denominated in US Dollars (USD) but may be paid
                    in cryptocurrency at the current exchange rate at the time of transaction.
                  </p>
                  <p>
                    <strong>4.2</strong> Faberland Estates purchased as NFTs on OpenSea or other marketplaces are
                    subject to the payment terms of those platforms.
                  </p>
                  <p>
                    <strong>4.3</strong> Faberplots purchased directly through the Faberland marketplace require payment
                    in full at the time of purchase.
                  </p>
                  <p>
                    <strong>4.4</strong> Rental payments are due in full at the beginning of the rental period.
                  </p>

                  <h3>5. Content Guidelines</h3>
                  <p>
                    <strong>5.1</strong> All content created, displayed, or hosted on Faberland virtual real estate must
                    comply with the Faberland Community Guidelines and applicable laws.
                  </p>
                  <p>
                    <strong>5.2</strong> Prohibited content includes but is not limited to:
                  </p>
                  <ul>
                    <li>Illegal content or activities</li>
                    <li>Hateful, discriminatory, or harassing content</li>
                    <li>Sexually explicit or excessively violent content</li>
                    <li>Content that infringes on intellectual property rights</li>
                    <li>Malicious code or exploits</li>
                  </ul>

                  <h3>6. Termination</h3>
                  <p>
                    <strong>6.1</strong> Visser Studios reserves the right to terminate access to the Faberland platform
                    for Users who violate these terms or the Community Guidelines.
                  </p>
                  <p>
                    <strong>6.2</strong> In the event of termination due to violations, ownership of virtual land may be
                    suspended or revoked without refund.
                  </p>

                  <h3>7. Changes to Terms</h3>
                  <p>
                    <strong>7.1</strong> Visser Studios reserves the right to modify these terms at any time. Users will
                    be notified of significant changes.
                  </p>
                  <p>
                    <strong>7.2</strong> Continued use of the platform after changes to the terms constitutes acceptance
                    of the new terms.
                  </p>

                  <h3>8. Limitation of Liability</h3>
                  <p>
                    <strong>8.1</strong> Visser Studios is not liable for any loss of value, access, or functionality of
                    virtual land due to platform changes, technical issues, or market fluctuations.
                  </p>
                  <p>
                    <strong>8.2</strong> Users acknowledge that virtual assets carry inherent risks and that values may
                    fluctuate significantly.
                  </p>

                  <h3>9. Governing Law</h3>
                  <p>
                    <strong>9.1</strong> These terms are governed by and construed in accordance with the laws of the
                    jurisdiction in which Visser Studios operates.
                  </p>
                  <p>
                    <strong>9.2</strong> Any disputes arising from these terms shall be resolved through arbitration in
                    accordance with the rules of the American Arbitration Association.
                  </p>

                  <h3>10. Contact Information</h3>
                  <p>
                    For questions or concerns regarding these terms, please contact us at:
                    <br />
                    <a href="mailto:legal@faberland.com" className="text-purple-400 hover:text-purple-300">
                      legal@faberland.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setTermsOpen(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                >
                  Close Terms
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}
