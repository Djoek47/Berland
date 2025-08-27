import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
    }

    // Get user plots using async method
    const userPlots = await PlotDatabase.getUserPlots(address)
    
    return NextResponse.json(userPlots)
  } catch (error) {
    console.error('User plots: Error:', error)
    return NextResponse.json({ error: 'Failed to get user plots' }, { status: 500 })
  }
}
