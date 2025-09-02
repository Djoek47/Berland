"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import DownloadButton from "@/components/download-button"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const ClientConnectWallet = () => {
  const address = useAddress()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setIsConnected(!!address)
  }, [address])

  return (
    <div className="flex items-center gap-4">
      <ConnectWallet
        theme="dark"
        btnTitle="Connect Wallet"
        modalSize="wide"
        welcomeScreen={{
          title: "Welcome to Faberland",
          subtitle: "Connect your wallet to get started",
        }}
        modalTitleIconUrl="/images/faberland-emblem.png"
        modalTitle="Connect Wallet"
        style={{
          backgroundColor: "#22C55E",
          color: "#ffffff",
          fontWeight: "600",
        }}
      />
      {isConnected && (
        <Link href="/dashboard">
          <Button className="bg-apple-green hover:bg-apple-teal text-white font-semibold shadow-apple">
            Dashboard
          </Button>
        </Link>
      )}
    </div>
  )
}

export default function MetaverseNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const address = useAddress()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setIsConnected(!!address)
  }, [address])

  return (
    <header className="sticky top-0 z-50 border-b border-apple-green/20 glass-apple-dark">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/faberland-emblem.png" alt="Faberland" width={40} height={40} />
          <Image src="/images/faberland-logo.png" alt="Faberland" width={120} height={30} className="h-auto" />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="/" className="text-sm text-white transition-colors hover:text-apple-green">
            Home
          </Link>
          <Link href="/marketplace" className="text-sm text-white transition-colors hover:text-apple-green">
            Marketplace
          </Link>
          <Link href="/discover" className="text-sm text-white transition-colors hover:text-apple-green">
            Discover
          </Link>
          <Link href="/business-advantages" className="text-sm text-white transition-colors hover:text-apple-green">
            Roadmap
          </Link>
          <Link href="/about" className="text-sm text-white transition-colors hover:text-apple-green">
            About
          </Link>
          <Link href="/installation-guide" className="text-sm text-white transition-colors hover:text-apple-green">
            Installation
          </Link>

        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <DownloadButton variant="default" size="sm" />
          <ClientConnectWallet />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-amber-700/50 bg-black/95 backdrop-blur">
            <div className="flex flex-col gap-8 pt-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Image src="/images/faberland-emblem.png" alt="Faberland" width={40} height={40} />
                <Image src="/images/faberland-logo.png" alt="Faberland" width={120} height={30} className="h-auto" />
              </Link>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-white transition-colors hover:text-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/marketplace"
                  className="text-white transition-colors hover:text-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  href="/discover"
                  className="text-white transition-colors hover:text-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  Discover
                </Link>
                <Link
                  href="/business-advantages"
                  className="text-white transition-colors hover:text-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  Roadmap
                </Link>
                <Link
                  href="/about"
                  className="text-white transition-colors hover:text-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/installation-guide"
                  className="text-white transition-colors hover:text-amber-400"
                  onClick={() => setIsOpen(false)}
                >
                  Installation
                </Link>

              </nav>
              <div className="flex flex-col gap-4">
                <DownloadButton variant="default" />
                <ClientConnectWallet />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
