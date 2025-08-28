# Faberland Rental Process Documentation

## Overview

The Faberland rental process is a comprehensive system that handles virtual real estate rentals from selection to payment to database persistence. This document outlines the complete flow and ensures data integrity throughout the process.

## Process Flow

### 1. User Selection (`app/faberplot/[id]/page.tsx`)
- User selects a Faberplot and rental term (monthly/quarterly/yearly)
- System validates:
  - Wallet connection
  - Email format
  - Plot availability
- Calls `redirectToCheckout()` with validated data

### 2. Checkout Creation (`app/api/create-checkout-session/route.ts`)
- Validates all input parameters
- Checks plot availability using `PlotDatabase.isPlotSoldSync()`
- Creates Stripe checkout session with metadata:
  - `plotId`: Plot identifier
  - `plotName`: Plot name
  - `selectedTerm`: Rental term (monthly/quarterly/yearly)
  - `monthlyRent`: Monthly rental price
  - `userAddress`: Wallet address
  - `userEmail`: User email
  - `isRenewal`: Whether this is a renewal
- Redirects user to Stripe checkout

### 3. Payment Processing
#### Production: Webhook (`app/api/webhooks/stripe/route.ts`)
- Stripe sends webhook on successful payment
- System extracts metadata from session
- Validates rental term and user data
- Calls appropriate database method:
  - `PlotDatabase.markPlotAsSold()` for new rentals
  - `PlotDatabase.extendPlotRental()` for renewals

#### Development: Direct Processing (`app/api/process-rental/route.ts`)
- Used when webhooks don't work (localhost)
- Called directly from dashboard success redirect
- Performs same validation and database operations

### 4. Database Operations (`lib/database.ts`)
- `markPlotAsSold()`: Marks plot as sold with:
  - Correct rental term
  - Calculated end date based on term
  - User wallet address and email
  - Timestamp
- Persists data to Redis (production) or file (development)
- Handles data integrity and error recovery

### 5. Dashboard Display (`app/dashboard/page.tsx`)
- Fetches user plots via `/api/user-plots`
- Displays rental information:
  - Rental term (monthly/quarterly/yearly)
  - Time remaining
  - Plot details
- Real-time countdown updates

## Data Validation

### Input Validation
- **Plot ID**: Must be valid number
- **Rental Term**: Must be 'monthly', 'quarterly', or 'yearly'
- **Email**: Must contain '@' symbol
- **Wallet Address**: Must be valid Ethereum address format
- **Plot Availability**: Must not be already sold

### Database Validation
- **Rental End Date**: Calculated correctly based on term
- **User Data**: Wallet address and email stored correctly
- **Persistence**: Data saved to appropriate storage (Redis/file)
- **Retrieval**: User plots fetched correctly

## Error Handling

### Checkout Errors
- Missing required fields
- Invalid rental term
- Plot already sold
- Invalid email format
- Missing wallet address

### Payment Errors
- Stripe webhook signature verification
- Missing metadata
- Database operation failures
- Invalid rental term in webhook

### Database Errors
- Redis connection failures
- File system errors
- Data corruption
- Persistence failures

## Testing

### Test Endpoint (`app/api/test-rental-process/route.ts`)
Comprehensive test that verifies:
1. Initial state validation
2. Plot marking as sold
3. Rental term correctness
4. End date calculation
5. User data storage
6. User plots retrieval
7. Data persistence

### Manual Testing
1. Select plot and rental term
2. Complete Stripe checkout
3. Verify dashboard display
4. Check database persistence
5. Test renewal process

## Monitoring and Logging

### Logging Points
- Checkout session creation
- Webhook processing
- Database operations
- Error conditions
- Success confirmations

### Key Metrics
- Successful rentals per term
- Failed payments
- Database errors
- User experience issues

## Security Considerations

### Data Protection
- Wallet addresses encrypted in transit
- Email addresses validated
- Payment data handled by Stripe
- Database access controlled

### Fraud Prevention
- Plot availability checks
- Duplicate rental prevention
- Payment verification
- Webhook signature validation

## Troubleshooting

### Common Issues
1. **Plot not appearing in dashboard**: Check database persistence
2. **Wrong rental term**: Verify metadata in Stripe session
3. **Payment not processed**: Check webhook configuration
4. **Database errors**: Verify Redis/file system access

### Debug Steps
1. Check server logs for errors
2. Verify Stripe webhook configuration
3. Test database connectivity
4. Validate input data
5. Use test endpoint for verification

## Future Enhancements

### Planned Improvements
- Email notifications
- Rental history tracking
- Automatic renewals
- Payment failure handling
- Analytics dashboard

### Scalability Considerations
- Database optimization
- Caching strategies
- Load balancing
- Monitoring improvements

## Conclusion

The Faberland rental process is designed to be robust, secure, and user-friendly. With comprehensive validation, error handling, and testing, it ensures a smooth experience for users while maintaining data integrity throughout the entire process.
