import { NextRequest, NextResponse } from 'next/server'
import { fetchOpenSeaCollection, FABERLAND_ESTATES_CONFIG } from '@/lib/opensea'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug') || FABERLAND_ESTATES_CONFIG.collectionSlug

    // For now, return mock data since the collection doesn't exist on OpenSea yet
    // When the collection is deployed, uncomment the line below and remove the mock data
    // const collection = await fetchOpenSeaCollection(slug)
    
    const mockCollection = {
      name: FABERLAND_ESTATES_CONFIG.name,
      description: FABERLAND_ESTATES_CONFIG.description,
      image_url: "/images/faberge-eggs/crystal-amber.jpeg",
      external_url: "https://faberland.com",
      created_date: new Date().toISOString(),
      slug: FABERLAND_ESTATES_CONFIG.collectionSlug,
      stats: {
        one_day_volume: 0,
        one_day_change: 0,
        one_day_sales: 0,
        one_day_average_price: 0,
        seven_day_volume: 0,
        seven_day_change: 0,
        seven_day_sales: 0,
        seven_day_average_price: 0,
        thirty_day_volume: 0,
        thirty_day_change: 0,
        thirty_day_sales: 0,
        thirty_day_average_price: 0,
        total_volume: 0,
        total_sales: 0,
        total_supply: FABERLAND_ESTATES_CONFIG.totalSupply,
        count: FABERLAND_ESTATES_CONFIG.totalSupply,
        num_owners: 0,
        average_price: 0,
        num_reports: 0,
        market_cap: 0,
        floor_price: 0
      },
      banner_image_url: "/images/faberge-eggs/crystal-amber.jpeg",
      featured: false,
      hidden: false,
      safelist_request_status: "not_requested",
      is_subject_to_whitelist: false,
      only_proxied_transfers: false,
      opensea_buyer_fee_basis_points: 250,
      opensea_seller_fee_basis_points: 250,
      require_email: false,
      short_description: "25 exclusive virtual estates in the Faberland metaverse",
      twitter_username: "faberland",
      instagram_username: "faberland",
      wiki_url: "https://faberland.com/wiki"
    }

    return NextResponse.json({
      success: true,
      collection: mockCollection,
      isMock: true // Flag to indicate this is mock data
    })
  } catch (error) {
    console.error('Error fetching OpenSea collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collection data' },
      { status: 500 }
    )
  }
}
