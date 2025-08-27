// Centralized database for plot management using Vercel KV (Redis)
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

// Check if we're in production (Vercel)
const isProduction = process.env.NODE_ENV === 'production'

// Initialize Vercel KV client (only in production)
let kv: any = null
if (isProduction) {
  try {
    // Use REDIS_URL environment variable
    kv = require('@vercel/kv').kv
    console.log('Database: Vercel KV client initialized successfully')
    console.log('Database: REDIS_URL available:', !!process.env.REDIS_URL)
  } catch (error) {
    console.error('Failed to initialize Vercel KV:', error)
    console.error('Database: REDIS_URL available:', !!process.env.REDIS_URL)
  }
}

// Server-side storage for development (file-based)
let soldPlots: PlotStatus[] = []
let isInitialized = false

// Initialize database from file (development) or KV (production)
async function initializeDatabase() {
  if (isInitialized) return
  
  try {
    if (isProduction && kv) {
      // In production, load from Vercel KV
      console.log('Database: Attempting to load from Vercel KV...')
      const kvData = await kv.get('faberland_plots')
      console.log('Database: KV data retrieved:', kvData)
      
      if (kvData) {
        soldPlots = Array.isArray(kvData) ? kvData : []
        console.log(`Database: Initialized with ${soldPlots.length} plots from Vercel KV`)
      } else {
        console.log('Database: No existing KV data found, starting with empty database')
        soldPlots = []
      }
    } else {
      // In development, load from file
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
    }
  } catch (error) {
    console.error('Database: Error initializing:', error)
    soldPlots = []
  }
  
  isInitialized = true
}

// Reload database from storage (only when needed)
async function reloadFromStorage() {
  try {
    if (isProduction && kv) {
      // In production, reload from Vercel KV
      console.log('Database: Reloading from Vercel KV...')
      const kvData = await kv.get('faberland_plots')
      console.log('Database: Reloaded KV data:', kvData)
      
      if (kvData) {
        soldPlots = Array.isArray(kvData) ? kvData : []
        console.log(`Database: Reloaded ${soldPlots.length} plots from Vercel KV`)
      } else {
        console.log('Database: No KV data found during reload')
      }
    } else {
      // In development, reload from file
      const fs = require('fs')
      const path = require('path')
      const dataPath = path.join(process.cwd(), 'data', 'plots.json')
      
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf8')
        const parsedData = JSON.parse(data)
        soldPlots = Array.isArray(parsedData) ? parsedData : []
        console.log(`Database: Reloaded ${soldPlots.length} plots from file`)
      } else {
        console.log('Database: No file data found during reload')
      }
    }
  } catch (error) {
    console.error('Database: Error reloading from storage:', error)
  }
}

