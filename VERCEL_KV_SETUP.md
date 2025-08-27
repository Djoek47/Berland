# Vercel KV Setup Guide

## Step 1: Create Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`berland`)
3. Go to **Settings** → **Storage**
4. Click **Create Database** → **KV**
5. Choose a name (e.g., `faberland-kv`)
6. Select a region (choose closest to your users)
7. Click **Create**

## Step 2: Add Environment Variables

After creating the KV database, Vercel will provide environment variables. Add these to your project:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables (copy from Vercel KV setup):

```
KV_URL=your_kv_url_here
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token_here
```

3. Make sure to select **Production** and **Preview** environments
4. Click **Save**

## Step 3: Deploy

After adding the environment variables:

1. Commit and push your changes
2. Vercel will automatically redeploy with the new environment variables
3. The database will now work permanently in production!

## Step 4: Test

1. Try renting a plot on production
2. Check that it appears in your dashboard
3. Verify that the data persists across server restarts

## Troubleshooting

If you see errors about KV not being initialized:

1. Check that all environment variables are set correctly
2. Ensure the variables are available in Production environment
3. Redeploy the project after adding environment variables

## Database Structure

The KV database will store:
- Key: `faberland_plots`
- Value: Array of plot objects with rental information

This provides:
- ✅ **Permanent storage** (no data loss on server restart)
- ✅ **Global consistency** (all users see same data)
- ✅ **Fast access** (Redis-based)
- ✅ **Automatic scaling** (handled by Vercel)
