import { NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function GET() {
  try {
    // Get sold plots using async method
    const soldPlots = await PlotDatabase.getSoldPlots()
    
    return NextResponse.json({
      success: true,
      soldPlots,
      totalSold: soldPlots.length,
      availablePlots: 47 - soldPlots.length
    })
  } catch (error) {
    console.error('Database status: Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to get database status',
      soldPlots: [],
      totalSold: 0,
      availablePlots: 47
    })
  }
}
