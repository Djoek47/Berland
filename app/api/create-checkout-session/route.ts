import { NextRequest, NextResponse } from 'next/server'
import { stripe, calculateAmount } from '@/lib/stripe'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plotId, plotName, selectedTerm, monthlyRent, userEmail, userAddress, isRenewal, currentEndDate, plotImage } = body

    // Enhanced validation
    if (!plotId || !plotName || !monthlyRent) {
      console.error('Checkout: Missing required fields:', { plotId, plotName, monthlyRent })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rental term
    if (selectedTerm && !['monthly', 'quarterly', 'yearly'].includes(selectedTerm)) {
      console.error('Checkout: Invalid rental term:', selectedTerm)
      return NextResponse.json(
        { error: 'Invalid rental term' },
        { status: 400 }
      )
    }

    // Check if plot is already sold (for new rentals)
    const isSold = PlotDatabase.isPlotSoldSync(plotId)
    console.log(`Checkout: Plot ${plotId} sold status:`, isSold)
    console.log(`Checkout: All sold plots:`, PlotDatabase.getSoldPlotsSync())
    
    if (!isRenewal && isSold) {
      console.error('Checkout: Plot already sold:', plotId)
      return NextResponse.json(
        { error: 'Plot is already sold' },
        { status: 400 }
      )
    }

    // Validate wallet address for new rentals
    if (!isRenewal && !userAddress) {
      console.error('Checkout: Missing wallet address for new rental')
      return NextResponse.json(
        { error: 'Wallet address is required for new rentals' },
        { status: 400 }
      )
    }

    // Validate email format
    if (userEmail && !userEmail.includes('@')) {
      console.error('Checkout: Invalid email format:', userEmail)
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Use provided selectedTerm or default to monthly for renewals
    const term = selectedTerm || 'monthly'

    // Calculate the amount in cents
    const amount = calculateAmount(monthlyRent, term)

    // Use provided plot image or generate based on plot ID
    const imageUrl = plotImage

    console.log('Checkout: Creating session with metadata:', { plotId, plotName, selectedTerm: term, userAddress, amount })
    
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
                userAddress: userAddress || '', // Ensure userAddress is included
              },
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // Changed from subscription to payment for immediate processing
      success_url: `${request.nextUrl.origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&plot_id=${plotId}&renewal=${isRenewal ? 'true' : 'false'}&term=${term}`,
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
        isRenewal: isRenewal ? 'true' : 'false',
        currentEndDate: currentEndDate || '',
        userAddress: userAddress || '', // Ensure userAddress is included
      },
    })

    console.log('Checkout: Session created successfully:', session.id)
    return NextResponse.json({ sessionId: session.id, url: session.url })

  } catch (error) {
    console.error('Checkout: Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
