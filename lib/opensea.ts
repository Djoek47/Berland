// OpenSea API integration for Faberland Estates NFT collection

export interface OpenSeaAsset {
  id: number
  token_id: string
  name: string
  description: string
  image_url: string
  image_preview_url: string
  image_thumbnail_url: string
  image_original_url: string
  animation_url?: string
  animation_original_url?: string
  external_link?: string
  asset_contract: {
    address: string
    name: string
    symbol: string
    description: string
    image_url: string
    external_link: string
    created_date: string
    owner: number
    schema_name: string
    total_supply: string
    nft_version: string
    opensea_version?: string
    payout_address?: string
    seller_fee_basis_points?: number
    buyer_fee_basis_points?: number
    dev_buyer_fee_basis_points?: number
    dev_seller_fee_basis_points?: number
    permalink: string
  }
  collection: {
    name: string
    description: string
    image_url: string
    external_url: string
    created_date: string
    slug: string
    payout_address?: string
    primary_asset_contracts: any[]
    traits: any
    stats: {
      one_day_volume: number
      one_day_change: number
      one_day_sales: number
      one_day_average_price: number
      seven_day_volume: number
      seven_day_change: number
      seven_day_sales: number
      seven_day_average_price: number
      thirty_day_volume: number
      thirty_day_change: number
      thirty_day_sales: number
      thirty_day_average_price: number
      total_volume: number
      total_sales: number
      total_supply: number
      count: number
      num_owners: number
      average_price: number
      num_reports: number
      market_cap: number
      floor_price: number
    }
    banner_image_url?: string
    chat_url?: string
    default_to_fiat: boolean
    dev_buyer_fee_basis_points: number
    dev_seller_fee_basis_points: number
    discord_url?: string
    display_data: any
    featured: boolean
    featured_image_url?: string
    hidden: boolean
    safelist_request_status: string
    is_subject_to_whitelist: boolean
    large_image_url?: string
    medium_username?: string
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: number
    opensea_seller_fee_basis_points: number
    require_email: boolean
    short_description?: string
    telegram_url?: string
    twitter_username?: string
    instagram_username?: string
    wiki_url?: string
  }
  permalink: string
  sell_orders?: any[]
  seaport_sell_orders?: any[]
  last_sale?: {
    asset: {
      token_id: string
      decimals: number
    }
    asset_bundle?: any
    event_type: string
    event_timestamp: string
    auction_type?: string
    total_price: string
    payment_token: {
      id: number
      symbol: string
      address: string
      image_url: string
      name: string
      decimals: number
      eth_price: string
      usd_price: string
    }
    transaction: {
      block_hash: string
      block_number: string
      from_account: {
        user: number
        profile_img_url: string
        address: string
        config: string
      }
      id: number
      timestamp: string
      to_account?: {
        user: number
        profile_img_url: string
        address: string
        config: string
      }
      transaction_hash: string
      transaction_index: string
    }
    created_date: string
    quantity: string
  }
  top_bid?: any
  listing_date?: string
  is_presale: boolean
  transfer_fee_payment_token?: any
  transfer_fee?: any
  related_assets: any[]
  orders?: any[]
  auctions?: any[]
  supports_wyvern: boolean
  traits: Array<{
    trait_type: string
    value: string | number
    display_type?: string
    max_value?: number
    trait_count: number
    order?: any
  }>
  num_sales: number
  background_color?: string
  decimals?: number
  token_metadata?: string
  is_nsfw: boolean
  owner?: {
    user: {
      username: string
    }
    profile_img_url: string
    address: string
    config: string
  }
  creator?: {
    user: {
      username: string
    }
    profile_img_url: string
    address: string
    config: string
  }
}

export interface OpenSeaCollection {
  name: string
  description: string
  image_url: string
  external_url: string
  created_date: string
  slug: string
  payout_address?: string
  primary_asset_contracts: any[]
  traits: any
  stats: {
    one_day_volume: number
    one_day_change: number
    one_day_sales: number
    one_day_average_price: number
    seven_day_volume: number
    seven_day_change: number
    seven_day_sales: number
    seven_day_average_price: number
    thirty_day_volume: number
    thirty_day_change: number
    thirty_day_sales: number
    thirty_day_average_price: number
    total_volume: number
    total_sales: number
    total_supply: number
    count: number
    num_owners: number
    average_price: number
    num_reports: number
    market_cap: number
    floor_price: number
  }
  banner_image_url?: string
  chat_url?: string
  default_to_fiat: boolean
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  discord_url?: string
  display_data: any
  featured: boolean
  featured_image_url?: string
  hidden: boolean
  safelist_request_status: string
  is_subject_to_whitelist: boolean
  large_image_url?: string
  medium_username?: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
  require_email: boolean
  short_description?: string
  telegram_url?: string
  twitter_username?: string
  instagram_username?: string
  wiki_url?: string
}

