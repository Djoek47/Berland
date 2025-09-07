"use client"

import { useState, useEffect } from "react"
import { Download, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AnimatedCounter from "@/components/animated-counter"
import { track } from '@vercel/analytics'

export default function DownloadCounter() {
  const [downloadCount, setDownloadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadUrl = "https://storage.googleapis.com/djt45test/VRTester/Faberland%20Demo%20v1.7z"

  const handleDownload = async () => {
    setIsDownloading(true)

    // Track immediately on client-side for instant analytics
    track('VR_Demo_Download_Click', {
      file: 'Faberland_Demo_v1.7z',
      version: 'v1',
      source: 'download_counter_component',
      timestamp: new Date().toISOString()
    })

    try {
      // Track the download with server-side analytics
      await fetch('/api/track-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'VR_Demo_Download',
          metadata: {
            version: 'v1',
            file_type: 'vr_demo',
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            source: 'download_counter_component'
          }
        })
      })
    } catch (error) {
      console.error('Error tracking download:', error)
      // Continue with download even if tracking fails
    }

    // Create an anchor element and trigger download
    const link = document.createElement("a")
    link.href = downloadUrl
    link.setAttribute("download", "Faberland_Demo_v1.7z")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Refresh the download count from the server
    setTimeout(async () => {
      try {
        const response = await fetch('/api/track-download')
        if (response.ok) {
          const data = await response.json()
          setDownloadCount(data.downloadCount || 0)
        }
      } catch (error) {
        console.error('Error refreshing download count:', error)
      }
      setIsDownloading(false)
    }, 1500)
  }

  useEffect(() => {
    // Fetch real download count from API
    const fetchDownloadCount = async () => {
      try {
        const response = await fetch('/api/track-download')
        if (response.ok) {
          const data = await response.json()
          setDownloadCount(data.downloadCount || 0)
        } else {
          console.error('Error fetching download count:', response.statusText)
          setDownloadCount(0)
        }
      } catch (error) {
        console.error('Error fetching download count:', error)
        setDownloadCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDownloadCount()
    
    // Refresh count every 30 seconds to get real-time updates
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/track-download')
        if (response.ok) {
          const data = await response.json()
          setDownloadCount(data.downloadCount || 0)
        }
      } catch (error) {
        console.error('Error refreshing download count:', error)
      }
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
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-3 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors border-0"
            variant="ghost"
            size="icon"
          >
            <Download className={`h-6 w-6 ${isDownloading ? 'animate-pulse' : ''}`} />
          </Button>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-white">Faberland Demo Downloads</h3>
        
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
