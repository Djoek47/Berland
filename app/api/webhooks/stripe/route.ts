import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PlotDatabase } from '@/lib/database'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook: Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    console.log('Webhook: Processing event:', event.type)
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Extract metadata with enhanced validation
        const plotId = session.metadata?.plotId
        const userAddress = session.metadata?.userAddress
        const userEmail = session.customer_email || session.metadata?.userEmail
        const rentalTerm = session.metadata?.selectedTerm || session.metadata?.rentalTerm || 'monthly'
        const isRenewal = session.metadata?.isRenewal === 'true'

        console.log('Webhook: Extracted metadata:', { plotId, userAddress, userEmail, rentalTerm, isRenewal })

        if (!plotId || !userAddress || !userEmail) {
          console.error('Webhook: Missing required metadata:', { plotId, userAddress, userEmail })
          return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
        }

        // Validate rental term
        if (!['monthly', 'quarterly', 'yearly'].includes(rentalTerm)) {
          console.error('Webhook: Invalid rental term:', rentalTerm)
          return NextResponse.json({ error: 'Invalid rental term' }, { status: 400 })
        }

        console.log('Webhook: Processing checkout completion for plot:', plotId)

        try {
          if (isRenewal) {
            // Extend existing rental
            await PlotDatabase.extendPlotRental(parseInt(plotId), rentalTerm as 'monthly' | 'quarterly' | 'yearly')
            console.log('Webhook: Plot rental extended successfully')
          } else {
            // Mark plot as sold
            await PlotDatabase.markPlotAsSold(parseInt(plotId), userAddress, userEmail, rentalTerm as 'monthly' | 'quarterly' | 'yearly')
            console.log('Webhook: Plot marked as sold successfully')
          }
        } catch (dbError) {
          console.error('Webhook: Database operation failed:', dbError)
          return NextResponse.json({ error: 'Database operation failed' }, { status: 500 })
        }

        // Log successful processing
        console.log('Webhook: Successfully processed checkout completion')
        break

      case 'payment_intent.succeeded':
        console.log('Webhook: Payment intent succeeded')
        break

      case 'payment_intent.payment_failed':
        console.log('Webhook: Payment intent failed')
        break

      default:
        console.log('Webhook: Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook: Error processing event:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
