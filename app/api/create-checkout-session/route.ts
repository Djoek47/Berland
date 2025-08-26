import { NextRequest, NextResponse } from 'next/server'
import { stripe, calculateAmount } from '@/lib/stripe'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plotId, plotName, selectedTerm, monthlyRent, userEmail, userAddress, isRenewal, currentEndDate, plotImage } = body

    // Validate required fields
    if (!plotId || !plotName || !monthlyRent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if plot is already sold (for new rentals)
    const isSold = PlotDatabase.isPlotSoldSync(plotId)
    console.log(`Checkout: Plot ${plotId} sold status:`, isSold)
    console.log(`Checkout: All sold plots:`, PlotDatabase.getSoldPlotsSync())
    
    if (!isRenewal && isSold) {
      return NextResponse.json(
        { error: 'Plot is already sold' },
        { status: 400 }
      )
    }

    // Validate wallet address for new rentals
    if (!isRenewal && !userAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required for new rentals' },
        { status: 400 }
      )
    }

    // Use provided selectedTerm or default to monthly for renewals
    const term = selectedTerm || 'monthly'

    // Calculate the amount in cents
    const amount = calculateAmount(monthlyRent, term)

    // Use provided plot image or generate based on plot ID
    const imageUrl = plotImage || (plotId % 8 === 0 ? "/images/faberge-eggs/crystal-amber.jpeg" :
                     plotId % 8 === 1 ? "/images/faberge-eggs/amber-glow.png" :
                     plotId % 8 === 2 ? "/images/faberge-eggs/ruby-red.png" :
                     plotId % 8 === 3 ? "/images/faberge-eggs/emerald-green.png" :
                     plotId % 8 === 4 ? "/images/faberge-eggs/bronze-glow.png" :
                     plotId % 8 === 5 ? "/images/faberge-eggs/rose-quartz.jpeg" :
                     plotId % 8 === 6 ? "/images/faberge-eggs/sapphire-blue.png" :
                     "/images/faberge-eggs/fire-opal.png")

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isRenewal ? `${plotName} - Renewal` : `${plotName} - ${term} rental`,
              description: isRenewal ? `Renewal for ${plotName} on ${term} basis` : `Rental for ${plotName} on ${term} basis`,
              images: [`${request.nextUrl.origin}${imageUrl}`],
              metadata: {
                plotId: plotId.toString(),
                plotName,
                selectedTerm: term,
                monthlyRent: monthlyRent.toString(),
                isRenewal: isRenewal ? 'true' : 'false',
                currentEndDate: currentEndDate || '',
              },
            },
            unit_amount: amount,
            recurring: term === 'monthly' ? { interval: 'month' } :
                      term === 'quarterly' ? { interval: 'month', interval_count: 3 } :
                      { interval: 'year' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&plot_id=${plotId}&renewal=${isRenewal ? 'true' : 'false'}`,
      cancel_url: isRenewal ? `${request.nextUrl.origin}/dashboard?canceled=true` : `${request.nextUrl.origin}/faberplot/${plotId}?canceled=true`,
      customer_email: userEmail,
      // Add custom text and styling
      custom_text: {
        submit: {
          message: isRenewal 
            ? `Renew your ${term} rental for ${plotName}. You'll be charged ${term === 'monthly' ? 'monthly' : term === 'quarterly' ? 'every 3 months' : 'annually'}.`
            : `Complete your ${term} rental for ${plotName}. You'll be charged ${term === 'monthly' ? 'monthly' : term === 'quarterly' ? 'every 3 months' : 'annually'}.`,
        },
      },
      metadata: {
        plotId: plotId.toString(),
        plotName,
        selectedTerm: term,
        monthlyRent: monthlyRent.toString(),
        userAddress: userAddress || '',
        isRenewal: isRenewal ? 'true' : 'false',
        currentEndDate: currentEndDate || '',
      },
      subscription_data: {
        metadata: {
          plotId: plotId.toString(),
          plotName,
          selectedTerm: term,
          monthlyRent: monthlyRent.toString(),
          isRenewal: isRenewal ? 'true' : 'false',
          currentEndDate: currentEndDate || '',
        },
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
