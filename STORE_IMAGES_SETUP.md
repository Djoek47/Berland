# Store Images Setup

## Overview
The faberplot images have been updated to use store images instead of Faberge eggs. The system now supports 4 stores with 2 images each (8 total images).

## Directory Structure
```
public/images/stores/
├── store1/
│   ├── store1-image1.jpg
│   └── store1-image2.jpg
├── store2/
│   ├── store2-image1.jpg
│   └── store2-image2.jpg
├── store3/
│   ├── store3-image1.jpg
│   └── store3-image2.jpg
└── store4/
    ├── store4-image1.jpg
    └── store4-image2.jpg
```

## Image Assignment Logic
- **Store 1**: Faberplot 1 only
- **Store 2**: Faberplot 2 only  
- **Store 3**: Faberplot 3 only
- **Store 4**: Faberplot 4 only
- **Faberplots 5-48**: Continue using original Faberge eggs

Only the first 4 faberplots use store images, all others maintain the original Faberge egg images.

## Files Updated
- `app/marketplace/page.tsx` - Marketplace faberplot listings
- `app/faberplot/[id]/page.tsx` - Individual faberplot detail pages
- `app/dashboard/page.tsx` - User dashboard faberplot display
- `app/manage-plot/[id]/page.tsx` - Plot management page

## Next Steps
1. Replace the placeholder files with actual store images
2. Ensure images are optimized for web (recommended: 800x600px, <200KB each)
3. Test the marketplace to verify images display correctly

## Image Requirements
- Format: JPG or PNG
- Size: Recommended 800x600px or similar aspect ratio
- File size: <200KB per image for optimal loading
- Content: Should show the store/plot environment clearly
