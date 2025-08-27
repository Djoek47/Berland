// Centralized database for plot management
// This ensures all clients see the same data by always fetching from server

export interface PlotStatus {
  id: number
  isSold: boolean
  soldTo?: string // wallet address
  soldAt?: string // ISO date string
  rentalEndDate?: string // ISO date string
  userEmail?: string
  rentalTerm?: 'monthly' | 'quarterly' | 'yearly' // Add rental period information
}

// Server-side storage (global variable - will be reset on server restart)
let soldPlots: PlotStatus[] = []
let isInitialized = false

// Initialize database from file
function initializeDatabase() {
  try {
    const fs = require('fs')
    const path = require('path')
    const dataPath = path.join(process.cwd(), 'data', 'plots.json')
    
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8')
      const parsedData = JSON.parse(data)
      soldPlots = Array.isArray(parsedData) ? parsedData : []
      console.log(`Database: Initialized with ${soldPlots.length} plots from file`)
    } else {
      console.log('Database: No existing data file found, starting with empty database')
      soldPlots = []
    }
  } catch (error) {
    console.error('Database: Error initializing from file:', error)
    soldPlots = []
  }
  
  isInitialized = true
}

// Force re-initialization (for when we need to reload from file)
function forceReinitialize() {
  isInitialized = false
  initializeDatabase()
}

export class PlotDatabase {
  // Get all sold plots - always fetch from server
  static async getSoldPlots(): Promise<PlotStatus[]> {
    try {
      const response = await fetch('/api/database-status')
      if (response.ok) {
        const data = await response.json()
        return data.soldPlots || []
      }
    } catch (error) {
      console.error('Error fetching sold plots:', error)
    }
    return soldPlots // Fallback to local data
  }

  // Check if a plot is sold - always check server
  static async isPlotSold(plotId: number): Promise<boolean> {
    try {
      const soldPlots = await this.getSoldPlots()
      return soldPlots.some(plot => plot.id === plotId && plot.isSold)
    } catch (error) {
      console.error('Error checking plot sold status:', error)
      return false
    }
  }

  // Get plot status - always fetch from server
  static async getPlotStatus(plotId: number): Promise<PlotStatus | null> {
    try {
      const soldPlots = await this.getSoldPlots()
      return soldPlots.find(plot => plot.id === plotId) || null
    } catch (error) {
      console.error('Error getting plot status:', error)
      return null
    }
  }

  // Mark plot as sold - server-side only
  static markPlotAsSold(plotId: number, walletAddress: string, userEmail: string, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): void {
    // Force re-initialization to ensure we have the latest data
    forceReinitialize()
    const existingIndex = soldPlots.findIndex(plot => plot.id === plotId)
    
    const rentalEndDate = new Date()
    switch (rentalTerm) {
      case 'monthly':
        rentalEndDate.setDate(rentalEndDate.getDate() + 30)
        break
      case 'quarterly':
        rentalEndDate.setDate(rentalEndDate.getDate() + 90)
        break
      case 'yearly':
        rentalEndDate.setDate(rentalEndDate.getDate() + 365)
        break
    }

    const plotStatus: PlotStatus = {
      id: plotId,
      isSold: true,
      soldTo: walletAddress, // Always ensure this is set
      soldAt: new Date().toISOString(),
      rentalEndDate: rentalEndDate.toISOString(),
      rentalTerm: rentalTerm, // Store the rental period
      userEmail
    }

    if (existingIndex >= 0) {
      soldPlots[existingIndex] = plotStatus
    } else {
      soldPlots.push(plotStatus)
    }

    console.log(`Plot ${plotId} marked as sold to ${walletAddress}`)
    console.log(`Database: Total sold plots: ${soldPlots.length}`)
    
    // Persist to file immediately
    try {
      const fs = require('fs')
      const path = require('path')
      const dataPath = path.join(process.cwd(), 'data', 'plots.json')
      const dataDir = path.dirname(dataPath)
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      fs.writeFileSync(dataPath, JSON.stringify(soldPlots, null, 2))
      console.log(`Database: Persisted ${soldPlots.length} plots to file`)
    } catch (error) {
      console.error('Database: Error persisting to file:', error)
    }
  }

