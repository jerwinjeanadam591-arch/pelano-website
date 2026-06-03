# Mobile Testing Guide - Pelano Website

## How to Test Mobile Responsiveness

### Using Browser DevTools (Recommended)
1. **Chrome/Edge/Firefox:**
   - Open Developer Tools (F12)
   - Click "Toggle device toolbar" (Ctrl+Shift+M)
   - Select different device presets or enter custom dimensions

2. **Recommended Test Devices:**
   - iPhone SE: 375x667
   - iPhone 12 mini: 360x780
   - Samsung Galaxy S21: 360x800
   - Google Pixel 5: 393x851
   - iPad: 768x1024

### Test Scenarios

#### Mobile Phone (Vertical - 360px width)
- [ ] Navigation bar doesn't overflow
- [ ] Hamburger menu appears and works
- [ ] Hero section displays properly without horizontal scroll
- [ ] Product cards stack in single column
- [ ] Text is readable (not too small)
- [ ] Buttons are easily clickable (minimum 44px height)
- [ ] Images scale properly
- [ ] No horizontal scrollbar appears

#### Tablet (Portrait - 768px width)
- [ ] Layout is proper 1-2 column
- [ ] Navbar displays correctly
- [ ] All content fits without horizontal scroll
- [ ] Text sizing is appropriate

#### Mobile Landscape (360x640)
- [ ] Content doesn't overflow horizontally
- [ ] Navigation is still accessible
- [ ] Hero section height is reasonable

### Pages to Test
1. **index.html** - Home page
   - Hero carousel
   - About section
   - Featured products
   - Why choose us
   - Stats section

2. **products.html** - Products page
   - Product filters
   - Product grid
   - Search functionality

3. **services.html** - Services page
   - Service cards
   - Service descriptions

4. **blog.html** - Blog listing
   - Blog card grid
   - Blog categories

5. **contact.html** - Contact form
   - Form inputs
   - Submit buttons
   - Contact info

### Quick Checks
```
✓ No horizontal scroll at any width
✓ Text is readable (font size ≥ 16px for body text)
✓ Touch targets are at least 44x44px
✓ Images don't overflow container
✓ Hamburger menu works on screens ≤768px
✓ All pages load without layout shift
✓ Forms are usable on mobile
✓ Modals fit within viewport
```

### Common Issues to Look For
- [ ] Horizontal scrollbar appearing
- [ ] Text being cut off
- [ ] Images extending beyond screen
- [ ] Buttons too small to tap
- [ ] Navbar collapse not working
- [ ] Overlapping elements
- [ ] Forms not filling screen properly

## Real Device Testing
For best results, test on actual devices:
- iPhone (Safari)
- Android phone (Chrome)
- Tablet (landscape and portrait)

## Accessibility Testing
- [ ] All buttons and links are clickable
- [ ] Form labels are visible
- [ ] Text contrast is sufficient
- [ ] No content is hidden on mobile (unless intentional)
