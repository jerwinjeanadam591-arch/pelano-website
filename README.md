# Pelano Resources Ltd - Professional Frontend Website

A modern, professional frontend-only website built with pure HTML, CSS, and JavaScript. No backend dependencies required.

## 🎯 Professional Features Implemented

### 1. **Performance & SEO Optimization**
- ✅ Semantic HTML5 structure
- ✅ Meta tags for social sharing (Open Graph, Twitter Card)
- ✅ JSON-LD structured data for local business schema
- ✅ Canonical URLs
- ✅ Mobile-first responsive design
- ✅ Optimized CSS and JavaScript

### 2. **Dark Mode Toggle**
- ✅ System-wide dark mode support
- ✅ Persistent user preference (localStorage)
- ✅ Smooth transitions
- ✅ Full page coverage with dark variants

### 3. **Enhanced User Experience**
- ✅ Smooth page scrolling with offset
- ✅ Back-to-top button (smooth scroll)
- ✅ WhatsApp contact button (floating)
- ✅ Hamburger mobile menu
- ✅ Sticky navigation bar
- ✅ Scroll animations (fade-in, slide-in)

### 4. **Professional Form Handling**
- ✅ Real-time form validation
- ✅ Field-level error messages
- ✅ Email format validation
- ✅ Phone number validation
- ✅ Toast/notification system
- ✅ Accessible form labels

### 5. **Notification System**
- ✅ Success notifications
- ✅ Error notifications
- ✅ Warning notifications
- ✅ Info notifications
- ✅ Auto-dismiss with countdown
- ✅ Dark mode support

### 6. **Accessibility Features**
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation support
- ✅ Focus-visible outlines
- ✅ Screen reader support (sr-only)
- ✅ Semantic HTML structure
- ✅ Alt text placeholders

### 7. **CSS Variables System**
- ✅ Centralized color management
- ✅ Consistent spacing scale
- ✅ Border radius tokens
- ✅ Shadow depth levels
- ✅ Typography scale
- ✅ Z-index management

### 8. **Utility Functions Library**
- ✅ Storage helpers (localStorage management)
- ✅ Dark mode manager
- ✅ Notification system
- ✅ Form validation suite
- ✅ DOM manipulation helpers
- ✅ Animation utilities
- ✅ Scroll helpers
- ✅ Device detection
- ✅ Lazy loading images
- ✅ Debounce & throttle functions

### 9. **Interactive Components**
- ✅ Product filtering
- ✅ Search functionality
- ✅ Modal/Lightbox for product details
- ✅ Counter animations
- ✅ Loading skeleton screens
- ✅ Smooth transitions

### 10. **Mobile Responsive**
- ✅ Hamburger menu for mobile
- ✅ Flexible grid layouts
- ✅ Touch-friendly buttons
- ✅ Responsive typography
- ✅ Mobile-optimized navigation

## 📁 Project Structure

```
pelano-website/
├── index.html              # Home page
├── about.html             # About page
├── products.html          # Products page
├── services.html          # Services page
├── gallery.html           # Gallery page
├── contact.html           # Contact page
├── css/
│   ├── variables.css      # CSS custom properties & utilities
│   ├── style.css          # Main styles
│   └── components.css     # Component styles & animations
├── js/
│   ├── utils.js           # Utility functions library
│   ├── main.js            # Main application logic
│   ├── products.js        # Product page functionality
│   └── contact.js         # Contact form handling
├── images/                # Image assets
├── documents/             # Document files
└── uploads/              # User-uploaded content

```

## 🚀 Key JavaScript Files

### `js/utils.js` - Utility Library
Provides reusable functions for:
- **Storage**: LocalStorage management with JSON support
- **DarkMode**: System-wide dark mode toggle
- **Notify**: Toast notification system
- **Validation**: Form validation helpers
- **DOM**: DOM manipulation shortcuts
- **Animate**: Animation helpers
- **Scroll**: Scroll utilities
- **Device**: Device detection
- **LazyLoad**: Image lazy loading
- **Analytics**: Analytics event tracking

### `js/main.js` - Main Application
- Mobile hamburger menu
- Sticky navbar on scroll
- Smooth anchor links
- Back-to-top button
- WhatsApp floating button
- Counter animations
- Scroll animations
- Form validation

### `js/contact.js` - Contact Form
- Advanced form validation
- Real-time field validation
- Error message display
- Form submission handling
- Message storage in localStorage

