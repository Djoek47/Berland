"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"

export default function ResetPage() {
  const [resetStatus, setResetStatus] = useState<string>("")
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

  const handleReset = () => {
    try {
      // Clear all localStorage data
      localStorage.removeItem('soldFaberplots')
      localStorage.removeItem('userFaberplots')
      
      setResetStatus("✅ All data has been reset successfully!")
      setCurrentData({
        soldFaberplots: [],
        userFaberplots: []
      })
    } catch (error) {
      setResetStatus("❌ Error resetting data: " + error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaverseNavbar />

      <section className="py-8">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Reset Data</h1>
            <p className="text-zinc-300">Clear all localStorage data for testing</p>
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

            <Card className="border-red-700/30 bg-zinc-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-red-400">⚠️ Reset All Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-4">
                  This will permanently delete all sold plots and user Faberplots data from localStorage.
                  This action cannot be undone.
                </p>
                <Button 
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold"
                >
                  Reset All Data
                </Button>
              </CardContent>
            </Card>

            {resetStatus && (
              <Card className="border-green-700/30 bg-zinc-900/50 backdrop-blur">
                <CardContent className="pt-6">
                  <p className="text-green-400 font-semibold">{resetStatus}</p>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button 
                variant="outline" 
                className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
                onClick={() => window.location.href = '/dashboard'}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}
