import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { PlotDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
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
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
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
  console.log('Checkout completed:', session.id)
  
  // Extract metadata
  const { plotId, plotName, selectedTerm, monthlyRent, userAddress } = session.metadata
  
  try {
    // Mark the plot as sold in the database
    if (plotId && userAddress) {
      PlotDatabase.markPlotAsSold(
        parseInt(plotId), 
        userAddress, 
        session.customer_email || 'unknown@email.com',
        selectedTerm as 'monthly' | 'quarterly' | 'yearly'
      )
      console.log(`Plot ${plotId} (${plotName}) marked as sold to ${userAddress} for ${selectedTerm}`)
    }
    
    console.log(`Customer: ${session.customer_email}`)
    console.log(`Subscription ID: ${session.subscription}`)
    
  } catch (error) {
    console.error('Error processing checkout completion:', error)
  }
}

async function handlePaymentSucceeded(invoice: any) {
  console.log('Payment succeeded:', invoice.id)
  
  // Handle successful recurring payment
  // Update rental status, extend rental period, etc.
}

async function handlePaymentFailed(invoice: any) {
  console.log('Payment failed:', invoice.id)
  
  // Handle failed payment
  // Send notification to user, update rental status, etc.
}

async function handleSubscriptionCancelled(subscription: any) {
  console.log('Subscription cancelled:', subscription.id)
  
  // Handle subscription cancellation
  // Mark plot as available, update rental status, etc.
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log('Subscription updated:', subscription.id)
  
  // Handle subscription updates
  // Update rental terms, pricing, etc.
}
