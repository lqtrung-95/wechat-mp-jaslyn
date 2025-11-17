# TabBar Icons Setup Guide

## 🎯 Current Status

Your tabbar currently has:
- ✅ **food.png** & **food-active.png** - Good! (2.3KB each)
- ❌ **shopping.png** & **shopping-active.png** - Placeholder (75 bytes)
- ❌ **guide.png** & **guide-active.png** - Placeholder (75 bytes)
- ❌ **about.png** & **about-active.png** - Placeholder (75 bytes)

**You need to replace 6 icon files.**

---

## 🚀 Quick Solution (5 minutes)

### Method 1: Download from Iconfont (Recommended)

**Best for:** Chinese projects, free, high quality

1. **Go to:** https://www.iconfont.cn/
2. **Search for icons:**
   - Search: `购物袋` (shopping bag)
   - Search: `书籍` (book)
   - Search: `信息` (info)
3. **Download:**
   - Click icon → Download → PNG
   - Size: 128px or 256px
   - Color: Choose gray (#94a3b8) for normal, dark (#0f172a) for active
4. **Rename and save:**
   - Save to: `/assets/tabbar/`
   - Names: `shopping.png`, `shopping-active.png`, etc.

---

### Method 2: Use Feather Icons (Open Source)

**Best for:** Consistent style, free, no attribution needed

1. **Visit:** https://feathericons.com/
2. **Download these icons:**
   - **Shopping:** `shopping-bag` icon
   - **Guide:** `book` icon
   - **About:** `info` icon
3. **Convert SVG to PNG:**
   - Use: https://svgtopng.com/
   - Size: 128x128 pixels
   - Background: Transparent
4. **Create two versions:**
   - **Normal:** Gray color (#94a3b8)
   - **Active:** Dark color (#0f172a)

---

### Method 3: Use Flaticon

**Best for:** Variety of styles, free with attribution

1. **Go to:** https://www.flaticon.com/
2. **Search and download:**
   - "shopping bag outline"
   - "book outline"
   - "info circle outline"
3. **Download settings:**
   - Format: PNG
   - Size: 128px
   - Color: Customize (#94a3b8 for normal, #0f172a for active)

---

## 📐 Icon Specifications

### Size
- **Recommended:** 81x81 pixels
- **Acceptable:** 64x64 to 256x256 pixels
- WeChat will auto-scale

### Colors (Match Your Design)
```
Normal state:  #94a3b8  (light gray)
Active state:  #0f172a  (dark blue-black)
```

### Format
- **PNG** with transparency
- File size: 1-5 KB is ideal

---

## 🎨 Specific Icon Suggestions

### Shopping Icons 🛍️
**Style:** Shopping bag, basket, or cart
**Keywords:** shopping-bag, basket, cart, package
**Examples:**
- Shopping bag with handles
- Shopping cart
- Gift box or package

### Guide Icons 📖
**Style:** Book or help icon
**Keywords:** book, guide, manual, help, question
**Examples:**
- Open book
- Closed book
- Question mark in circle
- Help icon

### About Icons ℹ️
**Style:** Info or profile icon
**Keywords:** info, information, user, profile
**Examples:**
- Info circle (ℹ️ style)
- User profile silhouette
- ID card
- About/info icon

---

## 🔧 Tools for Editing Icons

### Convert SVG to PNG
- **CloudConvert:** https://cloudconvert.com/svg-to-png
- **SVG to PNG:** https://svgtopng.com/
- **Convertio:** https://convertio.co/svg-png/

### Change Icon Colors
- **Online Color Changer:** https://www.imgonline.com.ua/replace-color.php
- **Photopea (Free Photoshop):** https://www.photopea.com/
- **Remove.bg (for backgrounds):** https://www.remove.bg/

### Resize Images
- **Simple Image Resizer:** https://www.simpleimageresizer.com/
- **iLoveIMG:** https://www.iloveimg.com/resize-image

---

## 📥 Step-by-Step: Download & Install

### Step 1: Download Icons

Choose one source and download 3 icons (shopping, guide, about):

**Option A: Iconfont**
```
1. Go to https://www.iconfont.cn/
2. Search: 购物袋, 书籍, 信息
3. Download each as PNG (128px)
4. Download in 2 colors (gray and dark)
```

**Option B: Feather Icons**
```
1. Go to https://feathericons.com/
2. Download: shopping-bag.svg, book.svg, info.svg
3. Convert to PNG (128x128)
4. Create 2 versions with different colors
```

### Step 2: Prepare Files

You need **6 files total:**
```
shopping.png          (gray #94a3b8)
shopping-active.png   (dark #0f172a)
guide.png            (gray #94a3b8)
guide-active.png     (dark #0f172a)
about.png            (gray #94a3b8)
about-active.png     (dark #0f172a)
```

### Step 3: Replace Files

```bash
# Navigate to tabbar folder
cd "/Users/lequoctrung/Documents/Personal Projects/wechat-mp-jaslyn/assets/tabbar"

# Check current files
ls -lh

# Replace the placeholder files with your downloaded icons
# (drag and drop or copy/paste)

# Verify new files are larger than 75 bytes
ls -lh
```

### Step 4: Test in WeChat DevTools

1. Open WeChat Developer Tools
2. Click "Compile" or press `Cmd+R`
3. Check bottom tabbar
4. Tap each tab to see active state
5. Icons should be visible and clear

---

## 🎯 Quick Links

### Free Icon Sources
- **Iconfont:** https://www.iconfont.cn/ (Best for Chinese)
- **Feather Icons:** https://feathericons.com/ (Consistent style)
- **Flaticon:** https://www.flaticon.com/ (Variety)
- **Icons8:** https://icons8.com/ (Free with attribution)
- **Heroicons:** https://heroicons.com/ (Modern, free)
- **Material Icons:** https://fonts.google.com/icons (Google's icons)

### Conversion Tools
- **SVG to PNG:** https://svgtopng.com/
- **Color Changer:** https://www.imgonline.com.ua/replace-color.php
- **Image Resizer:** https://www.simpleimageresizer.com/

---

## 💡 Pro Tips

### Tip 1: Match Your Food Icon Style
Look at your existing `food.png` and try to find icons in the same style for consistency.

### Tip 2: Use Icon Packs
Download a complete icon pack to ensure all icons match in style:
- Feather Icons (all same style)
- Material Icons (all same style)
- Font Awesome (all same style)

### Tip 3: Test on Real Device
After replacing icons:
1. Preview in WeChat DevTools
2. Test on real phone if possible
3. Check both light and dark backgrounds

### Tip 4: Keep Originals
Save your original icon files (SVG or larger PNG) in case you need to regenerate them later.

---

## 🐛 Troubleshooting

### Icons Not Showing
- **Check file size:** Should be > 1KB (not 75 bytes)
- **Check file format:** Must be PNG
- **Check file names:** Must match exactly (case-sensitive)
- **Reload:** Click "Compile" in WeChat DevTools

### Icons Too Small/Large
- Resize to 81x81 or 128x128 pixels
- WeChat will auto-scale appropriately

### Icons Wrong Color
- Normal state: Use #94a3b8 (gray)
- Active state: Use #0f172a (dark)
- Use color replacement tool to fix

### Icons Look Blurry
- Use higher resolution (128x128 or 256x256)
- Ensure PNG has transparency
- Don't use JPEG format

---

## ✅ Final Checklist

Before you're done:

- [ ] Downloaded 3 icon types (shopping, guide, about)
- [ ] Created 2 versions each (normal + active)
- [ ] Verified file sizes are > 1KB
- [ ] Named files correctly
- [ ] Replaced files in `/assets/tabbar/`
- [ ] Reloaded WeChat DevTools
- [ ] Tested all 4 tabs
- [ ] Checked active states work
- [ ] Icons are clear and visible

---

## 🚀 Quick Start Command

Run this in terminal to open the helper script:

```bash
cd "/Users/lequoctrung/Documents/Personal Projects/wechat-mp-jaslyn/assets/tabbar"
./download-icons.sh
```

Or open the folder in Finder:

```bash
open "/Users/lequoctrung/Documents/Personal Projects/wechat-mp-jaslyn/assets/tabbar"
```

---

**Need help?** Let me know which icons you downloaded and I can help you optimize them!

**Status:** 📥 Ready to download icons
**Next Step:** Choose a source and download your icons!

