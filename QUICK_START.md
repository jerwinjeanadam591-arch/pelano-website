# Quick Start Guide - Pelano Resources Website

## 🚀 Getting Started

### 1. **What You Have**
A modern, professional frontend-only website with:
- 6 HTML pages (Home, About, Products, Services, Gallery, Contact)
- Professional CSS with dark mode support
- Advanced JavaScript utilities and features
- No backend server needed
- Ready to deploy anywhere

### 2. **Initial Setup**

#### Option A: Local Testing (No Setup Required)
Simply open any `.html` file in your web browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

#### Option B: Local Web Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npx)
npx http-server

# Then visit: http://localhost:8000
```

### 3. **Customize Your Information**

#### Update Contact Information
Edit these files and replace placeholder info:

**File**: `index.html`, `contact.html`, `services.html`
```html
<!-- Find and update these values -->
<p>+255 XXX XXX XXX</p>
<p>info@pelanoresources.co.tz</p>
<p>Mafinga, Tanzania</p>
```

#### Update WhatsApp Button
**File**: `js/main.js` (line ~183)
```javascript
whatsappBtn.href = 'https://wa.me/255XXXXXXXXX'; // Replace with your number
```

#### Update Company Details
**File**: `index.html` (JSON-LD schema, line ~45)
```javascript
"telephone": "+255XXXXXXXXX",
"email": "info@pelanoresources.co.tz",
```

### 4. **Key Features to Know**

#### Dark Mode
- Click the moon button (🌙) in bottom-left corner
- User preference is saved automatically
- Works on all pages

#### Contact Form
- Try the contact form on `/contact.html`
- Messages are validated and stored in browser
- Shows success/error notifications
- Ready to integrate with backend service

#### Product Filtering
- On `/products.html`
- Filter by category or search products
- Click "View Details" to see product modal

#### Mobile Menu
- On mobile devices, click the hamburger menu (☰)
- Navigation collapses automatically

### 5. **Deploy Your Website**

#### Option A: GitHub Pages (Free, Easy)
```bash
# 1. Create GitHub repository
# 2. Push files to gh-pages branch
# 3. Your site is live at: https://username.github.io/pelano-website
```

#### Option B: Netlify (Free, Simple)
```bash
# 1. Drag & drop your folder to Netlify
# 2. Or connect GitHub repo
# 3. Your site goes live automatically
```

#### Option C: Vercel (Free, Fast)
```bash
# 1. Import your GitHub repository
# 2. Vercel detects it's a static site
# 3. Deploy with one click
```

#### Option D: Your Own Server (VPS/Hosting)
```bash
# 1. Upload files to your server
# 2. Point domain to server
# 3. Serve with nginx/Apache
```

### 6. **Connect Contact Form to Backend**

Currently, contact form stores messages in browser. To send emails:

#### Using Formspree (Easiest)
```html
<!-- In contact.html, update the form: -->
<form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

#### Using Firebase
```javascript
// In contact.js, replace fetch with Firebase
import { addDoc, collection } from "firebase/firestore";

// Add code to send to Firebase
```

#### Using EmailJS
```html
<!-- Add to <head> -->
<script type="text/javascript" src="https://cdn.emailjs.com/sdk/2.6.4/email.min.js"></script>

<script>
  emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

### 7. **Set Up Analytics**

Add Google Analytics to track visitors:

```html
<!-- Add to <head> of all HTML files: -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 8. **File Structure**

```
📁 pelano-website/
├── 📄 index.html           Homepage
├── 📄 about.html           About page
├── 📄 products.html        Products page
├── 📄 services.html        Services page
├── 📄 gallery.html         Gallery page
├── 📄 contact.html         Contact page
├── 📄 README.md            Full documentation
├── 📄 FEATURES.md          Feature checklist
├── 📄 QUICK_START.md       This file
├── 📁 css/
│   ├── variables.css       Design tokens
│   ├── style.css           Main styles
│   └── components.css      Component styles
├── 📁 js/
│   ├── utils.js            Utility functions
│   ├── main.js             Main application
│   ├── products.js         Product features
│   └── contact.js          Contact form
└── 📁 images/              Your images here
```