### `js/products.js` - Product Page
- Product filtering by category
- Product search functionality
- Modal/lightbox for details
- Product data management

## 🎨 CSS Structure

### `css/variables.css`
Defines all design tokens:
- Color palette (primary, secondary, accent, semantic colors)
- Dark mode color scheme
- Spacing scale (xs, sm, md, lg, xl, 2xl)
- Typography scale
- Shadow depth levels
- Border radius tokens
- Z-index layers
- Utility classes

### `css/style.css`
Core styling for:
- Navigation and header
- Hero section
- Sections and cards
- Forms and buttons
- Footer
- Responsive breakpoints

### `css/components.css`
Component-specific styles:
- Notifications
- Dark mode toggle
- Loading skeletons
- Animations
- Accessibility features
- Scrollbar styling

## 🔧 How to Use

### 1. **Dark Mode**
```javascript
// Toggle dark mode
DarkMode.toggle();

// Enable dark mode
DarkMode.enable();

// Disable dark mode
DarkMode.disable();
```

### 2. **Show Notifications**
```javascript
// Success notification
Notify.success('Operation completed!');

// Error notification
Notify.error('Something went wrong!');

// Warning notification
Notify.warning('Warning message');

// Info notification
Notify.info('Information message');
```

### 3. **Form Validation**
```javascript
// Validate email
Validation.email('user@example.com'); // true

// Validate phone
Validation.phone('+255722123456'); // true

// Validate required
Validation.required('text'); // true

// Validate min length
Validation.minLength('password', 8); // depends on length
```

### 4. **Storage Management**
```javascript
// Set data
Storage.set('key', { name: 'value' });

// Get data
const data = Storage.get('key');

// Remove data
Storage.remove('key');

// Clear all
Storage.clear();
```

### 5. **DOM Helpers**
```javascript
// Query elements
const element = DOM.query('.selector');

// Add class
DOM.addClass(element, 'active');

// Remove class
DOM.removeClass(element, 'active');

// Toggle class
DOM.toggleClass(element, 'active');

// Show/Hide
DOM.show(element);
DOM.hide(element);
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML
- ARIA labels

## 🔒 Frontend-Only Architecture

This website is **completely frontend-based** with:
- ✅ No backend server needed
- ✅ No database dependencies
- ✅ All data stored in localStorage
- ✅ Pure HTML/CSS/JavaScript
- ✅ Can be hosted on any static hosting service

### Hosting Options
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Firebase Hosting
- Any static web host

## 🎯 Contact Form Notes

Currently, the contact form:
1. Validates all fields locally
2. Shows success/error notifications
3. Stores messages in browser localStorage
4. Can be integrated with services like:
   - Formspree
   - Firebase
   - EmailJS
   - Netlify Forms

To integrate with a backend service, modify `contact.js` to send data to your preferred endpoint.

## 🌐 WhatsApp Integration

Update the WhatsApp button in `js/main.js`:

```javascript
whatsappBtn.href = 'https://wa.me/255722123456'; // Replace with actual number
```

Format: `https://wa.me/[country_code][number]`

## 📊 Analytics Setup

The website includes placeholders for Google Analytics:

```javascript
// In utils.js, update with your GA ID
if (window.gtag) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label
    });
}
```

Add Google Analytics script tag to HTML `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Performance Tips

1. **Lazy Load Images**: Add `data-src` attribute instead of `src`
2. **Minimize CSS/JS**: Use minified versions in production
3. **Cache Busting**: Add version numbers to assets
4. **CDN**: Serve assets from a CDN for faster delivery
5. **Image Optimization**: Use modern formats (WebP) with fallbacks

## 🔐 Security Best Practices

- ✅ Input sanitization in form validation
- ✅ No sensitive data in localStorage
- ✅ CSP headers recommended
- ✅ HTTPS recommended
- ✅ Regular security audits

## 📝 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Future Enhancements

Potential additions:
- Blog/News section with cards
- Testimonials carousel
- Team profiles section
- FAQ accordion section
- Service comparison table
- Statistics/metrics section
- Advanced image gallery with filters
- Multi-language support
- Newsletter subscription

## 📄 License

Proprietary - Pelano Resources Ltd

## 📞 Support

For questions or issues, contact: info@pelanoresources.co.tz

---

**Version**: 2.0 (Professional Frontend)  
**Last Updated**: 2026-05-27  
**Build**: Pure Frontend (HTML5/CSS3/JavaScript ES6+)
