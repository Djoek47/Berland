import { loadStripe } from '@stripe/stripe-js'

// Load Stripe on the client side
export const getStripe = () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
  }
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}

// Create checkout session
export const createCheckoutSession = async (checkoutData: {
  plotId: number
  plotName: string
  selectedTerm: 'monthly' | 'quarterly' | 'yearly'
  monthlyRent: number
  userEmail: string
  userAddress: string // Now required
}) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId, url } = await response.json()
    return { sessionId, url }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Redirect to Stripe checkout
export const redirectToCheckout = async (checkoutData: {
  plotId: number
  plotName: string
  selectedTerm: 'monthly' | 'quarterly' | 'yearly'
  monthlyRent: number
  userEmail: string
  userAddress: string // Now required
}) => {
  try {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    const { url } = await createCheckoutSession(checkoutData)
    
    if (url) {
      window.location.href = url
    } else {
      throw new Error('No checkout URL received')
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}