### 9. **Customization Tips**

#### Change Brand Colors
Edit `css/variables.css`:
```css
:root {
    --primary-color: #27ae60;      /* Green */
    --secondary-color: #2c3e50;    /* Dark blue */
    --accent-color: #3498db;       /* Light blue */
}
```

#### Change Company Name
Search for "Pelano Resources" and replace with your company name in:
- All `.html` files
- `js/utils.js` (if needed)
- `README.md`

#### Add Your Logo
Replace emoji logo (🌿) with HTML image:
```html
<!-- In navbar, replace: -->
<h1>🌿 Pelano Resources</h1>

<!-- With: -->
<img src="images/pelano-newlogo.png" alt="Pelano Resources Logo" height="40">
```

### 10. **Performance Optimization**

#### Image Optimization
- Use WebP format with PNG fallback
- Compress images with TinyPNG
- Use lazy loading for images:
```html
<img src="images/placeholder.png" data-src="images/real-image.png" class="lazy">
```

#### CSS/JS Minification
- Use tools like: cssnano, terser, minify
- Production: combine CSS/JS files

#### Caching
- Set cache headers on server
- Leverage browser caching
- Use CDN for fast delivery

### 11. **Testing Checklist**

- [ ] Test on desktop (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile (iPhone, Android)
- [ ] Test dark mode toggle
- [ ] Test contact form validation
- [ ] Test mobile menu
- [ ] Test product filtering
- [ ] Check page load speed (< 3 seconds)
- [ ] Verify all links work
- [ ] Check form submission
- [ ] Test on slow network (DevTools)

### 12. **Common Issues & Solutions**

#### Issue: Styles not loading
**Solution**: Clear browser cache (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

#### Issue: Dark mode not working
**Solution**: Check if browser allows localStorage

#### Issue: Contact form not submitting
**Solution**: Set up backend service (Formspree, Firebase, etc.)

#### Issue: Images not showing
**Solution**: Check image paths are relative (e.g., `images/pic.jpg`)

#### Issue: Mobile menu not working
**Solution**: Clear cache and check JavaScript is enabled

### 13. **Backup & Version Control**

#### Using Git
```bash
git init
git add .
git commit -m "Initial professional website"
git remote add origin https://github.com/yourname/pelano-website
git push -u origin main
```

#### Regular Backups
- Back up regularly to cloud storage
- Use version control (Git)
- Keep track of changes

### 14. **Next Steps**

1. **Immediate**: Customize contact info and test locally
2. **Short-term**: Deploy to Netlify/Vercel (free)
3. **Medium-term**: Add real images and content
4. **Long-term**: Add testimonials, blog, team pages

### 15. **Getting Help**

- Check `README.md` for detailed documentation
- Review `FEATURES.md` for all available features
- Check browser console for JavaScript errors (F12)
- Use browser DevTools to debug CSS

---

## 📱 Quick Mobile Check

Test on mobile:
1. Open website on phone
2. Check hamburger menu works
3. Check dark mode toggle works
4. Test contact form
5. Verify layout looks good

---

## ⚡ Performance Quick Check

```
Target Metrics:
- Page Load: < 3 seconds
- First Contentful Paint: < 1.8 seconds
- Largest Contentful Paint: < 2.5 seconds
- Layout Shift: < 0.1
- Mobile Score: 80+
- Desktop Score: 90+
```

Check using: Google PageSpeed Insights

---

## 🎉 You're Ready!

Your professional website is ready to go. Start with the basics, add your content, and deploy!

For detailed feature information, see `README.md` and `FEATURES.md`.

**Happy website building! 🚀**
