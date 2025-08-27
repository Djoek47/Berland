import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { plotId, userAddress, userEmail, rentalTerm } = await request.json()

    console.log('Process rental: Received request:', { plotId, userAddress, userEmail, rentalTerm })

    if (!plotId || !userAddress || !userEmail || !rentalTerm) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if plot is already sold
    const isSold = await PlotDatabase.isPlotSold(plotId)
    if (isSold) {
      return NextResponse.json({ error: 'Plot is already sold' }, { status: 400 })
    }

    // Mark plot as sold (this already handles persistence)
    await PlotDatabase.markPlotAsSold(plotId, userAddress, userEmail, rentalTerm)
    console.log('Process rental: Plot marked as sold successfully')

    return NextResponse.json({ 
      success: true, 
      message: 'Plot rented successfully',
      plotId,
      userAddress,
      rentalTerm
    })

  } catch (error) {
    console.error('Process rental: Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
