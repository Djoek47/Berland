import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { plotId, userAddress, userEmail, rentalTerm, isRenewal } = await request.json()

    console.log('Process rental: Received request:', { plotId, userAddress, userEmail, rentalTerm, isRenewal })

    // Enhanced validation
    if (!plotId || !userAddress || !userEmail || !rentalTerm) {
      console.error('Process rental: Missing required fields:', { plotId, userAddress, userEmail, rentalTerm })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate rental term
    if (!['monthly', 'quarterly', 'yearly'].includes(rentalTerm)) {
      console.error('Process rental: Invalid rental term:', rentalTerm)
      return NextResponse.json({ error: 'Invalid rental term' }, { status: 400 })
    }

    // Validate email format
    if (!userEmail.includes('@')) {
      console.error('Process rental: Invalid email format:', userEmail)
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validate wallet address format (basic check)
    if (!userAddress.startsWith('0x') || userAddress.length !== 42) {
      console.error('Process rental: Invalid wallet address format:', userAddress)
      return NextResponse.json({ error: 'Invalid wallet address format' }, { status: 400 })
    }

    // Check if plot is already sold
    const isSold = await PlotDatabase.isPlotSold(plotId)
    
    if (isRenewal) {
      // For renewals, plot should already be sold
      if (!isSold) {
        console.error('Process rental: Cannot renew plot that is not sold:', plotId)
        return NextResponse.json({ error: 'Cannot renew plot that is not sold' }, { status: 400 })
      }
      
      console.log('Process rental: Processing renewal for plot:', plotId)
      await PlotDatabase.extendPlotRental(plotId, rentalTerm)
      console.log('Process rental: Plot renewal processed successfully')
    } else {
      // For new rentals, plot should not be sold
      if (isSold) {
        console.error('Process rental: Plot already sold:', plotId)
        return NextResponse.json({ error: 'Plot is already sold' }, { status: 400 })
      }
      
      console.log('Process rental: All validations passed, marking plot as sold')
      await PlotDatabase.markPlotAsSold(plotId, userAddress, userEmail, rentalTerm)
      console.log('Process rental: Plot marked as sold successfully')
    }

    // Verify the plot was actually marked as sold
    const verifySold = await PlotDatabase.isPlotSold(plotId)
    if (!verifySold) {
      console.error('Process rental: Plot was not properly marked as sold')
      return NextResponse.json({ error: 'Failed to mark plot as sold' }, { status: 500 })
    }

    console.log('Process rental: Verification successful, plot is now sold')

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
