# WeChat Mini Program - Setup Guide

## Overview

This WeChat Mini Program has been updated to match the web version's UI, layout, and functionality. It now uses the same Supabase backend as the web application.

## What Was Updated

### 1. **API Configuration** ✅
- Updated `/config/api.js` to use the same API endpoints as the web version
- Changed validation endpoint from `/api/address/validate?type=` to `/api/validate-address`
- Maintained support for both food delivery and online shopping services

### 2. **Regions Data** ✅
- Updated `/config/regions_food.js` with Chinese + English city names (e.g., "曼谷 Bangkok")
- Updated `/config/regions_shopping.js` with the same format
- Now matches the `supported-cities.json` from the web version
- Added more cities for Indonesia, Malaysia, and other countries

### 3. **Translations (i18n)** ✅
- Completely rewrote `/config/i18n.js` to match the web version's translation structure
- Added comprehensive Chinese and English translations
- Organized translations by page type (delivery, shopping, instructions, about)
- Includes all form labels, validation messages, and UI text

### 4. **Food Delivery Page** ✅
- Updated `/pages/foodDelivery/index.wxml` with improved layout
- Added food type picker with emojis (🥤 奶茶, 🍕 披萨, etc.)
- Enhanced address preview card
- Better validation and error messaging
- Updated `/pages/foodDelivery/index.js` with food type selection logic

### 5. **Online Shopping Page** ✅
- Updated `/pages/onlineShopping/index.wxml` with matching layout
- Added product type picker (👕 服装, 💄 美妆, etc.)
- Same address validation flow as food delivery
- Updated `/pages/onlineShopping/index.js` with product type selection

### 6. **Instructions Page** ✅
- Updated `/pages/instructions/index.js` to use centralized i18n
- Content now matches the web version exactly
- Covers: ordering process, address validation, order processing flow

### 7. **About Us Page** ✅
- Updated `/pages/aboutUs/index.js` to use centralized i18n
- Content matches the web version's about section

### 8. **Styles** ✅
- Updated all `.wxss` files to match the web version's design
- Color scheme: Primary (#1e3a5f), backgrounds, borders
- Consistent spacing, border-radius, shadows
- Responsive field layouts
- Better button states and disabled styles

## Setup Instructions

### 1. Configure Backend URL

Open `/config/api.js` and set your backend URL:

```javascript
// For local development
export const API_BASE_URL = 'http://localhost:3000';

// For production (replace with your deployed URL)
export const API_BASE_URL = 'https://your-app.vercel.app';
```

### 2. Backend Requirements

Your backend (from `/web-foodorder/`) must be running and accessible. The mini program expects these endpoints:

- `POST /api/validate-address` - Validate delivery address
- `POST /api/submit-order` - Submit order to Supabase
- `GET /api/supported-countries` - Get food delivery countries
- `GET /api/supported-countries/shopping` - Get shopping countries

### 3. Environment Variables (Backend)

Make sure your backend has these environment variables set:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token (optional)
TELEGRAM_USER_ID=your_telegram_user_ids (optional)
```

### 4. WeChat Mini Program Configuration

1. Open WeChat DevTools
2. Import this project
3. Set your AppID in `project.config.json`
4. Add your backend domain to the request whitelist:
   - Go to WeChat Mini Program Admin Panel
   - Settings → Development Settings → Server Domain
   - Add your backend URL to "request valid domain"

### 5. Testing Locally

If testing with `http://localhost:3000`:

1. In WeChat DevTools, enable "Do not verify valid domain"
2. Settings → Project Settings → Local Settings
3. Check "Do not verify valid domain, web-view (business domain), TLS version and HTTPS certificate"

## API Data Flow

### Order Submission

```
Mini Program → POST /api/submit-order
↓
Backend (server-supabase.js)
↓
Validates address
↓
Generates order ID (YX + timestamp)
↓
Saves to Supabase 'orders' table
↓
Sends Telegram notification (if configured)
↓
Returns success response
```

### Address Validation

```
Mini Program → POST /api/validate-address
↓
Backend validates against supported-cities.json
↓
Returns {valid: true/false, message: "..."}
```

## Database Schema (Supabase)

The `orders` table should have these columns:

```sql
- order_id (text, primary key)
- customer_name (text)
- customer_phone (text)
- customer_wechat (text, nullable)
- country (text)
- city (text)
- district (text, nullable)
- detail_address (text)
- food_type (text)
- notes (text, nullable)
- custom_country (text, nullable)
- custom_city (text, nullable)
- status (text, default: 'pending')
- created_at (timestamp, default: now())
```

## Key Features

### ✅ Implemented
- Multi-language support (Chinese/English)
- Address validation with custom country/city support
- Food type selection (16 options)
- Product type selection (7 options)
- Form validation and error handling
- Address preview cards
- Responsive layout
- Loading states and disabled buttons
- Success/error messaging
- Form reset after successful submission

### 🔄 Uses Same Backend
- Supabase database
- Telegram notifications
- Order ID generation
- Address validation logic

## Differences from Web Version

### Minor UI Differences
1. **No flag images**: Mini programs use emoji flags instead of flag images
2. **Picker components**: WeChat uses native pickers instead of HTML selects
3. **No hover states**: Touch-based interface
4. **Simplified animations**: WeChat has limitations on CSS animations

### Functional Parity
- ✅ All form fields match
- ✅ Validation logic is identical
- ✅ API calls are the same
- ✅ Data structure matches
- ✅ Multi-language support
- ✅ Custom country/city input

## Troubleshooting

### "Request failed" errors
- Check if backend URL is correct in `/config/api.js`
- Verify backend is running
- Check WeChat DevTools console for detailed error
- Ensure domain is whitelisted in Mini Program settings

### Address validation not working
- Verify `/api/validate-address` endpoint is accessible
- Check that `supported-cities.json` exists in backend
- Look at backend logs for validation errors

### Order submission fails
- Check Supabase credentials in backend `.env`
- Verify `orders` table exists with correct schema
- Check backend logs for database errors

### Translations not showing
- Verify `/config/i18n.js` is properly imported
- Check browser/DevTools console for import errors
- Ensure language is being set correctly in storage

## Next Steps

1. **Deploy Backend**: Deploy your `/web-foodorder/` backend to Vercel, Railway, or similar
2. **Update API_BASE_URL**: Change from localhost to your production URL
3. **Whitelist Domain**: Add production domain to WeChat Mini Program settings
4. **Test End-to-End**: Submit test orders and verify they appear in Supabase
5. **Submit for Review**: Submit mini program to WeChat for approval

## Support

For issues or questions:
1. Check WeChat DevTools console for errors
2. Review backend logs
3. Verify Supabase dashboard for data
4. Check Telegram for notification delivery

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Compatible with**: Web version using Supabase backend