// Persist data to storage (file in dev, KV in prod)
async function persistData() {
  try {
    if (isProduction && kv) {
      // In production, save to Vercel KV
      console.log('Database: Persisting to Vercel KV...')
      console.log('Database: Data to persist:', soldPlots)
      
      await kv.set('faberland_plots', soldPlots)
      console.log(`Database: Persisted ${soldPlots.length} plots to Vercel KV`)
      
      // Verify the data was saved
      const verifyData = await kv.get('faberland_plots')
      console.log('Database: Verification - data in KV after save:', verifyData)
    } else {
      // In development, save to file
      const fs = require('fs')
      const path = require('path')
      const dataPath = path.join(process.cwd(), 'data', 'plots.json')
      const dataDir = path.dirname(dataPath)
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      fs.writeFileSync(dataPath, JSON.stringify(soldPlots, null, 2))
      console.log(`Database: Persisted ${soldPlots.length} plots to file`)
    }
  } catch (error) {
    console.error('Database: Error persisting data:', error)
  }
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
  static async markPlotAsSold(plotId: number, walletAddress: string, userEmail: string, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): Promise<void> {
    console.log('Database: markPlotAsSold called with:', { plotId, walletAddress, userEmail, rentalTerm })
    
    // Initialize if not already done
    if (!isInitialized) {
      console.log('Database: Initializing database...')
      await initializeDatabase()
    }
    
    // Reload from storage to get latest data
    console.log('Database: Reloading from storage...')
    await reloadFromStorage()
    
    const existingIndex = soldPlots.findIndex(plot => plot.id === plotId)
    console.log('Database: Existing plot index:', existingIndex)
    console.log('Database: Current soldPlots:', soldPlots)
    
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
      console.log(`Database: Updated existing plot ${plotId}`)
    } else {
      soldPlots.push(plotStatus)
      console.log(`Database: Added new plot ${plotId}`)
    }

    console.log(`Plot ${plotId} marked as sold to ${walletAddress}`)
    console.log(`Database: Total sold plots: ${soldPlots.length}`)
    console.log(`Database: All plots:`, soldPlots.map(p => ({ id: p.id, soldTo: p.soldTo })))
    
    // Persist data
    console.log('Database: Persisting data...')
    await persistData()
  }

  // Extend plot rental - server-side only
  static async extendPlotRental(plotId: number, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): Promise<void> {
    // Initialize if not already done
    if (!isInitialized) {
      await initializeDatabase()
    }
    
    // Reload from storage to get latest data
    await reloadFromStorage()
    
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
      
      // Persist data
      await persistData()
    }
  }

  // Remove expired plots - server-side only
  static async removeExpiredPlots(): Promise<number[]> {
    // Initialize if not already done
    if (!isInitialized) {
      await initializeDatabase()
    }
    
    // Reload from storage to get latest data
    await reloadFromStorage()
    
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
    
    // Persist the updated data
    await persistData()
    return expiredPlotIds
  }

  // Persist database to storage - server-side only
  static async persistToFile(): Promise<boolean> {
    try {
      await persistData()
      return true
    } catch (error) {
      console.error('Database: Error persisting data:', error)
      return false
    }
  }

  // Reload database from storage - server-side only
  static async reloadFromFile(): Promise<boolean> {
    try {
      await reloadFromStorage()
      console.log(`Database: Reloaded ${soldPlots.length} plots from storage`)
      return true
    } catch (error) {
      console.error('Database: Error reloading from storage:', error)
      return false
    }
  }

  // Fix any plots missing soldTo field - server-side only
  static async fixMissingSoldTo(): Promise<void> {
    // Initialize if not already done
    if (!isInitialized) {
      await initializeDatabase()
    }
    
    // Reload from storage to get latest data
    await reloadFromStorage()
    
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
      await persistData()
    }
  }

  // Reset all data (for testing) - server-side only
  static async resetAllData(): Promise<void> {
    // Clear the in-memory data first
    soldPlots = []
    console.log('All plot data reset')
    
    // Persist empty state
    await persistData()
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

  // Synchronous versions for server-side use only (for backward compatibility)
  static getSoldPlotsSync(): PlotStatus[] {
    // Force re-initialization to ensure we have the latest data
    if (!isInitialized) {
      // For sync methods, we'll initialize synchronously in development
      if (!isProduction) {
        try {
          const fs = require('fs')
          const path = require('path')
          const dataPath = path.join(process.cwd(), 'data', 'plots.json')
          
          if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath, 'utf8')
            const parsedData = JSON.parse(data)
            soldPlots = Array.isArray(parsedData) ? parsedData : []
          } else {
            soldPlots = []
          }
          isInitialized = true
        } catch (error) {
          console.error('Database: Error in sync initialization:', error)
          soldPlots = []
        }
      } else {
        // In production, return empty array for sync methods (use async instead)
        console.warn('Database: Sync method called in production - returning empty array')
        return []
      }
    }
    
    // Fix any plots with missing soldTo field
    this.fixMissingSoldToSync()
    return soldPlots
  }

  static isPlotSoldSync(plotId: number): boolean {
    const soldPlots = this.getSoldPlotsSync()
    return soldPlots.some(plot => plot.id === plotId && plot.isSold)
  }

  static getUserPlotsSync(walletAddress: string): PlotStatus[] {
    const soldPlots = this.getSoldPlotsSync()
    return soldPlots.filter(plot => plot.soldTo === walletAddress)
  }

  // Sync version of fixMissingSoldTo for backward compatibility
  static fixMissingSoldToSync(): void {
    let fixed = false
    
    soldPlots.forEach(plot => {
      if (plot.isSold && !plot.soldTo) {
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
      // In development, persist immediately
      if (!isProduction) {
        try {
          const fs = require('fs')
          const path = require('path')
          const dataPath = path.join(process.cwd(), 'data', 'plots.json')
          const dataDir = path.dirname(dataPath)
          
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
          }
          
          fs.writeFileSync(dataPath, JSON.stringify(soldPlots, null, 2))
        } catch (error) {
          console.error('Database: Error persisting after fix:', error)
        }
      }
    }
  }
}
