import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plotId, userAddress, userEmail, rentalTerm } = body

    console.log('Test: Marking plot as sold:', { plotId, userAddress, userEmail, rentalTerm })

    // Mark the plot as sold
    PlotDatabase.markPlotAsSold(
      parseInt(plotId), 
      userAddress || 'test-wallet', 
      userEmail || 'test@email.com',
      rentalTerm || 'monthly'
    )

    // Verify it was marked
    const isSold = PlotDatabase.isPlotSoldSync(parseInt(plotId))
    const soldPlots = PlotDatabase.getSoldPlotsSync()

    console.log('Test: Plot marked as sold:', isSold)
    console.log('Test: Total sold plots:', soldPlots.length)

    // Persist to file
    try {
      const persistResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/persist-database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (persistResponse.ok) {
        console.log('Test: Database persisted successfully')
      } else {
        console.error('Test: Failed to persist database')
      }
    } catch (error) {
      console.error('Test: Error persisting database:', error)
    }

    return NextResponse.json({ 
      success: true, 
      plotId,
      isSold,
      totalSold: soldPlots.length,
      soldPlots: soldPlots.map(p => ({ id: p.id, soldTo: p.soldTo }))
    })
  } catch (error) {
    console.error('Test: Error marking plot as sold:', error)
    return NextResponse.json(
      { error: 'Failed to mark plot as sold' },
      { status: 500 }
    )
  }
}