// Faberland Estates NFT Collection Configuration
export const FABERLAND_ESTATES_CONFIG = {
  contractAddress: "0x...", // To be filled when contract is deployed
  collectionSlug: "faberland-estates", // To be filled when collection is created
  name: "Faberland Estates",
  description: "25 exclusive virtual estates in the Faberland metaverse. Each estate is a unique NFT with premium locations and features.",
  totalSupply: 25,
  chain: "ethereum", // or "polygon", "base", etc.
  openseaUrl: "https://opensea.io/collection/faberland-estates"
}

// OpenSea API Configuration
const OPENSEA_API_BASE = "https://api.opensea.io/api/v2"
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY

// Fetch collection data from OpenSea
export async function fetchOpenSeaCollection(slug: string): Promise<OpenSeaCollection | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    }
    
    if (OPENSEA_API_KEY) {
      headers['X-API-KEY'] = OPENSEA_API_KEY
    }

    const response = await fetch(`${OPENSEA_API_BASE}/collections/${slug}`, {
      headers,
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error(`OpenSea API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching OpenSea collection:', error)
    return null
  }
}

// Fetch assets from a collection
export async function fetchOpenSeaAssets(
  collectionSlug: string,
  limit: number = 50,
  offset: number = 0
): Promise<OpenSeaAsset[]> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    }
    
    if (OPENSEA_API_KEY) {
      headers['X-API-KEY'] = OPENSEA_API_KEY
    }

    const params = new URLSearchParams({
      collection: collectionSlug,
      limit: limit.toString(),
      offset: offset.toString(),
      order_by: 'token_id',
      order_direction: 'asc'
    })

    const response = await fetch(`${OPENSEA_API_BASE}/collection/${collectionSlug}/nfts?${params}`, {
      headers,
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error(`OpenSea API error: ${response.status} ${response.statusText}`)
      return []
    }

    const data = await response.json()
    return data.nfts || []
  } catch (error) {
    console.error('Error fetching OpenSea assets:', error)
    return []
  }
}

// Fetch a specific asset by contract address and token ID
export async function fetchOpenSeaAsset(
  contractAddress: string,
  tokenId: string
): Promise<OpenSeaAsset | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    }
    
    if (OPENSEA_API_KEY) {
      headers['X-API-KEY'] = OPENSEA_API_KEY
    }

    const response = await fetch(`${OPENSEA_API_BASE}/chain/ethereum/contract/${contractAddress}/nfts/${tokenId}`, {
      headers,
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error(`OpenSea API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data.nft
  } catch (error) {
    console.error('Error fetching OpenSea asset:', error)
    return null
  }
}

// Convert OpenSea asset to our LandPlot format
export function convertOpenSeaAssetToLandPlot(asset: OpenSeaAsset): any {
  return {
    id: `estate-${asset.token_id}`,
    name: asset.name || `Faberland Estate #${asset.token_id}`,
    type: "faberland",
    description: asset.description || `Exclusive Faberland Estate #${asset.token_id}`,
    price: asset.last_sale?.total_price ? parseFloat(asset.last_sale.total_price) : 0,
    image: asset.image_url || asset.image_preview_url || asset.image_thumbnail_url,
    color: extractColorFromTraits(asset.traits),
    available: true,
    opensea: asset.permalink,
    location: extractLocationFromTraits(asset.traits),
    size: extractSizeFromTraits(asset.traits),
    visitors: Math.floor(Math.random() * 5000) + 2000, // Mock data for now
    features: extractFeaturesFromTraits(asset.traits),
    tokenId: asset.token_id,
    contractAddress: asset.asset_contract.address,
    lastSale: asset.last_sale,
    traits: asset.traits
  }
}

// Helper functions to extract data from traits
function extractColorFromTraits(traits: any[]): string {
  const colorTrait = traits.find(t => t.trait_type?.toLowerCase().includes('color'))
  return colorTrait?.value?.toString().toLowerCase() || 'crystal'
}

function extractLocationFromTraits(traits: any[]): string {
  const locationTrait = traits.find(t => t.trait_type?.toLowerCase().includes('location') || t.trait_type?.toLowerCase().includes('district'))
  return locationTrait?.value?.toString() || 'Central District'
}

function extractSizeFromTraits(traits: any[]): string {
  const sizeTrait = traits.find(t => t.trait_type?.toLowerCase().includes('size'))
  return sizeTrait?.value?.toString() || 'Large (10,000 sq ft)'
}

function extractFeaturesFromTraits(traits: any[]): string[] {
  const features: string[] = []
  
  // Extract features from traits
  traits.forEach(trait => {
    if (trait.trait_type?.toLowerCase().includes('feature')) {
      features.push(trait.value?.toString() || '')
    }
  })
  
  // Default features if none found
  if (features.length === 0) {
    features.push('Premium Location', 'Exclusive Access', 'NFT Ownership')
  }
  
  return features
}

// Mock data for development (when OpenSea collection doesn't exist yet)
export function getMockFaberlandEstates(): any[] {
  return Array.from({ length: 25 }, (_, i) => ({
    id: `estate-${i + 1}`,
    name: `Faberland Estate #${i + 1}`,
    type: "faberland",
    description: `Exclusive Faberland Estate #${i + 1} - A premium virtual estate in the Faberland metaverse.`,
    price: 2.5 + (i * 0.1),
    image: getEstateImage(i + 1),
    color: getEstateColor(i + 1),
    available: true,
    opensea: `https://opensea.io/assets/ethereum/${FABERLAND_ESTATES_CONFIG.contractAddress}/${i + 1}`,
    location: getEstateLocation(i + 1),
    size: getEstateSize(i + 1),
    visitors: 2000 + (i * 200),
    features: getEstateFeatures(i + 1),
    tokenId: (i + 1).toString(),
    contractAddress: FABERLAND_ESTATES_CONFIG.contractAddress
  }))
}

function getEstateImage(estateNumber: number): string {
  const images = [
    "/images/faberge-eggs/crystal-amber.jpeg",
    "/images/faberge-eggs/amber-glow.png",
    "/images/faberge-eggs/ruby-red.png",
    "/images/faberge-eggs/emerald-green.png",
    "/images/faberge-eggs/bronze-glow.png",
    "/images/faberge-eggs/rose-quartz.jpeg",
    "/images/faberge-eggs/sapphire-blue.png",
    "/images/faberge-eggs/fire-opal.png"
  ]
  return images[estateNumber % images.length]
}

function getEstateColor(estateNumber: number): string {
  const colors = ['crystal', 'amber', 'ruby', 'emerald', 'bronze', 'rose', 'sapphire', 'fire']
  return colors[estateNumber % colors.length]
}

function getEstateLocation(estateNumber: number): string {
  const locations = [
    'Central District',
    'Entertainment District', 
    'Northern District',
    'Garden District',
    'Coastal District',
    'Business District',
    'Arts District',
    'Wellness District'
  ]
  return locations[estateNumber % locations.length]
}

function getEstateSize(estateNumber: number): string {
  if (estateNumber <= 5) return 'Large (10,000 sq ft)'
  if (estateNumber <= 15) return 'Extra Large (15,000 sq ft)'
  return 'Premium (20,000 sq ft)'
}

function getEstateFeatures(estateNumber: number): string[] {
  const featureSets = [
    ['Water View', 'High Traffic', 'Premium Location'],
    ['Event Space', 'High Traffic', 'Premium Location'],
    ['Mountain View', 'Exclusive Area', 'Premium Location'],
    ['Garden View', 'Water Features', 'Premium Location'],
    ['Ocean View', 'Private Beach', 'Premium Location'],
    ['City View', 'Business Hub', 'Premium Location'],
    ['Art Gallery', 'Creative Space', 'Premium Location'],
    ['Meditation Space', 'Relaxation Zones', 'Wellness Hub']
  ]
  return featureSets[estateNumber % featureSets.length]
}
