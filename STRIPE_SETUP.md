# Stripe Integration Setup Guide

## Environment Variables

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

## Stripe Dashboard Setup

### 1. Get Your API Keys
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers → API keys
3. Copy your Publishable key and Secret key
4. Add them to your `.env.local` file

### 2. Set Up Webhooks
1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
5. Copy the webhook signing secret and add it to your `.env.local` file

### 3. Create Products (Optional)
You can create specific products in Stripe for different rental terms, or let the system create them dynamically.

## How It Works

### Current Flow:
1. User selects a Faberplot and rental term
2. User enters email address
3. System creates Stripe checkout session
4. User is redirected to Stripe checkout
5. After payment, user is redirected back to dashboard
6. Webhook processes the successful payment
7. Plot is marked as rented

### Features:
- ✅ Real payment processing
- ✅ Recurring subscriptions
- ✅ Automatic renewals
- ✅ Failed payment handling
- ✅ Webhook-based updates
- ✅ Email notifications (via Stripe)

## Testing

### Test Cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### Test Mode:
- All transactions are in test mode by default
- No real charges will be made
- Use test API keys for development

## Production Deployment

1. Switch to live API keys in production
2. Update webhook endpoint URL
3. Set up proper error handling
4. Add database integration for rental tracking
5. Implement email notifications
6. Add subscription management dashboard

## Next Steps

1. **Database Integration**: Replace localStorage with a real database
2. **User Authentication**: Add user accounts and login system
3. **Subscription Management**: Create dashboard for managing rentals
4. **Email Notifications**: Set up automated emails for rental events
5. **Analytics**: Add revenue tracking and analytics
