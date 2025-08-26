// Centralized database for plot management
// This ensures all clients see the same data by always fetching from server

export interface PlotStatus {
  id: number
  isSold: boolean
  soldTo?: string // wallet address
  soldAt?: string // ISO date string
  rentalEndDate?: string // ISO date string
  userEmail?: string
}

// Server-side storage (global variable - will be reset on server restart)
let soldPlots: PlotStatus[] = []
let isInitialized = false

// Initialize database from file
function initializeDatabase() {
  if (isInitialized) return
  
  try {
    const fs = require('fs')
    const path = require('path')
    const dataPath = path.join(process.cwd(), 'data', 'plots.json')
    
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8')
      soldPlots = JSON.parse(data)
      console.log(`Database: Initialized with ${soldPlots.length} plots from file`)
    } else {
      console.log('Database: No existing data file found, starting with empty database')
    }
  } catch (error) {
    console.error('Database: Error initializing from file:', error)
  }
  
  isInitialized = true
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
    initializeDatabase()
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
      soldTo: walletAddress,
      soldAt: new Date().toISOString(),
      rentalEndDate: rentalEndDate.toISOString(),
      userEmail
    }

    if (existingIndex >= 0) {
      soldPlots[existingIndex] = plotStatus
    } else {
      soldPlots.push(plotStatus)
    }

    console.log(`Plot ${plotId} marked as sold to ${walletAddress}`)
    console.log(`Database: Total sold plots: ${soldPlots.length}`)
  }

  // Extend plot rental - server-side only
  static extendPlotRental(plotId: number, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): void {
    initializeDatabase()
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
    }
  }

  // Remove expired plots - server-side only
  static removeExpiredPlots(): number[] {
    initializeDatabase()
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

  // Reset all data (for testing) - server-side only
  static resetAllData(): void {
    initializeDatabase()
    soldPlots = []
    console.log('All plot data reset')
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
    initializeDatabase()
    return soldPlots
  }

  static isPlotSoldSync(plotId: number): boolean {
    initializeDatabase()
    return soldPlots.some(plot => plot.id === plotId && plot.isSold)
  }

  static getUserPlotsSync(walletAddress: string): PlotStatus[] {
    initializeDatabase()
    return soldPlots.filter(plot => plot.soldTo === walletAddress)
  }
}
