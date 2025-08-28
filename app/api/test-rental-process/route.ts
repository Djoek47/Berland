import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { testPlotId, userAddress, userEmail, rentalTerm } = await request.json()

    console.log('Test rental process: Starting test with:', { testPlotId, userAddress, userEmail, rentalTerm })

    // Step 1: Check initial state
    console.log('Test rental process: Step 1 - Checking initial state')
    const initialSoldPlots = await PlotDatabase.getSoldPlots()
    const isInitiallySold = await PlotDatabase.isPlotSold(testPlotId)
    console.log('Test rental process: Initial sold plots:', initialSoldPlots.length)
    console.log('Test rental process: Test plot initially sold:', isInitiallySold)

    if (isInitiallySold) {
      console.log('Test rental process: Test plot is already sold, skipping test')
      return NextResponse.json({ 
        success: false, 
        message: 'Test plot is already sold, cannot test rental process',
        testPlotId,
        isInitiallySold
      })
    }

    // Step 2: Mark plot as sold
    console.log('Test rental process: Step 2 - Marking plot as sold')
    await PlotDatabase.markPlotAsSold(testPlotId, userAddress, userEmail, rentalTerm)
    
    // Step 3: Verify plot is now sold
    console.log('Test rental process: Step 3 - Verifying plot is sold')
    const isNowSold = await PlotDatabase.isPlotSold(testPlotId)
    const updatedSoldPlots = await PlotDatabase.getSoldPlots()
    const testPlot = updatedSoldPlots.find(p => p.id === testPlotId)
    
    console.log('Test rental process: Plot now sold:', isNowSold)
    console.log('Test rental process: Updated sold plots:', updatedSoldPlots.length)
    console.log('Test rental process: Test plot data:', testPlot)

    if (!isNowSold || !testPlot) {
      console.error('Test rental process: Plot was not properly marked as sold')
      return NextResponse.json({ 
        success: false, 
        message: 'Plot was not properly marked as sold',
        testPlotId,
        isNowSold,
        testPlot
      })
    }

    // Step 4: Verify rental term is correct
    console.log('Test rental process: Step 4 - Verifying rental term')
    if (testPlot.rentalTerm !== rentalTerm) {
      console.error('Test rental process: Rental term mismatch:', { expected: rentalTerm, actual: testPlot.rentalTerm })
      return NextResponse.json({ 
        success: false, 
        message: 'Rental term mismatch',
        testPlotId,
        expectedTerm: rentalTerm,
        actualTerm: testPlot.rentalTerm
      })
    }

    // Step 5: Verify rental end date is correct
    console.log('Test rental process: Step 5 - Verifying rental end date')
    const expectedEndDate = new Date()
    switch (rentalTerm) {
      case 'monthly':
        expectedEndDate.setDate(expectedEndDate.getDate() + 30)
        break
      case 'quarterly':
        expectedEndDate.setDate(expectedEndDate.getDate() + 90)
        break
      case 'yearly':
        expectedEndDate.setDate(expectedEndDate.getDate() + 365)
        break
    }
    
    const actualEndDate = new Date(testPlot.rentalEndDate || '')
    const dateDifference = Math.abs(actualEndDate.getTime() - expectedEndDate.getTime())
    const maxDifference = 24 * 60 * 60 * 1000 // 1 day tolerance
    
    if (dateDifference > maxDifference) {
      console.error('Test rental process: Rental end date mismatch:', { 
        expected: expectedEndDate.toISOString(), 
        actual: testPlot.rentalEndDate 
      })
      return NextResponse.json({ 
        success: false, 
        message: 'Rental end date mismatch',
        testPlotId,
        expectedEndDate: expectedEndDate.toISOString(),
        actualEndDate: testPlot.rentalEndDate
      })
    }

    // Step 6: Verify user data is correct
    console.log('Test rental process: Step 6 - Verifying user data')
    if (testPlot.soldTo !== userAddress || testPlot.userEmail !== userEmail) {
      console.error('Test rental process: User data mismatch:', { 
        expectedAddress: userAddress, 
        actualAddress: testPlot.soldTo,
        expectedEmail: userEmail,
        actualEmail: testPlot.userEmail
      })
      return NextResponse.json({ 
        success: false, 
        message: 'User data mismatch',
        testPlotId,
        expectedAddress: userAddress,
        actualAddress: testPlot.soldTo,
        expectedEmail: userEmail,
        actualEmail: testPlot.userEmail
      })
    }

    // Step 7: Test user plots retrieval
    console.log('Test rental process: Step 7 - Testing user plots retrieval')
    const userPlots = await PlotDatabase.getUserPlots(userAddress)
    const userHasPlot = userPlots.some(p => p.id === testPlotId)
    
    console.log('Test rental process: User plots count:', userPlots.length)
    console.log('Test rental process: User has test plot:', userHasPlot)

    if (!userHasPlot) {
      console.error('Test rental process: User plots retrieval failed')
      return NextResponse.json({ 
        success: false, 
        message: 'User plots retrieval failed',
        testPlotId,
        userPlotsCount: userPlots.length,
        userHasPlot
      })
    }

    console.log('Test rental process: All tests passed successfully!')

    return NextResponse.json({ 
      success: true, 
      message: 'Rental process test completed successfully',
      testPlotId,
      rentalTerm,
      userAddress,
      userEmail,
      rentalEndDate: testPlot.rentalEndDate,
      userPlotsCount: userPlots.length,
      totalSoldPlots: updatedSoldPlots.length
    })

  } catch (error) {
    console.error('Test rental process: Error:', error)
    return NextResponse.json({ error: 'Test rental process failed' }, { status: 500 })
  }
}
