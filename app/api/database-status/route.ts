import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const soldPlots = PlotDatabase.getSoldPlots()
    
    return NextResponse.json({ 
      success: true, 
      soldPlots,
      totalSold: soldPlots.length,
      availablePlots: 47 - soldPlots.length
    })
  } catch (error) {
    console.error('Error getting database status:', error)
    return NextResponse.json(
      { error: 'Failed to get database status' },
      { status: 500 }
    )
  }
}
