import { NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function POST() {
  try {
    // Reset all data using async method
    await PlotDatabase.resetAllData()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database reset successfully' 
    })
  } catch (error) {
    console.error('Reset database: Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to reset database' 
    }, { status: 500 })
  }
}
