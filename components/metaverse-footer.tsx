import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, Youtube, Github } from "lucide-react"
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
              <Link href="https://x.com/Faber4land" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400" title="Follow us on Twitter">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://discord.gg/srq5HdqWcF" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#5865F2]" title="Join our Discord community">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333 1.007-2.419 2.157-2.419c1.18 0 2.175 1.096 2.157 2.42c0 1.333-1.007 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333 1.007-2.419 2.157-2.419c1.18 0 2.175 1.096 2.157 2.42c0 1.333-1.008 2.418-2.157 2.418z"/>
                </svg>
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400" title="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400" title="Subscribe to our YouTube channel">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-amber-400" title="Check out our GitHub">
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
            <Link href="/privacy" className="hover:text-amber-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-400">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-amber-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
