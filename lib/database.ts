// Simple database layer for plot management
// This can be easily replaced with a real database (PostgreSQL, MongoDB, etc.)

export interface PlotStatus {
  id: number
  isSold: boolean
  soldTo?: string // wallet address
  soldAt?: string // ISO date string
  rentalEndDate?: string // ISO date string
  userEmail?: string
}

// In-memory storage (replace with real database)
let soldPlots: PlotStatus[] = []

// Load data from localStorage on initialization (client-side only)
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem('soldFaberplots')
    if (stored) {
      const plotIds = JSON.parse(stored)
      soldPlots = plotIds.map((id: number) => ({
        id,
        isSold: true,
        soldAt: new Date().toISOString(),
        rentalEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      }))
    }
  } catch (error) {
    console.error('Error loading plot data:', error)
  }
}

export class PlotDatabase {
  // Get all sold plots
  static getSoldPlots(): PlotStatus[] {
    // For server-side, return empty array since we can't access localStorage
    if (typeof window === 'undefined') {
      return []
    }
    return soldPlots
  }

  // Check if a plot is sold
  static isPlotSold(plotId: number): boolean {
    // For server-side, always return false since we can't access localStorage
    if (typeof window === 'undefined') {
      return false
    }
    return soldPlots.some(plot => plot.id === plotId && plot.isSold)
  }

  // Get plot status
  static getPlotStatus(plotId: number): PlotStatus | null {
    // For server-side, return null since we can't access localStorage
    if (typeof window === 'undefined') {
      return null
    }
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

    // Update localStorage for persistence
    if (typeof window !== 'undefined') {
      const plotIds = soldPlots.map(plot => plot.id)
      localStorage.setItem('soldFaberplots', JSON.stringify(plotIds))
      
      // Also update user's plots
      const userPlots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
      const existingUserPlotIndex = userPlots.findIndex((plot: any) => plot.id === plotId)
      
      if (existingUserPlotIndex >= 0) {
        // Update existing plot
        userPlots[existingUserPlotIndex] = {
          ...userPlots[existingUserPlotIndex],
          rentalEndDate: rentalEndDate.toISOString()
        }
      } else {
        // Add new plot
        userPlots.push({
          id: plotId,
          name: `Faberplot #${plotId}`,
          description: `Faberplot #${plotId} - A versatile virtual plot perfect for businesses, galleries, or creative projects.`,
          monthlyRent: 40 + Math.floor(Math.random() * 41), // Random price between $40-$80
          image: (plotId % 8 === 0) ? "/images/faberge-eggs/crystal-amber.jpeg" :
                 (plotId % 8 === 1) ? "/images/faberge-eggs/amber-glow.png" :
                 (plotId % 8 === 2) ? "/images/faberge-eggs/ruby-red.png" :
                 (plotId % 8 === 3) ? "/images/faberge-eggs/emerald-green.png" :
                 (plotId % 8 === 4) ? "/images/faberge-eggs/bronze-glow.png" :
                 (plotId % 8 === 5) ? "/images/faberge-eggs/rose-quartz.jpeg" :
                 (plotId % 8 === 6) ? "/images/faberge-eggs/sapphire-blue.png" :
                 "/images/faberge-eggs/fire-opal.png",
          location: ["Market District", "Business District", "Arts District", "Entertainment District", "Central District"][plotId % 5],
          size: plotId < 15 ? "Small (2,500 sq ft)" : plotId < 30 ? "Medium (5,000 sq ft)" : "Large (7,500 sq ft)",
          visitors: 1500 + (plotId * 100),
          features: plotId < 15 ? ["Retail Ready", "Affordable", "High Foot Traffic", "Quick Setup", "24/7 Access"] :
                    plotId < 30 ? ["Corporate Ready", "Meeting Spaces", "Business Hub", "Professional Environment", "Networking Opportunities"] :
                    ["Event Space", "Premium Location", "Creative Hub", "Exclusive Access", "Custom Branding"],
          rentalEndDate: rentalEndDate.toISOString(),
          totalPrice: 0 // Will be calculated based on term
        })
      }
      
      localStorage.setItem('userFaberplots', JSON.stringify(userPlots))
    }
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
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        const userPlots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
        const userPlotIndex = userPlots.findIndex((p: any) => p.id === plotId)
        if (userPlotIndex >= 0) {
          userPlots[userPlotIndex].rentalEndDate = newEndDate.toISOString()
          localStorage.setItem('userFaberplots', JSON.stringify(userPlots))
        }
      }
    }
  }

  // Remove expired plots
  static removeExpiredPlots(): number[] {
    const now = new Date()
    const expiredPlotIds: number[] = []
    
    soldPlots = soldPlots.filter(plot => {
      if (plot.rentalEndDate && new Date(plot.rentalEndDate) < now) {
        expiredPlotIds.push(plot.id)
        return false // Remove from sold plots
      }
      return true
    })
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const plotIds = soldPlots.map(plot => plot.id)
      localStorage.setItem('soldFaberplots', JSON.stringify(plotIds))
      
      // Remove from user plots
      const userPlots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
      const updatedUserPlots = userPlots.filter((plot: any) => !expiredPlotIds.includes(plot.id))
      localStorage.setItem('userFaberplots', JSON.stringify(updatedUserPlots))
    }
    
    return expiredPlotIds
  }

  // Reset all data (for testing)
  static resetAllData(): void {
    soldPlots = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('soldFaberplots')
      localStorage.removeItem('userFaberplots')
    }
  }

  // Get user's plots
  static getUserPlots(walletAddress: string): PlotStatus[] {
    return soldPlots.filter(plot => plot.soldTo === walletAddress)
  }
}
