import { NextRequest, NextResponse } from 'next/server'
import { fetchOpenSeaAssets, getMockFaberlandEstates, FABERLAND_ESTATES_CONFIG } from '@/lib/opensea'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collectionSlug = searchParams.get('collection') || FABERLAND_ESTATES_CONFIG.collectionSlug
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // For now, return mock data since the collection doesn't exist on OpenSea yet
    // When the collection is deployed, uncomment the lines below and remove the mock data
    // const assets = await fetchOpenSeaAssets(collectionSlug, limit, offset)
    
    const mockAssets = getMockFaberlandEstates()
      .slice(offset, offset + limit)
      .map(estate => ({
        id: parseInt(estate.tokenId),
        token_id: estate.tokenId,
        name: estate.name,
        description: estate.description,
        image_url: estate.image,
        image_preview_url: estate.image,
        image_thumbnail_url: estate.image,
        image_original_url: estate.image,
        asset_contract: {
          address: FABERLAND_ESTATES_CONFIG.contractAddress,
          name: FABERLAND_ESTATES_CONFIG.name,
          symbol: "FABER",
          description: FABERLAND_ESTATES_CONFIG.description,
          image_url: "/images/faberge-eggs/crystal-amber.jpeg",
          external_link: "https://faberland.com",
          created_date: new Date().toISOString(),
          owner: 0,
          schema_name: "ERC721",
          total_supply: FABERLAND_ESTATES_CONFIG.totalSupply.toString(),
          nft_version: "3.0",
          permalink: `https://opensea.io/collection/${FABERLAND_ESTATES_CONFIG.collectionSlug}`
        },
        collection: {
          name: FABERLAND_ESTATES_CONFIG.name,
          description: FABERLAND_ESTATES_CONFIG.description,
          image_url: "/images/faberge-eggs/crystal-amber.jpeg",
          external_url: "https://faberland.com",
          created_date: new Date().toISOString(),
          slug: FABERLAND_ESTATES_CONFIG.collectionSlug,
          stats: {
            total_supply: FABERLAND_ESTATES_CONFIG.totalSupply,
            count: FABERLAND_ESTATES_CONFIG.totalSupply,
            num_owners: 0,
            floor_price: 0,
            total_volume: 0,
            total_sales: 0
          }
        },
        permalink: estate.opensea,
        traits: [
          { trait_type: "Color", value: estate.color, trait_count: 1 },
          { trait_type: "Location", value: estate.location, trait_count: 1 },
          { trait_type: "Size", value: estate.size, trait_count: 1 },
          { trait_type: "District", value: estate.location.split(' ')[0], trait_count: 1 }
        ],
        num_sales: 0,
        background_color: null,
        is_nsfw: false,
        supports_wyvern: true,
        related_assets: [],
        orders: [],
        auctions: [],
        last_sale: null,
        top_bid: null,
        listing_date: null,
        is_presale: false,
        transfer_fee_payment_token: null,
        transfer_fee: null
      }))

    return NextResponse.json({
      success: true,
      assets: mockAssets,
      total: FABERLAND_ESTATES_CONFIG.totalSupply,
      isMock: true // Flag to indicate this is mock data
    })
  } catch (error) {
    console.error('Error fetching OpenSea assets:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assets data' },
      { status: 500 }
    )
  }
}