  // Extend plot rental - server-side only
  static extendPlotRental(plotId: number, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): void {
    // Force re-initialization to ensure we have the latest data
    forceReinitialize()
    const plotIndex = soldPlots.findIndex(plot => plot.id === plotId)
    if (plotIndex >= 0) {
      const plot = soldPlots[plotIndex]
      const currentEndDate = new Date(plot.rentalEndDate || Date.now())
      
      let extensionDays = 30
      switch (rentalTerm) {
        case 'monthly':
          extensionDays = 30
          break
        case 'quarterly':
          extensionDays = 90
          break
        case 'yearly':
          extensionDays = 365
          break
      }
      
      const newEndDate = new Date(currentEndDate.getTime() + extensionDays * 24 * 60 * 60 * 1000)
      soldPlots[plotIndex].rentalEndDate = newEndDate.toISOString()
      
      console.log(`Plot ${plotId} rental extended to ${newEndDate.toISOString()}`)
      
      // Persist to file immediately
      try {
        const fs = require('fs')
        const path = require('path')
        const dataPath = path.join(process.cwd(), 'data', 'plots.json')
        const dataDir = path.dirname(dataPath)
        
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }
        
        fs.writeFileSync(dataPath, JSON.stringify(soldPlots, null, 2))
        console.log(`Database: Persisted ${soldPlots.length} plots to file after extension`)
      } catch (error) {
        console.error('Database: Error persisting to file:', error)
      }
    }
  }

  // Remove expired plots - server-side only
  static removeExpiredPlots(): number[] {
    // Force re-initialization to ensure we have the latest data
    forceReinitialize()
    const now = new Date()
    const expiredPlotIds: number[] = []
    
    soldPlots = soldPlots.filter(plot => {
      if (plot.rentalEndDate && new Date(plot.rentalEndDate) < now) {
        expiredPlotIds.push(plot.id)
        console.log(`Plot ${plot.id} expired and removed`)
        return false // Remove from sold plots
      }
      return true
    })
    
    return expiredPlotIds
  }

  // Persist database to file - server-side only
  static persistToFile(): boolean {
    try {
      const fs = require('fs')
      const path = require('path')
      const dataPath = path.join(process.cwd(), 'data', 'plots.json')
      const dataDir = path.dirname(dataPath)
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      // Ensure we have the latest data before persisting
      forceReinitialize()
      
      fs.writeFileSync(dataPath, JSON.stringify(soldPlots, null, 2))
      console.log(`Database: Persisted ${soldPlots.length} plots to file`)
      return true
    } catch (error) {
      console.error('Database: Error persisting to file:', error)
      return false
    }
  }

  // Reload database from file - server-side only
  static reloadFromFile(): boolean {
    try {
      forceReinitialize()
      console.log(`Database: Reloaded ${soldPlots.length} plots from file`)
      return true
    } catch (error) {
      console.error('Database: Error reloading from file:', error)
      return false
    }
  }

  // Fix any plots missing soldTo field - server-side only
  static fixMissingSoldTo(): void {
    forceReinitialize()
    let fixed = false
    
    soldPlots.forEach(plot => {
      if (plot.isSold && !plot.soldTo) {
        // If plot is sold but missing soldTo, we can't recover the wallet address
        // So we'll mark it as available again
        console.log(`Database: Fixing plot ${plot.id} - missing soldTo field, marking as available`)
        plot.isSold = false
        plot.soldTo = undefined
        plot.soldAt = undefined
        plot.rentalEndDate = undefined
        plot.rentalTerm = undefined
        plot.userEmail = undefined
        fixed = true
      }
    })
    
    if (fixed) {
      console.log('Database: Fixed plots with missing soldTo field')
      this.persistToFile()
    }
  }

  // Reset all data (for testing) - server-side only
  static resetAllData(): void {
    // Clear the in-memory data first
    soldPlots = []
    console.log('All plot data reset')
    
    // Persist empty state to file directly
    try {
      const fs = require('fs')
      const path = require('path')
      const dataPath = path.join(process.cwd(), 'data', 'plots.json')
      const dataDir = path.dirname(dataPath)
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      fs.writeFileSync(dataPath, JSON.stringify([], null, 2))
      console.log('Database: Persisted empty database to file')
    } catch (error) {
      console.error('Database: Error persisting empty database:', error)
    }
  }

  // Get user's plots - always fetch from server
  static async getUserPlots(walletAddress: string): Promise<PlotStatus[]> {
    try {
      const soldPlots = await this.getSoldPlots()
      return soldPlots.filter(plot => plot.soldTo === walletAddress)
    } catch (error) {
      console.error('Error getting user plots:', error)
      return []
    }
  }

  // Synchronous versions for server-side use only
  static getSoldPlotsSync(): PlotStatus[] {
    // Force re-initialization to ensure we have the latest data
    forceReinitialize()
    // Fix any plots with missing soldTo field
    this.fixMissingSoldTo()
    return soldPlots
  }

  static isPlotSoldSync(plotId: number): boolean {
    // Force re-initialization to ensure we have the latest data
    forceReinitialize()
    return soldPlots.some(plot => plot.id === plotId && plot.isSold)
  }

  static getUserPlotsSync(walletAddress: string): PlotStatus[] {
    // Force re-initialization to ensure we have the latest data
    forceReinitialize()
    return soldPlots.filter(plot => plot.soldTo === walletAddress)
  }
}
