# Environment Variables Setup

## Create .env.local file

Create a `.env.local` file in your project root with the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Optional: Specific price IDs for different rental terms
# STRIPE_MONTHLY_PRICE_ID=price_monthly_placeholder
# STRIPE_QUARTERLY_PRICE_ID=price_quarterly_placeholder
# STRIPE_YEARLY_PRICE_ID=price_yearly_placeholder
```

## Get Your Stripe Keys

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers → API keys
3. Copy your Publishable key and Secret key
4. Replace the placeholder values in your `.env.local` file

## Test the Integration

Once you've added your Stripe keys, you can test the integration:

1. Start your development server: `npm run dev`
2. Navigate to a Faberplot page (e.g., `/faberplot/1`)
3. Enter an email address
4. Click "Rent with Card"
5. You should be redirected to Stripe checkout

## Test Cards

Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`
