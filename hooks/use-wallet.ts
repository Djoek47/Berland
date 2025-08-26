"use client"

import { useState, useEffect } from 'react'
import { useAddress, useConnectionStatus } from '@thirdweb-dev/react'

export interface WalletState {
  isConnected: boolean
  address: string | undefined
  isLoading: boolean
}

export function useWallet() {
  const address = useAddress()
  const connectionStatus = useConnectionStatus()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('Wallet hook - Address:', address)
    console.log('Wallet hook - Connection status:', connectionStatus)
    
    // Update connection state based on both address and connection status
    const connected = !!(address && connectionStatus === 'connected')
    setIsConnected(connected)
    
    // Set loading to false once we have a definitive state
    if (connectionStatus !== 'unknown') {
      setIsLoading(false)
    }
    
    console.log('Wallet hook - Final state:', { connected, address, connectionStatus })
  }, [address, connectionStatus])

  // Additional effect to handle wallet reconnection after redirects
  useEffect(() => {
    const handleWalletReconnection = async () => {
      // If we have an address but connection status is disconnected, try to reconnect
      if (address && connectionStatus === 'disconnected') {
        console.log('Attempting to reconnect wallet after redirect...')
        try {
          // Force a reconnection by requesting accounts again
          if (typeof window.ethereum !== "undefined") {
            await window.ethereum.request({ method: "eth_requestAccounts" })
          }
        } catch (error) {
          console.error('Failed to reconnect wallet:', error)
        }
      }
    }

    // Small delay to allow the page to fully load after redirect
    const timer = setTimeout(handleWalletReconnection, 1000)
    return () => clearTimeout(timer)
  }, [address, connectionStatus])

  const connectWallet = async () => {
    try {
      console.log('Attempting to connect wallet...')
      
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        console.log('Wallet connected successfully:', accounts[0])
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
    console.log('Disconnecting wallet...')
    setIsConnected(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return {
    isConnected,
    address,
    isLoading,
    connectionStatus,
    connectWallet,
    disconnectWallet,
    formatAddress
  }
}
