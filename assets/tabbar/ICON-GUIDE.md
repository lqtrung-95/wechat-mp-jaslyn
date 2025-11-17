# TabBar Icon Guide

## 🎨 Where to Get Free Icons

### Option 1: Iconfont (阿里巴巴图标库) - Best for Chinese Projects
**URL:** https://www.iconfont.cn/

**Steps:**
1. Search for icons:
   - Shopping: "购物" or "shopping bag"
   - Guide: "指南" or "book" or "help"
   - About: "关于" or "info" or "user"
2. Download as PNG (81x81px recommended for WeChat)
3. Choose both normal and active states (different colors)

**Recommended Colors:**
- Normal: `#94a3b8` (gray)
- Active: `#0f172a` (dark blue/black)

---

### Option 2: Flaticon
**URL:** https://www.flaticon.com/

**Search Terms:**
- Shopping: "shopping bag", "cart", "basket"
- Guide: "book", "guide", "manual", "help"
- About: "info", "information", "user", "profile"

**Download Settings:**
- Format: PNG
- Size: 128px or 256px
- Color: Can customize

---

### Option 3: Icons8
**URL:** https://icons8.com/icons

**Features:**
- Free for attribution
- Can customize color
- Multiple styles available

---

## 📐 Icon Specifications for WeChat Mini Program

### Size Requirements
- **Recommended:** 81x81 pixels
- **Acceptable:** 64x64 to 128x128 pixels
- **Format:** PNG with transparency

### Color Scheme (Match Current Design)
- **Normal State:** `#94a3b8` (light gray)
- **Active State:** `#0f172a` (dark blue-black)

### File Naming
- Normal: `[name].png`
- Active: `[name]-active.png`

---

## 🎯 Specific Icon Recommendations

### Shopping Icons
**Keywords:** shopping-bag, basket, cart, package, box
**Style:** Outline or minimal
**Example searches:**
- "shopping bag outline"
- "shopping basket icon"
- "package delivery icon"

### Guide Icons
**Keywords:** book, guide, manual, help, question-circle
**Style:** Outline
**Example searches:**
- "book outline icon"
- "guide icon"
- "manual book icon"
- "help circle icon"

### About Icons
**Keywords:** info, information, user, profile, about
**Style:** Outline or minimal
**Example searches:**
- "info circle icon"
- "information icon"
- "user profile icon"
- "about icon"

---

## 🚀 Quick Method: Use Existing Food Icons as Template

Since your `food.png` and `food-active.png` are already good (2.3KB), you can:

1. **Use the same style** - Find icons in the same style as your food icons
2. **Match the size** - Use the same dimensions
3. **Match the colors** - Use the same color scheme

---

## 💡 Alternative: Use Emoji-Style Icons

For a quick solution, you can use emoji-based icons:
- Shopping: 🛍️ or 🛒
- Guide: 📖 or 📚
- About: ℹ️ or 👤

Convert emoji to PNG using:
- https://emoji.aranja.com/
- Or screenshot and crop

---

## 📝 Installation Steps

1. Download icons from one of the sources above
2. Rename them according to the naming convention
3. Replace files in `/assets/tabbar/`
4. Reload WeChat DevTools

---

## ✅ Checklist

- [ ] Downloaded shopping.png (81x81, gray #94a3b8)
- [ ] Downloaded shopping-active.png (81x81, dark #0f172a)
- [ ] Downloaded guide.png (81x81, gray #94a3b8)
- [ ] Downloaded guide-active.png (81x81, dark #0f172a)
- [ ] Downloaded about.png (81x81, gray #94a3b8)
- [ ] Downloaded about-active.png (81x81, dark #0f172a)
- [ ] Replaced files in `/assets/tabbar/`
- [ ] Tested in WeChat DevTools

---

## 🎨 Color Conversion Tool

If you download icons in different colors, use these tools to change colors:
- **Online:** https://www.imgonline.com.ua/replace-color.php
- **Photoshop/GIMP:** Use color replacement tool
- **Command line (ImageMagick):**
  ```bash
  convert input.png -fill "#94a3b8" -opaque black output.png
  ```

---

**Need help?** Let me know which icons you downloaded and I can help you optimize them!

