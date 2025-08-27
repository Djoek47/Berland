import { NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST() {
  try {
    // Persist database using async method
    const success = await PlotDatabase.persistToFile()
    
    if (success) {
      // Reload the database to ensure consistency
      await PlotDatabase.reloadFromFile()
      
      return NextResponse.json({ 
        success: true, 
        message: 'Database persisted successfully',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to persist database' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Persist database: Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to persist database' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const soldPlots = PlotDatabase.getSoldPlotsSync()
    return NextResponse.json({ 
      success: true, 
      soldPlots,
      plotCount: soldPlots.length 
    })
  } catch (error) {
    console.error('Error getting database status:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}
