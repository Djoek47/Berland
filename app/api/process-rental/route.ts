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

    // Mark plot as sold
    await PlotDatabase.markPlotAsSold(plotId, userAddress, userEmail, rentalTerm)
    console.log('Process rental: Plot marked as sold successfully')

    // Persist to storage
    try {
      // First persist the data
      const persistResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/persist-database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (persistResponse.ok) {
        console.log('Process rental: Database persisted successfully')
        // Then reload to ensure we have the latest data
        await PlotDatabase.reloadFromFile()
      } else {
        console.error('Process rental: Failed to persist database')
      }
    } catch (error) {
      console.error('Process rental: Error persisting database:', error)
    }

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
