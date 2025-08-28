# Environment Variables Setup Guide

## Critical Issue: Thirdweb Authentication Error

**The 401 Unauthorized error from Thirdweb is causing wallet disconnection after payment, which prevents rentals from showing in the dashboard.**

## Required Environment Variables

Create a `.env.local` file in your project root with ALL the following variables:

```bash
# Stripe Configuration (Required for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Thirdweb Configuration (CRITICAL - Fixes 401 errors)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here

# Database Configuration (Required for data persistence)
REDIS_URL=redis://your_redis_url_here

# Optional: Specific price IDs for different rental terms
# STRIPE_MONTHLY_PRICE_ID=price_monthly_placeholder
# STRIPE_QUARTERLY_PRICE_ID=price_quarterly_placeholder
# STRIPE_YEARLY_PRICE_ID=price_yearly_placeholder
```

## How to Get Thirdweb Client ID

1. **Go to [Thirdweb Dashboard](https://thirdweb.com/dashboard)**
2. **Sign in or create an account**
3. **Create a new project or select existing project**
4. **Go to Settings → API Keys**
5. **Copy your Client ID**
6. **Add it to your `.env.local` file**

## Testing the Fix

1. **Add the Thirdweb Client ID to `.env.local`**
2. **Restart your development server:**
   ```bash
   npm run dev
   ```
3. **Test the rental process:**
   - Rent a plot
   - Check if wallet stays connected
   - Verify plot appears in dashboard immediately

## Debugging Steps

If you still see 401 errors:

1. **Check browser console for Thirdweb warnings**
2. **Verify Client ID is correct**
3. **Clear browser cache and cookies**
4. **Try in incognito/private mode**
5. **Use the Debug Database button in dashboard**

## Common Issues

### Issue: "NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set"
**Solution:** Add the Client ID to your `.env.local` file

### Issue: 401 Unauthorized errors
**Solution:** Verify the Client ID is correct and restart the server

### Issue: Wallet disconnects after payment
**Solution:** This should be fixed by adding the Thirdweb Client ID

### Issue: Rentals don't show in dashboard
**Solution:** Use the Debug Database button to check if data is being saved

## Production Deployment

For production deployment:

1. **Add all environment variables to your hosting platform (Vercel, etc.)**
2. **Use production Stripe keys (not test keys)**
3. **Use production Thirdweb Client ID**
4. **Set up proper Redis database**

## Security Notes

- ✅ `.env.local` is already in `.gitignore`
- ✅ Public variables are prefixed with `NEXT_PUBLIC_`
- ✅ Private variables are server-side only
- ✅ No secrets are exposed to the client

## Verification Checklist

- [ ] Thirdweb Client ID added to `.env.local`
- [ ] Stripe keys configured
- [ ] Redis URL configured
- [ ] Development server restarted
- [ ] Wallet connection stable
- [ ] Rentals appear in dashboard
- [ ] No 401 errors in console

**This should fix the rental display issue!** 🛡️⚔️
