import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    console.log('User plots: Getting plots for address:', address)

    // Get user's plots from database
    const userPlots = PlotDatabase.getUserPlotsSync(address)
    
    console.log('User plots: Found plots:', userPlots.length)

    return NextResponse.json(userPlots)
  } catch (error) {
    console.error('User plots: Error getting user plots:', error)
    return NextResponse.json(
      { error: 'Failed to get user plots' },
      { status: 500 }
    )
  }
}
