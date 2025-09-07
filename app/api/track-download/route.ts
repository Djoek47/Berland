import { NextRequest, NextResponse } from 'next/server'
import { track } from '@vercel/analytics'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, metadata } = body

    // Get client IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Record the download in our database
    await PlotDatabase.recordDownload(
      request.headers.get('user-agent') || 'unknown',
      ipAddress
    )

    // Track the download event with Vercel Analytics - multiple events for better visibility
    track('VR_Demo_Download', {
      file: 'Faberland_Demo_v1.7z',
      version: 'v1',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ipAddress: ipAddress,
      ...metadata
    })

    // Track as a conversion event
    track('Download_Conversion', {
      product: 'Faberland VR Demo',
      file_size: '7z',
      download_source: 'business_advantages_page',
      timestamp: new Date().toISOString()
    })

    // Track as a custom event for detailed analytics
    track('Faberland_Demo_Downloaded', {
      download_type: 'vr_demo',
      version: 'v1',
      file_name: 'Faberland_Demo_v1.7z',
      timestamp: new Date().toISOString(),
      success: true
    })

    // Get the current download count
    const downloadCount = await PlotDatabase.getDownloadCount()

    return NextResponse.json({ 
      success: true, 
      message: 'Download tracked successfully',
      downloadCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking download:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track download' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get the current download count from database
    const downloadCount = await PlotDatabase.getDownloadCount()
    
    return NextResponse.json({ 
      downloadCount,
      message: 'Download counter endpoint'
    })
  } catch (error) {
    console.error('Error getting download count:', error)
    return NextResponse.json(
      { downloadCount: 0, error: 'Failed to get download count' },
      { status: 500 }
    )
  }
}
