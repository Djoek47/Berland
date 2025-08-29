import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { plotId, userAddress, userEmail, rentalTerm } = await request.json()

    console.log('Test renewal process: Starting test for plot:', plotId)

    // Step 1: Check initial state
    const initialSoldPlots = await PlotDatabase.getSoldPlots()
    const initialPlot = initialSoldPlots.find(p => p.id === plotId)
    console.log('Test renewal process: Initial plot state:', initialPlot)

    if (!initialPlot) {
      return NextResponse.json({ 
        error: 'Plot not found for renewal test',
        plotId,
        availablePlots: initialSoldPlots.map(p => ({ id: p.id, soldTo: p.soldTo }))
      }, { status: 400 })
    }

    // Step 2: Test renewal
    console.log('Test renewal process: Extending rental for term:', rentalTerm)
    await PlotDatabase.extendPlotRental(plotId, rentalTerm)

    // Step 3: Verify renewal
    const updatedSoldPlots = await PlotDatabase.getSoldPlots()
    const updatedPlot = updatedSoldPlots.find(p => p.id === plotId)
    console.log('Test renewal process: Updated plot state:', updatedPlot)

    // Step 4: Calculate expected end date
    const originalEndDate = new Date(initialPlot.rentalEndDate || Date.now())
    let expectedExtensionDays = 30
    switch (rentalTerm) {
      case 'monthly': expectedExtensionDays = 30; break
      case 'quarterly': expectedExtensionDays = 90; break
      case 'yearly': expectedExtensionDays = 365; break
    }
    const expectedEndDate = new Date(originalEndDate.getTime() + expectedExtensionDays * 24 * 60 * 60 * 1000)
    const actualEndDate = new Date(updatedPlot?.rentalEndDate || Date.now())

    const timeDifference = Math.abs(actualEndDate.getTime() - expectedEndDate.getTime())
    const isCorrect = timeDifference < 60000 // Within 1 minute

    console.log('Test renewal process: Results:', {
      originalEndDate: originalEndDate.toISOString(),
      expectedEndDate: expectedEndDate.toISOString(),
      actualEndDate: actualEndDate.toISOString(),
      timeDifference: timeDifference / 1000 / 60, // minutes
      isCorrect,
      rentalTerm: updatedPlot?.rentalTerm
    })

    return NextResponse.json({
      success: true,
      testResults: {
        plotId,
        originalEndDate: originalEndDate.toISOString(),
        expectedEndDate: expectedEndDate.toISOString(),
        actualEndDate: actualEndDate.toISOString(),
        timeDifferenceMinutes: timeDifference / 1000 / 60,
        isCorrect,
        rentalTerm: updatedPlot?.rentalTerm,
        rentalTermUpdated: updatedPlot?.rentalTerm === rentalTerm
      },
      message: isCorrect ? 'Renewal test passed!' : 'Renewal test failed - end date mismatch'
    })

  } catch (error) {
    console.error('Test renewal process: Error:', error)
    return NextResponse.json({ error: 'Test failed' }, { status: 500 })
  }
}
