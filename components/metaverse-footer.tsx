import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, Youtube, Facebook, Github } from "lucide-react"
import DownloadButton from "@/components/download-button"

export default function MetaverseFooter() {
  return (
    <footer className="border-t border-amber-700/20 bg-black text-white">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/faberland-emblem.png" alt="Faberland" width={40} height={40} />
              <Image src="/images/faberland-logo.png" alt="Faberland" width={120} height={30} className="h-auto" />
            </Link>
            <p className="text-sm text-zinc-300">
              Building the future of digital interaction and virtual experiences. Join us in creating the next evolution
              of the internet.
            </p>
            <div className="flex gap-4">
              <Link href="https://x.com/Faber4land" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <Link href="/discover" className="hover:text-amber-400">
                  Virtual Worlds
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-amber-400">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/business-advantages" className="hover:text-amber-400">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/business-advantages#business-benefits" className="hover:text-amber-400">
                  Business Benefits
                </Link>
              </li>
              <li>
                <Link href="/screenshots" className="hover:text-amber-400">
                  Screenshots
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <Link href="/installation-guide" className="hover:text-amber-400">
                  Installation Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-zinc-300">
              Subscribe to our newsletter for the latest Faberland news and updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-amber-700/50 bg-zinc-900/50 text-white placeholder:text-zinc-500"
              />
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">Subscribe</Button>
            </div>
            <div className="mt-4 flex items-center text-xs text-zinc-500">
              <span className="mr-2">Powered by</span>
              <Image src="/images/visser-studios-logo.png" alt="Visser Studios" width={20} height={20} />
              <span className="ml-1">Visser Studios</span>
            </div>
            <div className="mt-4">
              <DownloadButton variant="secondary" size="sm" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-amber-700/20 pt-8 text-sm text-zinc-400 md:flex-row">
          <p>© {new Date().getFullYear()} Faberland. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-amber-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-400">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-amber-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
