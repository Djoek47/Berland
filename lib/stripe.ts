import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Price IDs for different rental terms (you'll need to create these in your Stripe dashboard)
export const STRIPE_PRICE_IDS = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_monthly_placeholder',
  quarterly: process.env.STRIPE_QUARTERLY_PRICE_ID || 'price_quarterly_placeholder', 
  yearly: process.env.STRIPE_YEARLY_PRICE_ID || 'price_yearly_placeholder',
}

// Helper function to get price ID based on term and monthly rent
export const getPriceId = (term: 'monthly' | 'quarterly' | 'yearly', monthlyRent: number) => {
  // For now, we'll use the base price IDs and adjust the amount
  // In production, you might want to create dynamic prices or use different price IDs for different rent ranges
  return STRIPE_PRICE_IDS[term]
}

// Helper function to calculate amount in cents
export const calculateAmount = (monthlyRent: number, term: 'monthly' | 'quarterly' | 'yearly') => {
  const multiplier = term === 'monthly' ? 1 : term === 'quarterly' ? 3 : 12
  const discount = term === 'quarterly' ? 0.1 : term === 'yearly' ? 0.2 : 0
  const totalAmount = monthlyRent * multiplier * (1 - discount)
  return Math.round(totalAmount * 100) // Convert to cents
}
