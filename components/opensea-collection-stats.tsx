"use client"

import { useOpenSeaCollection } from '@/hooks/use-opensea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, TrendingUp, Users, DollarSign, Package } from 'lucide-react'
import { FABERLAND_ESTATES_CONFIG } from '@/lib/opensea'

export default function OpenSeaCollectionStats() {
  const { collection, isLoading, error, refetch } = useOpenSeaCollection()

  if (isLoading) {
    return (
      <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-400">Faberland Estates Collection</CardTitle>
          <CardDescription>Loading collection statistics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-red-500/30 bg-red-900/10 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-red-400">Error Loading Collection</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <button 
            onClick={refetch}
            className="text-amber-400 hover:text-amber-300 underline"
          >
            Try Again
          </button>
        </CardContent>
      </Card>
    )
  }

  if (!collection) {
    return null
  }

  return (
    <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              {collection.name}
              {collection.isMock && (
                <Badge variant="outline" className="text-xs">
                  Demo Data
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-zinc-300">
              {collection.description}
            </CardDescription>
          </div>
          <a
            href={FABERLAND_ESTATES_CONFIG.openseaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">View on OpenSea</span>
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-5 w-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {collection.stats.total_supply.toLocaleString()}
            </div>
            <div className="text-sm text-zinc-400">Total Supply</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {collection.stats.num_owners.toLocaleString()}
            </div>
            <div className="text-sm text-zinc-400">Owners</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {collection.stats.floor_price > 0 ? `${collection.stats.floor_price.toFixed(2)} ETH` : 'TBD'}
            </div>
            <div className="text-sm text-zinc-400">Floor Price</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {collection.stats.total_volume > 0 ? `${collection.stats.total_volume.toFixed(2)} ETH` : '0 ETH'}
            </div>
            <div className="text-sm text-zinc-400">Total Volume</div>
          </div>
        </div>
        
        {collection.isMock && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-300">
              <strong>Demo Mode:</strong> This shows mock data. Real collection statistics will appear when the Faberland Estates NFT collection is deployed on OpenSea.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
