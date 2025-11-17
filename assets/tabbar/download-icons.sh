#!/bin/bash

# TabBar Icon Download Helper Script
# This script provides direct links to download icons

echo "🎨 WeChat Mini Program TabBar Icons"
echo "===================================="
echo ""
echo "📱 Current Status:"
echo "  ✅ food.png - Already good (2.3KB)"
echo "  ✅ food-active.png - Already good (2.3KB)"
echo "  ❌ shopping.png - Needs replacement (75B placeholder)"
echo "  ❌ shopping-active.png - Needs replacement (75B placeholder)"
echo "  ❌ guide.png - Needs replacement (75B placeholder)"
echo "  ❌ guide-active.png - Needs replacement (75B placeholder)"
echo "  ❌ about.png - Needs replacement (75B placeholder)"
echo "  ❌ about-active.png - Needs replacement (75B placeholder)"
echo ""
echo "📐 Icon Specifications:"
echo "  Size: 81x81 pixels (or 64-128px)"
echo "  Format: PNG with transparency"
echo "  Normal color: #94a3b8 (gray)"
echo "  Active color: #0f172a (dark)"
echo ""
echo "🌐 Recommended Sources:"
echo ""
echo "1️⃣  Iconfont (Best for Chinese projects)"
echo "   URL: https://www.iconfont.cn/"
echo "   Search: 购物 (shopping), 指南 (guide), 关于 (about)"
echo ""
echo "2️⃣  Flaticon (Free with attribution)"
echo "   URL: https://www.flaticon.com/"
echo "   Search: 'shopping bag', 'book', 'info circle'"
echo ""
echo "3️⃣  Icons8 (Free with attribution)"
echo "   URL: https://icons8.com/icons"
echo "   Search: 'shopping', 'guide', 'about'"
echo ""
echo "4️⃣  Feather Icons (Open source, consistent style)"
echo "   URL: https://feathericons.com/"
echo "   Icons: shopping-bag, book, info"
echo ""
echo "📥 Quick Download Links (Feather Icons):"
echo ""
echo "Shopping:"
echo "  https://feathericons.com/icons/shopping-bag.svg"
echo ""
echo "Guide:"
echo "  https://feathericons.com/icons/book.svg"
echo ""
echo "About:"
echo "  https://feathericons.com/icons/info.svg"
echo ""
echo "💡 After downloading SVG files, convert to PNG:"
echo "   - Use: https://cloudconvert.com/svg-to-png"
echo "   - Or use: https://svgtopng.com/"
echo "   - Set size to 81x81 or 128x128"
echo ""
echo "🎨 To change colors:"
echo "   - Use: https://www.imgonline.com.ua/replace-color.php"
echo "   - Or edit SVG before converting (change stroke/fill color)"
echo ""
echo "📂 Save files to:"
echo "   $(pwd)"
echo ""
echo "✅ After downloading, run:"
echo "   ls -lh"
echo "   to verify file sizes are larger than 75 bytes"
echo ""

# Open browser to icon sources (macOS)
read -p "🌐 Open Iconfont in browser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    open "https://www.iconfont.cn/"
fi

read -p "🌐 Open Flaticon in browser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    open "https://www.flaticon.com/search?word=shopping%20bag"
fi

echo ""
echo "✨ Done! Download your icons and replace the files."
echo "📖 See ICON-GUIDE.md for detailed instructions."

