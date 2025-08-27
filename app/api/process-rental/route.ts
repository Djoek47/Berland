import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plotId, userAddress, userEmail, rentalTerm } = body

    console.log('Process rental: Processing rental for plot:', { plotId, userAddress, userEmail, rentalTerm })

    // Mark the plot as sold with the specified rental term
    PlotDatabase.markPlotAsSold(
      parseInt(plotId), 
      userAddress, 
      userEmail,
      rentalTerm as 'monthly' | 'quarterly' | 'yearly'
    )

    // Verify it was marked
    const isSold = PlotDatabase.isPlotSoldSync(parseInt(plotId))
    const soldPlots = PlotDatabase.getSoldPlotsSync()

    console.log('Process rental: Plot marked as sold:', isSold)
    console.log('Process rental: Total sold plots:', soldPlots.length)

    // Persist to file
    try {
      const persistResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/persist-database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (persistResponse.ok) {
        console.log('Process rental: Database persisted successfully')
      } else {
        console.error('Process rental: Failed to persist database')
      }
    } catch (error) {
      console.error('Process rental: Error persisting database:', error)
    }

    return NextResponse.json({ 
      success: true, 
      plotId,
      isSold,
      rentalTerm,
      totalSold: soldPlots.length,
      soldPlots: soldPlots.map(p => ({ id: p.id, soldTo: p.soldTo, rentalTerm: p.rentalTerm }))
    })
  } catch (error) {
    console.error('Process rental: Error processing rental:', error)
    return NextResponse.json(
      { error: 'Failed to process rental' },
      { status: 500 }
    )
  }
}
