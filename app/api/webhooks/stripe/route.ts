import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  console.log('Webhook received:', { signature: !!signature, bodyLength: body.length })

  if (!signature) {
    console.error('Webhook Error: No signature found')
    return NextResponse.json(
      { error: 'No signature found' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log('Webhook event verified:', event.type)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    console.log('Processing webhook event:', event.type)
    
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    console.log('Webhook processed successfully')
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: any) {
  console.log('Webhook: Checkout completed session:', session.id)
  console.log('Webhook: Session metadata:', session.metadata)
  
  // Extract metadata
  const { plotId, plotName, selectedTerm, monthlyRent, userAddress, isRenewal } = session.metadata
  
  if (!plotId || !userAddress) {
    console.error('Webhook Error: Missing required metadata', { plotId, userAddress, metadata: session.metadata })
    return
  }
  
  try {
    if (isRenewal === 'true') {
      // Handle renewal - extend existing rental
      console.log(`Webhook: Extending plot ${plotId} rental for ${userAddress} for ${selectedTerm}`)
      
      PlotDatabase.extendPlotRental(
        parseInt(plotId),
        selectedTerm as 'monthly' | 'quarterly' | 'yearly'
      )
    } else {
      // Handle new rental - mark as sold
      console.log(`Webhook: Marking plot ${plotId} as sold to ${userAddress} for ${selectedTerm}`)
      
      PlotDatabase.markPlotAsSold(
        parseInt(plotId), 
        userAddress, 
        session.customer_email || 'unknown@email.com',
        selectedTerm as 'monthly' | 'quarterly' | 'yearly'
      )
    }
    
    // Verify the plot was marked as sold
    const isSold = PlotDatabase.isPlotSoldSync(parseInt(plotId))
    console.log(`Webhook: Plot ${plotId} sold status after marking:`, isSold)
    
    // Get current database state
    const soldPlots = PlotDatabase.getSoldPlotsSync()
    console.log(`Webhook: Total sold plots in database:`, soldPlots.length)
    console.log(`Webhook: Sold plots:`, soldPlots.map(p => ({ id: p.id, soldTo: p.soldTo })))
    
    // Persist database to file
    try {
      const persistResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/persist-database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (persistResponse.ok) {
        console.log('Webhook: Database persisted successfully')
      } else {
        console.error('Webhook: Failed to persist database')
      }
    } catch (error) {
      console.error('Webhook: Error persisting database:', error)
    }
    
    console.log(`Webhook: Successfully processed plot ${plotId} (${plotName}) for ${userAddress}`)
    console.log(`Webhook: Customer: ${session.customer_email}`)
    console.log(`Webhook: Subscription ID: ${session.subscription}`)
    
  } catch (error) {
    console.error('Webhook Error processing checkout completion:', error)
  }
}

async function handlePaymentSucceeded(invoice: any) {
  console.log('Webhook: Payment succeeded:', invoice.id)
  
  // Handle successful recurring payment
  // Update rental status, extend rental period, etc.
}

async function handlePaymentFailed(invoice: any) {
  console.log('Webhook: Payment failed:', invoice.id)
  
  // Handle failed payment
  // Send notification to user, update rental status, etc.
}

async function handleSubscriptionCancelled(subscription: any) {
  console.log('Webhook: Subscription cancelled:', subscription.id)
  
  // Handle subscription cancellation
  // Mark plot as available, update rental status, etc.
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log('Webhook: Subscription updated:', subscription.id)
  
  // Handle subscription updates
  // Update rental terms, pricing, etc.
}
