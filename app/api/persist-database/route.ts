import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { PlotDatabase } from '@/lib/database'

const DATA_FILE_PATH = join(process.cwd(), 'data', 'plots.json')

// Load data from file
function loadDataFromFile() {
  try {
    if (existsSync(DATA_FILE_PATH)) {
      const data = readFileSync(DATA_FILE_PATH, 'utf8')
      console.log(`Database: Loaded data from file`)
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Database: Error loading data from file:', error)
  }
  return []
}

// Save data to file
function saveDataToFile(data: any) {
  try {
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data')
    if (!existsSync(dataDir)) {
      const fs = require('fs')
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2))
    console.log(`Database: Saved data to file`)
    return true
  } catch (error) {
    console.error('Database: Error saving data to file:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const soldPlots = PlotDatabase.getSoldPlots()
    const success = saveDataToFile(soldPlots)
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Database persisted successfully',
        plotCount: soldPlots.length 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to persist database' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error persisting database:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const soldPlots = PlotDatabase.getSoldPlots()
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
