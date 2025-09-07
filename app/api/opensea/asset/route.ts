import { NextRequest, NextResponse } from 'next/server'
import { fetchOpenSeaAsset, getMockFaberlandEstates, FABERLAND_ESTATES_CONFIG } from '@/lib/opensea'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contractAddress = searchParams.get('contract')
    const tokenId = searchParams.get('tokenId')

    if (!contractAddress || !tokenId) {
      return NextResponse.json(
        { success: false, error: 'Contract address and token ID are required' },
        { status: 400 }
      )
    }

    // For now, return mock data since the collection doesn't exist on OpenSea yet
    // When the collection is deployed, uncomment the line below and remove the mock data
    // const asset = await fetchOpenSeaAsset(contractAddress, tokenId)
    
    const mockEstates = getMockFaberlandEstates()
    const estateNumber = parseInt(tokenId)
    const mockEstate = mockEstates.find(e => e.tokenId === tokenId)

    if (!mockEstate) {
      return NextResponse.json(
        { success: false, error: 'Asset not found' },
        { status: 404 }
      )
    }

    const mockAsset = {
      id: estateNumber,
      token_id: tokenId,
      name: mockEstate.name,
      description: mockEstate.description,
      image_url: mockEstate.image,
      image_preview_url: mockEstate.image,
      image_thumbnail_url: mockEstate.image,
      image_original_url: mockEstate.image,
      asset_contract: {
        address: contractAddress,
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
      permalink: mockEstate.opensea,
      traits: [
        { trait_type: "Color", value: mockEstate.color, trait_count: 1 },
        { trait_type: "Location", value: mockEstate.location, trait_count: 1 },
        { trait_type: "Size", value: mockEstate.size, trait_count: 1 },
        { trait_type: "District", value: mockEstate.location.split(' ')[0], trait_count: 1 }
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
    }

    return NextResponse.json({
      success: true,
      asset: mockAsset,
      isMock: true // Flag to indicate this is mock data
    })
  } catch (error) {
    console.error('Error fetching OpenSea asset:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch asset data' },
      { status: 500 }
    )
  }
}
