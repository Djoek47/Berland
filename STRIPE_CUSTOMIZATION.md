# Stripe Checkout Customization Guide

## 🎨 Current Customizations Applied

Your Stripe checkout page now includes:

### ✅ **Logo & Branding**
- **Company Logo**: Uses `/images/faberland-logo.png`
- **Primary Color**: Amber (`#f59e0b`) - matches your theme
- **Secondary Color**: Zinc (`#18181b`) - dark background

### ✅ **Product Images**
- **Dynamic Plot Images**: Each Faberplot shows its unique image
- **Image Rotation**: 8 different Faberge egg images based on plot ID
- **High Quality**: Uses your existing image assets

### ✅ **Custom Text**
- **Submit Message**: Explains the rental terms and billing frequency
- **Clear Communication**: Users know exactly what they're paying for

## 🚀 Additional Customization Options

### 1. **Logo Requirements**
Your logo should be:
- **Format**: PNG or JPG
- **Size**: 128px × 128px minimum, 512px × 512px maximum
- **Background**: Transparent or solid color
- **File Size**: Under 1MB

### 2. **Color Customization**
You can change the colors in `app/api/create-checkout-session/route.ts`:

```typescript
branding: {
  logo_url: `${request.nextUrl.origin}/images/faberland-logo.png`,
  primary_color: '#f59e0b',    // Change this to your brand color
  secondary_color: '#18181b',  // Change this to your secondary color
},
```

### 3. **Product Image Enhancement**
To add multiple images per product:

```typescript
product_data: {
  name: `${plotName} - ${selectedTerm} rental`,
  description: `Rental for ${plotName} on ${selectedTerm} basis`,
  images: [
    `${request.nextUrl.origin}${plotImage}`,
    `${request.nextUrl.origin}/images/faberland-emblem.png`, // Additional image
  ],
  // ... other fields
},
```

### 4. **Custom Fields**
Add additional information collection:

```typescript
custom_fields: [
  {
    key: 'business_name',
    label: {
      type: 'custom',
      custom: 'Business Name (Optional)',
    },
    type: 'text',
    optional: true,
  },
  {
    key: 'special_requirements',
    label: {
      type: 'custom',
      custom: 'Special Requirements',
    },
    type: 'text',
    optional: true,
  },
],
```

### 5. **Advanced Customization Options**

#### **A. Custom Submit Button Text**
```typescript
custom_text: {
  submit: {
    message: 'Complete your Faberplot rental and start your virtual business journey!',
  },
},
```

#### **B. Add Terms and Conditions**
```typescript
custom_text: {
  terms_of_service: {
    message: 'By completing this purchase, you agree to our [Terms of Service](https://yourdomain.com/terms) and [Privacy Policy](https://yourdomain.com/privacy).',
  },
},
```

#### **C. Custom Success Page**
```typescript
success_url: `${request.nextUrl.origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&plot_id=${plotId}&custom_message=Welcome to Faberland!`,
```

## 🎯 **Recommended Enhancements**

### 1. **Add Your Logo**
Make sure you have a high-quality logo at `/public/images/faberland-logo.png`

### 2. **Create a Favicon**
Add a favicon to your public folder for better branding

### 3. **Custom Error Messages**
```typescript
custom_text: {
  submit: {
    message: 'Complete your Faberplot rental. You\'ll receive instant access to your virtual business space.',
  },
  shipping_address: {
    message: 'This is for billing purposes only. Your virtual plot will be accessible immediately.',
  },
},
```

### 4. **Add Business Information**
```typescript
// Add to your checkout session
business_profile: {
  name: 'Faberland',
  support_address: {
    line1: 'Your Business Address',
    city: 'Your City',
    state: 'Your State',
    postal_code: 'Your Postal Code',
    country: 'US',
  },
  support_email: 'support@faberland.com',
  support_phone: '+1-555-0123',
},
```

## 🔧 **Testing Your Customizations**

1. **Test in Development**: Use Stripe test mode
2. **Check Mobile**: Ensure logo displays properly on mobile
3. **Verify Colors**: Test with different browsers
4. **Image Loading**: Ensure all images load correctly

## 📱 **Mobile Optimization**

- **Logo Size**: Keep logo under 512px for mobile compatibility
- **Image Quality**: Use optimized images for faster loading
- **Color Contrast**: Ensure text is readable on mobile devices

## 🎨 **Brand Consistency**

Your current setup maintains brand consistency with:
- ✅ Amber color scheme matching your site
- ✅ Dark theme alignment
- ✅ Professional appearance
- ✅ Clear product information

## 🚀 **Next Steps**

1. **Add your logo** to `/public/images/faberland-logo.png`
2. **Test the checkout flow** with a test payment
3. **Customize colors** if needed
4. **Add any additional fields** you want to collect
5. **Test on mobile devices**

Your Stripe checkout is now fully branded and personalized for your Faberland business!
