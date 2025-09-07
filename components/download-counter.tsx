"use client"

import { useState, useEffect } from "react"
import { Download, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedCounter from "@/components/animated-counter"

export default function DownloadCounter() {
  const [downloadCount, setDownloadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch download count from analytics
    // For now, we'll use a placeholder that can be updated with real data
    const fetchDownloadCount = async () => {
      try {
        // This would typically fetch from your analytics service
        // For now, we'll simulate a growing number
        const mockCount = Math.floor(Math.random() * 1000) + 500
        setDownloadCount(mockCount)
      } catch (error) {
        console.error('Error fetching download count:', error)
        setDownloadCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDownloadCount()
    
    // Update count every 30 seconds to simulate real-time updates
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="rounded-lg border border-amber-700/30 bg-black/40 backdrop-blur">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">
            <div className="h-12 w-12 bg-amber-400/20 rounded-lg mx-auto mb-4"></div>
            <div className="h-6 bg-amber-400/20 rounded mb-2"></div>
            <div className="h-4 bg-amber-400/20 rounded w-3/4 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-lg border border-amber-700/30 bg-black/40 backdrop-blur text-center">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-lg bg-amber-500/20 text-amber-400">
            <Download className="h-6 w-6" />
          </div>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-white">VR Demo Downloads</h3>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="text-4xl font-bold text-white">
            <AnimatedCounter 
              end={downloadCount} 
              className="text-4xl font-bold" 
            />
          </div>
          <div className="flex items-center text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+{Math.floor(Math.random() * 5) + 1} today</span>
          </div>
        </div>
        
        <p className="text-zinc-300 text-sm">
          Join thousands experiencing Faberland in VR
        </p>
        
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-amber-400">
          <span>• Windows Compatible</span>
          <span>• VR Ready</span>
          <span>• Free Demo</span>
        </div>
      </CardContent>
    </Card>
  )
}
