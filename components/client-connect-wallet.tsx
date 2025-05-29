"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export default function ClientConnectWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAddress(accounts[0])
        setIsConnected(true)
      } else {
        alert("Please install MetaMask to use this feature")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setAddress("")
    setIsConnected(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-300">{formatAddress(address)}</span>
          <Button variant="outline" size="sm" onClick={disconnectWallet} className="border-amber-500 text-amber-400 hover:bg-amber-950/20">
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet} className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </div>
  )
} 