# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Configure Backend URL
Open `/config/api.js` and set your backend URL:

```javascript
export const API_BASE_URL = 'http://localhost:3000';  // or your production URL
```

### Step 2: Start Backend
```bash
cd web-foodorder
npm install
npm start
```

### Step 3: Test Mini Program
1. Open WeChat Developer Tools
2. Import this project
3. Enable "Do not verify valid domain" (for local testing)
4. Test the forms!

---

## 📱 Pages Overview

### 1. Food Delivery (`pages/foodDelivery`)
- 16 food type options
- Address validation
- Custom country/city support
- Multi-language (中文/English)

### 2. Online Shopping (`pages/onlineShopping`)
- 7 product type options
- Same address validation
- Multi-language support

### 3. Instructions (`pages/instructions`)
- Usage guide
- Order process explanation

### 4. About Us (`pages/aboutUs`)
- Company information
- Service description

---

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `/config/api.js` | **Configure backend URL here** |
| `/config/i18n.js` | All translations |
| `/config/regions_food.js` | Food delivery regions |
| `/config/regions_shopping.js` | Shopping regions |

---

## ✅ What's Working

- ✅ Multi-language (Chinese/English)
- ✅ Address validation
- ✅ Form submission to Supabase
- ✅ Custom country/city input
- ✅ Food/Product type selection
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

---

## 🎯 Testing Checklist

Quick test:
1. [ ] Select a country and city
2. [ ] Fill in address details
3. [ ] Click "验证地址" (Validate Address)
4. [ ] See success message
5. [ ] Select food/product type
6. [ ] Fill in contact info
7. [ ] Click "提交订单" (Submit Order)
8. [ ] Check Supabase for new order

---

## 🐛 Common Issues

**"Request failed"**
→ Check if backend is running on the correct port

**"Address validation failed"**
→ Verify `/api/validate-address` endpoint is accessible

**"Submit failed"**
→ Check Supabase credentials in backend `.env`

---

## 📚 Full Documentation

- **Setup Guide**: `MINI-PROGRAM-SETUP.md`
- **Update Summary**: `UPDATE-SUMMARY.md`
- **This File**: `QUICK-START.md`

---

## 🎨 Design Colors

- Primary: `#1e3a5f` (Navy)
- Success: `#16a34a` (Green)
- Error: `#dc2626` (Red)
- Background: `#f0f2f5` (Light Gray)

---

**Need Help?** Check the detailed guides in the root directory!

