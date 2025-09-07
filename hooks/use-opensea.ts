"use client"

import { useState, useEffect } from 'react'
import { FABERLAND_ESTATES_CONFIG } from '@/lib/opensea'

export interface OpenSeaCollectionData {
  name: string
  description: string
  image_url: string
  stats: {
    total_supply: number
    count: number
    num_owners: number
    floor_price: number
    total_volume: number
    total_sales: number
  }
  isMock: boolean
}

export interface OpenSeaAssetData {
  id: number
  token_id: string
  name: string
  description: string
  image_url: string
  permalink: string
  traits: Array<{
    trait_type: string
    value: string | number
    trait_count: number
  }>
  last_sale?: {
    total_price: string
    payment_token: {
      symbol: string
      usd_price: string
    }
  }
  isMock: boolean
}

export function useOpenSeaCollection() {
  const [collection, setCollection] = useState<OpenSeaCollectionData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCollection = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/opensea/collection?slug=${FABERLAND_ESTATES_CONFIG.collectionSlug}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch collection: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setCollection({
          name: data.collection.name,
          description: data.collection.description,
          image_url: data.collection.image_url,
          stats: data.collection.stats,
          isMock: data.isMock
        })
      } else {
        throw new Error(data.error || 'Failed to fetch collection data')
      }
    } catch (err) {
      console.error('Error fetching OpenSea collection:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCollection()
  }, [])

  return {
    collection,
    isLoading,
    error,
    refetch: fetchCollection
  }
}

export function useOpenSeaAssets(limit: number = 25, offset: number = 0) {
  const [assets, setAssets] = useState<OpenSeaAssetData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchAssets = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/opensea/assets?collection=${FABERLAND_ESTATES_CONFIG.collectionSlug}&limit=${limit}&offset=${offset}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setAssets(data.assets.map((asset: any) => ({
          id: asset.id,
          token_id: asset.token_id,
          name: asset.name,
          description: asset.description,
          image_url: asset.image_url,
          permalink: asset.permalink,
          traits: asset.traits,
          last_sale: asset.last_sale,
          isMock: data.isMock
        })))
        setTotal(data.total)
      } else {
        throw new Error(data.error || 'Failed to fetch assets data')
      }
    } catch (err) {
      console.error('Error fetching OpenSea assets:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAssets()
  }, [limit, offset])

  return {
    assets,
    total,
    isLoading,
    error,
    refetch: fetchAssets
  }
}

export function useOpenSeaAsset(contractAddress: string, tokenId: string) {
  const [asset, setAsset] = useState<OpenSeaAssetData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAsset = async () => {
    if (!contractAddress || !tokenId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/opensea/asset?contract=${contractAddress}&tokenId=${tokenId}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch asset: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setAsset({
          id: data.asset.id,
          token_id: data.asset.token_id,
          name: data.asset.name,
          description: data.asset.description,
          image_url: data.asset.image_url,
          permalink: data.asset.permalink,
          traits: data.asset.traits,
          last_sale: data.asset.last_sale,
          isMock: data.isMock
        })
      } else {
        throw new Error(data.error || 'Failed to fetch asset data')
      }
    } catch (err) {
      console.error('Error fetching OpenSea asset:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAsset()
  }, [contractAddress, tokenId])

  return {
    asset,
    isLoading,
    error,
    refetch: fetchAsset
  }
}
