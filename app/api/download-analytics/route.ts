import { NextResponse } from 'next/server'
import { PlotDatabase } from '@/lib/database'

export async function GET() {
  try {
    // Get download count and recent downloads
    const downloadCount = await PlotDatabase.getDownloadCount()
    const recentDownloads = await PlotDatabase.getRecentDownloads(20)
    
    return NextResponse.json({
      totalDownloads: downloadCount,
      recentDownloads: recentDownloads,
      analytics: {
        downloadsToday: recentDownloads.filter(d => {
          const today = new Date()
          const downloadDate = new Date(d.timestamp)
          return downloadDate.toDateString() === today.toDateString()
        }).length,
        downloadsThisWeek: recentDownloads.filter(d => {
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          const downloadDate = new Date(d.timestamp)
          return downloadDate >= weekAgo
        }).length,
        uniqueUserAgents: [...new Set(recentDownloads.map(d => d.userAgent))].length
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error getting download analytics:', error)
    return NextResponse.json(
      { error: 'Failed to get download analytics' },
      { status: 500 }
    )
  }
}
