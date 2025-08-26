import { NextRequest, NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Reset all data
    PlotDatabase.resetAllData()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database reset successfully' 
    })
  } catch (error) {
    console.error('Error resetting database:', error)
    return NextResponse.json(
      { error: 'Failed to reset database' },
      { status: 500 }
    )
  }
}
