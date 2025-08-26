// Simple server-side database for plot management
// This eliminates localStorage issues and provides consistent data across all clients

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

export class PlotDatabase {
  // Get all sold plots
  static getSoldPlots(): PlotStatus[] {
    return soldPlots
  }

  // Check if a plot is sold
  static isPlotSold(plotId: number): boolean {
    return soldPlots.some(plot => plot.id === plotId && plot.isSold)
  }

  // Get plot status
  static getPlotStatus(plotId: number): PlotStatus | null {
    return soldPlots.find(plot => plot.id === plotId) || null
  }

  // Mark plot as sold
  static markPlotAsSold(plotId: number, walletAddress: string, userEmail: string, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): void {
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
  }

  // Extend plot rental
  static extendPlotRental(plotId: number, rentalTerm: 'monthly' | 'quarterly' | 'yearly'): void {
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

  // Remove expired plots
  static removeExpiredPlots(): number[] {
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

  // Reset all data (for testing)
  static resetAllData(): void {
    soldPlots = []
    console.log('All plot data reset')
  }

  // Get user's plots
  static getUserPlots(walletAddress: string): PlotStatus[] {
    return soldPlots.filter(plot => plot.soldTo === walletAddress)
  }
}
