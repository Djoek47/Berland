"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"

export default function TestExpiringPage() {
  const [testStatus, setTestStatus] = useState<string>("")
  const [currentData, setCurrentData] = useState<any>({})

  useEffect(() => {
    // Show current data
    const soldPlots = localStorage.getItem('soldFaberplots')
    const userPlots = localStorage.getItem('userFaberplots')
    
    setCurrentData({
      soldFaberplots: soldPlots ? JSON.parse(soldPlots) : [],
      userFaberplots: userPlots ? JSON.parse(userPlots) : []
    })
  }, [])

  const createExpiringPlot = () => {
    try {
      // Create a plot that expires in 5 minutes
      const now = new Date()
      const expiresIn5Minutes = new Date(now.getTime() + 5 * 60 * 1000) // 5 minutes from now
      
      const expiringPlot = {
        id: 999, // Use a unique ID
        name: "Faberplot #999 (Expiring Soon)",
        description: "This is a test plot that expires in 5 minutes to test the expiring plot functionality.",
        image: "/images/faberge-eggs/crystal-amber.jpeg",
        location: "Test District",
        size: "Medium (5,000 sq ft)",
        visitors: 1500,
        features: ["Test Plot", "Expiring Soon", "Demo Purpose"],
        monthlyRent: 60,
        rentalStartDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(), // Started 25 days ago
        rentalEndDate: expiresIn5Minutes.toISOString(), // Expires in 5 minutes
        selectedTerm: "monthly" as const,
        totalPrice: 60
      }
      
      // Add to user's Faberplots
      const userFaberplots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
      const existingPlotIndex = userFaberplots.findIndex((plot: any) => plot.id === 999)
      
      if (existingPlotIndex === -1) {
        userFaberplots.push(expiringPlot)
        localStorage.setItem('userFaberplots', JSON.stringify(userFaberplots))
        
        // Also mark it as sold
        const soldFaberplots = JSON.parse(localStorage.getItem('soldFaberplots') || '[]')
        if (!soldFaberplots.includes(999)) {
          soldFaberplots.push(999)
          localStorage.setItem('soldFaberplots', JSON.stringify(soldFaberplots))
        }
        
        setTestStatus(`✅ Created expiring plot! Plot #999 will expire at ${expiresIn5Minutes.toLocaleTimeString()}`)
        setCurrentData({
          soldFaberplots: soldFaberplots,
          userFaberplots: userFaberplots
        })
      } else {
        setTestStatus("⚠️ Test plot already exists! Check your dashboard.")
      }
    } catch (error) {
      setTestStatus("❌ Error creating expiring plot: " + error)
    }
  }

  const createExpiredPlot = () => {
    try {
      // Create a plot that has already expired
      const now = new Date()
      const expired1HourAgo = new Date(now.getTime() - 60 * 60 * 1000) // 1 hour ago
      
      const expiredPlot = {
        id: 998, // Use a unique ID
        name: "Faberplot #998 (Expired)",
        description: "This is a test plot that has already expired to test the expired plot functionality.",
        image: "/images/faberge-eggs/ruby-red.png",
        location: "Test District",
        size: "Medium (5,000 sq ft)",
        visitors: 1200,
        features: ["Test Plot", "Already Expired", "Demo Purpose"],
        monthlyRent: 50,
        rentalStartDate: new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString(), // Started 31 days ago
        rentalEndDate: expired1HourAgo.toISOString(), // Expired 1 hour ago
        selectedTerm: "monthly" as const,
        totalPrice: 50
      }
      
      // Add to user's Faberplots
      const userFaberplots = JSON.parse(localStorage.getItem('userFaberplots') || '[]')
      const existingPlotIndex = userFaberplots.findIndex((plot: any) => plot.id === 998)
      
      if (existingPlotIndex === -1) {
        userFaberplots.push(expiredPlot)
        localStorage.setItem('userFaberplots', JSON.stringify(userFaberplots))
        
        // Also mark it as sold
        const soldFaberplots = JSON.parse(localStorage.getItem('soldFaberplots') || '[]')
        if (!soldFaberplots.includes(998)) {
          soldFaberplots.push(998)
          localStorage.setItem('soldFaberplots', JSON.stringify(soldFaberplots))
        }
        
        setTestStatus(`✅ Created expired plot! Plot #998 expired at ${expired1HourAgo.toLocaleTimeString()}`)
        setCurrentData({
          soldFaberplots: soldFaberplots,
          userFaberplots: userFaberplots
        })
      } else {
        setTestStatus("⚠️ Expired test plot already exists! Check your dashboard.")
      }
    } catch (error) {
      setTestStatus("❌ Error creating expired plot: " + error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      <section className="py-8">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Test Expiring Plots</h1>
            <p className="text-zinc-300">Create test plots to simulate expiring and expired scenarios</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Current Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Sold Faberplots</h3>
                    <p className="text-zinc-300">
                      {currentData.soldFaberplots?.length > 0 
                        ? `Plots: ${currentData.soldFaberplots.join(', ')}`
                        : 'No plots marked as sold'
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">User Faberplots</h3>
                    <p className="text-zinc-300">
                      {currentData.userFaberplots?.length > 0 
                        ? `${currentData.userFaberplots.length} plots owned`
                        : 'No plots owned'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-700/30 bg-zinc-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-orange-400">⏰ Create Expiring Plot (5 minutes)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-4">
                  Creates a test plot that expires in exactly 5 minutes. Perfect for testing the "last 5 minutes" scenario.
                </p>
                <Button 
                  onClick={createExpiringPlot}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
                >
                  Create Expiring Plot
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-700/30 bg-zinc-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-red-400">❌ Create Expired Plot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-4">
                  Creates a test plot that has already expired (1 hour ago). Perfect for testing expired plot handling.
                </p>
                <Button 
                  onClick={createExpiredPlot}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold"
                >
                  Create Expired Plot
                </Button>
              </CardContent>
            </Card>

            {testStatus && (
              <Card className="border-green-700/30 bg-zinc-900/50 backdrop-blur">
                <CardContent className="pt-6">
                  <p className="text-green-400 font-semibold">{testStatus}</p>
                </CardContent>
              </Card>
            )}

            <div className="text-center space-y-4">
              <Button 
                variant="outline" 
                className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
                onClick={() => window.location.href = '/dashboard'}
              >
                Go to Dashboard
              </Button>
              <div className="text-sm text-zinc-400">
                <p>💡 Tip: After creating the expiring plot, go to your dashboard and watch the countdown!</p>
                <p>The plot will show "X days remaining" and eventually "Expired" status.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}
