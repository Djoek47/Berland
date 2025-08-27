import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PlotDatabase } from '@/lib/database'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Extract metadata
        const plotId = session.metadata?.plotId
        const userAddress = session.metadata?.userAddress
        const userEmail = session.customer_email || session.metadata?.userEmail
        const rentalTerm = session.metadata?.rentalTerm || 'monthly'
        const isRenewal = session.metadata?.renewal === 'true'

        if (!plotId || !userAddress || !userEmail) {
          console.error('Missing required metadata in webhook')
          return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
        }

        console.log('Webhook: Processing checkout completion for plot:', plotId)

        if (isRenewal) {
          // Extend existing rental
          await PlotDatabase.extendPlotRental(parseInt(plotId), rentalTerm as 'monthly' | 'quarterly' | 'yearly')
          console.log('Webhook: Plot rental extended')
        } else {
          // Mark plot as sold
          await PlotDatabase.markPlotAsSold(parseInt(plotId), userAddress, userEmail, rentalTerm as 'monthly' | 'quarterly' | 'yearly')
          console.log('Webhook: Plot marked as sold')
        }

        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
