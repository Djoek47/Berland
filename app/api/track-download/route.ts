import { NextRequest, NextResponse } from 'next/server'
import { track } from '@vercel/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, metadata } = body

    // Track the download event with Vercel Analytics
    track('demo_download', {
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ...metadata
    })

    // Also track a custom event for our counter
    track('faberland_demo_download', {
      download_type: 'vr_demo',
      version: 'v1',
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Download tracked successfully',
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
  // Return download count (this would need to be implemented with a database)
  // For now, we'll return a placeholder that can be updated
  return NextResponse.json({ 
    downloadCount: 0, // This will be updated when we have analytics data
    message: 'Download counter endpoint'
  })
}
