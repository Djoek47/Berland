import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

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
  const { plotId, plotName, selectedTerm, monthlyRent } = session.metadata
  
  // Mark the plot as sold in localStorage (for now)
  // In production, this would be stored in a database
  try {
    // This is a server-side function, so we can't directly access localStorage
    // In a real implementation, you would:
    // 1. Store the rental in your database
    // 2. Mark the plot as unavailable
    // 3. Send confirmation email to the customer
    // 4. Update user's rental history
    
    console.log(`Plot ${plotId} (${plotName}) rented for ${selectedTerm} at $${monthlyRent}/month`)
    console.log(`Customer: ${session.customer_email}`)
    console.log(`Subscription ID: ${session.subscription}`)
    
    // For now, we'll just log the success
    // The actual plot marking will happen when the user returns to the site
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
