import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const plotId = searchParams.get('plotId')
    
    if (!plotId) {
      return NextResponse.json({ error: 'Plot ID is required' }, { status: 400 })
    }
    
    const plotIdNum = parseInt(plotId)
    
    // Generate the same image URL logic as in checkout
    const imageUrl = plotIdNum % 8 === 0 ? "/images/faberge-eggs/crystal-amber.jpeg" :
                    plotIdNum % 8 === 1 ? "/images/faberge-eggs/amber-glow.png" :
                    plotIdNum % 8 === 2 ? "/images/faberge-eggs/ruby-red.png" :
                    plotIdNum % 8 === 3 ? "/images/faberge-eggs/emerald-green.png" :
                    plotIdNum % 8 === 4 ? "/images/faberge-eggs/bronze-glow.png" :
                    plotIdNum % 8 === 5 ? "/images/faberge-eggs/rose-quartz.jpeg" :
                    plotIdNum % 8 === 6 ? "/images/faberge-eggs/sapphire-blue.png" :
                    "/images/faberge-eggs/fire-opal.png"
    
    const fullImageUrl = `${request.nextUrl.origin}${imageUrl}`
    
    return NextResponse.json({
      plotId: plotIdNum,
      imageUrl,
      fullImageUrl,
      accessible: true
    })
    
  } catch (error) {
    console.error('Test image: Error:', error)
    return NextResponse.json({ error: 'Failed to test image' }, { status: 500 })
  }
}
