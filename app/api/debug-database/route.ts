import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('address')
    
    console.log('Debug database: Request received for wallet:', walletAddress)
    
    // Get all sold plots
    const allSoldPlots = await PlotDatabase.getSoldPlots()
    console.log('Debug database: All sold plots:', allSoldPlots)
    
    // Get user plots if address provided
    let userPlots: any[] = []
    if (walletAddress) {
      userPlots = await PlotDatabase.getUserPlots(walletAddress)
      console.log('Debug database: User plots for', walletAddress, ':', userPlots)
    }
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      totalSoldPlots: allSoldPlots.length,
      allSoldPlots: allSoldPlots.map(plot => ({
        id: plot.id,
        isSold: plot.isSold,
        soldTo: plot.soldTo,
        soldAt: plot.soldAt,
        rentalEndDate: plot.rentalEndDate,
        rentalTerm: plot.rentalTerm,
        userEmail: plot.userEmail
      })),
      userPlots: userPlots.length,
      userPlotsData: userPlots.map(plot => ({
        id: plot.id,
        isSold: plot.isSold,
        soldTo: plot.soldTo,
        soldAt: plot.soldAt,
        rentalEndDate: plot.rentalEndDate,
        rentalTerm: plot.rentalTerm,
        userEmail: plot.userEmail
      })),
      debug: {
        walletAddress,
        hasAddress: !!walletAddress
      }
    })
    
  } catch (error) {
    console.error('Debug database: Error:', error)
    return NextResponse.json({ error: 'Failed to debug database' }, { status: 500 })
  }
}
