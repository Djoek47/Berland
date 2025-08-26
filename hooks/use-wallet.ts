"use client"

import { useState, useEffect } from 'react'
import { useAddress } from '@thirdweb-dev/react'

export interface WalletState {
  isConnected: boolean
  address: string | undefined
  isLoading: boolean
}

export function useWallet() {
  const address = useAddress()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsConnected(!!address)
    setIsLoading(false)
  }, [address])

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        return accounts[0]
      } else {
        throw new Error("Please install MetaMask to use this feature")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnectWallet = () => {
    // This will be handled by the thirdweb provider
    setIsConnected(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return {
    isConnected,
    address,
    isLoading,
    connectWallet,
    disconnectWallet,
    formatAddress
  }
}
