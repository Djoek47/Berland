"use client"

import { useState, useEffect } from 'react'
import { useAddress } from '@thirdweb-dev/react'

export interface NFT {
  id: string
  name: string
  type: string
  description: string
  image: string
  location: string
  size: string
  visitors: number
  features: string[]
  opensea: string
  rentalStatus: string
  tokenId: string
  contractAddress: string
  metadata: any
}

export function useNFTs() {
  const address = useAddress()
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Popular NFT contract addresses to check
  const popularContracts = [
    // Ethereum Mainnet - Major Collections
    { address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", name: "BAYC", chain: "ethereum" },
    { address: "0x60E4d786628Fea6478F785A6d7c70480cD1a2C5A", name: "MAYC", chain: "ethereum" },
    { address: "0xED5AF3886537Af0D388038E4fb8aF7f5Be8C97d6", name: "Azuki", chain: "ethereum" },
    { address: "0x8a90CAb2b38dba80c64b7734e58fE1dBcDBAc36C", name: "Doodles", chain: "ethereum" },
    { address: "0x594685d16f0b2e2aa402a38bd7d8a75e76a6d46e", name: "Moonbirds", chain: "ethereum" },
    { address: "0x7Bd29408f11D2bFC23c34f18275bBf23bB69B5a2", name: "Meebits", chain: "ethereum" },
    { address: "0x1a92f7381b9f03921564a437210bb9396471050c", name: "Cool Cats", chain: "ethereum" },
    { address: "0x2A0f1cB176A61eD5D5EDF4F54d3fbA7BfD02D027", name: "World of Women", chain: "ethereum" },
    { address: "0x3B3ee1931Dc30C1957379FAc9aba94d1C48a5405", name: "Foundation", chain: "ethereum" },
    { address: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85", name: "ENS", chain: "ethereum" },
    { address: "0x9c8fF314C9Bc7F6e59A9d9225Fb229F3D6128E14", name: "Nouns", chain: "ethereum" },
    { address: "0x5Af0D9827E0c53E4799BB226655A1De152A425a5", name: "Milady", chain: "ethereum" },
    { address: "0x4E1f41613c4824F822992DEaC4B7f04917B2734a", name: "Pudgypenguins", chain: "ethereum" },
    
    // Polygon
    { address: "0x2953399124F0cBB46d2CbACD8A89cF0599974963", name: "OpenSea", chain: "polygon" },
    
    // Base
    { address: "0x4200000000000000000000000000000000000006", name: "WETH", chain: "base" },
    { address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", name: "USDC", chain: "base" },
    
    // BSC
    { address: "0xbb4CdB9CBd36B01bD1cBaEF2aB8c6E4F8C6B6b6b", name: "WBNB", chain: "bsc" },
    { address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", name: "USDC", chain: "bsc" },
    { address: "0x55d398326f99059fF775485246999027B3197955", name: "USDT", chain: "bsc" },
    { address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", name: "BUSD", chain: "bsc" },
    { address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", name: "CAKE", chain: "bsc" },
    { address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", name: "BTCB", chain: "bsc" },
    { address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", name: "ETH", chain: "bsc" },
  ]

  const fetchNFTsFromContract = async (contract: { address: string, name: string, chain: string }): Promise<NFT[]> => {
    try {
      // Use Thirdweb's API to fetch NFTs from specific contract
      const response = await fetch(`https://api.thirdweb.com/v1/contracts/${contract.address}/nfts?wallet=${address}&chain=${contract.chain}`)
      if (!response.ok) return []
      
      const data = await response.json()
      return data.data?.map((nft: any) => ({
        id: `${contract.address}-${nft.tokenId}`,
        name: nft.metadata?.name || `${contract.name} #${nft.tokenId}`,
        type: 'nft',
        description: nft.metadata?.description || `NFT from ${contract.name} collection`,
        image: nft.metadata?.image || '/images/placeholder.jpg',
        location: `${contract.name} Collection`,
        size: '1 NFT',
        visitors: 0,
        features: [],
        opensea: `https://opensea.io/assets/${contract.address}/${nft.tokenId}`,
        rentalStatus: 'owned',
        tokenId: nft.tokenId,
        contractAddress: contract.address,
        metadata: nft.metadata
      })) || []
    } catch (error) {
      console.error(`Error fetching NFTs from ${contract.name} (${contract.address}):`, error)
      return []
    }
  }

  const fetchAllNFTs = async () => {
    if (!address) {
      setNfts([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check popular contracts for owned NFTs
      const contractPromises = popularContracts.map(contract => fetchNFTsFromContract(contract))
      const contractResults = await Promise.all(contractPromises)
      
      // Combine all results
      const allNFTs = contractResults.flat()

      // Remove duplicates based on contract address + token ID
      const uniqueNFTs = allNFTs.filter((nft, index, self) => 
        index === self.findIndex(n => n.contractAddress === nft.contractAddress && n.tokenId === nft.tokenId)
      )

      setNfts(uniqueNFTs)
      console.log(`Found ${uniqueNFTs.length} NFTs for wallet ${address}`)
      
      if (uniqueNFTs.length === 0) {
        console.log('No NFTs found. This could mean:')
        console.log('1. The wallet has no NFTs from popular collections')
        console.log('2. The NFTs are on chains not yet supported')
        console.log('3. The wallet is new or empty')
      }
    } catch (err) {
      console.error('Error fetching NFTs:', err)
      setError('Failed to fetch NFTs')
      setNfts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (address) {
      fetchAllNFTs()
    } else {
      setNfts([])
    }
  }, [address])

  const refreshNFTs = () => {
    if (address) {
      fetchAllNFTs()
    }
  }

  return {
    nfts,
    isLoading,
    error,
    refreshNFTs
  }
}
