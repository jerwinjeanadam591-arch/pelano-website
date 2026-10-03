# Pelano Resources Ltd - Professional Frontend Website

A modern website built with HTML, CSS, and JavaScript. Public browsing and email/WhatsApp enquiry preparation remain available without backend configuration. Optional Supabase features are enabled only after the company configures them.

## Optional Supabase quote capture

The quote builder continues to prepare email and WhatsApp enquiries when Supabase is not configured. To enable server-backed quote capture:

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
3. Set the project URL and publishable/anon key in [`js/supabase-config.js`](js/supabase-config.js).
4. Never place a service-role key in browser code.

The schema permits anonymous quote creation only. Customer records and staff dashboard access should be added with authenticated policies before exposing internal operations.

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
- ✅ Browser-side required-field validation
- ✅ Email format validation
- ✅ Prepared email and WhatsApp messages (visitor sends explicitly)
- ✅ Consent notice and delivery limitations clearly shown

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
- Client-side form validation
- Prepares an email or WhatsApp message for the visitor to send
- Creates a browser-local reference without storing contact details

### `js/products.js` - Product Page
- Product filtering by category
- Product search functionality
- Modal/lightbox for details
- Product comparison and quote selection

### `js/business-tools.js` - Customer Tools
- English / Kiswahili interface toggle covering page copy, navigation, forms, product cards, dynamic content, accessibility labels, and metadata
- Browser-local enquiry references (up to 20 references per browser)
- Assistant that searches published public pages, guides and published CMS articles
- No external AI provider, backend, enquiry dashboard, stock feed, or CRM connection

## 📬 Enquiries and product comparison

The product page includes a quote builder and comparison for up to three products. Visitors enter their project requirements, then choose to open their own email app or WhatsApp with a prepared message. The website does not send that message itself or confirm delivery.

Enquiry reference codes are stored in the browser with the date, selected channel, and product names only. They are device/browser-specific and do not indicate that Pelano Resources received or processed an enquiry. Contact details are included only in the visitor's prepared email/WhatsApp message.

The assistant builds an in-browser search index from public pages in `sitemap.xml` when a visitor opens it, including the public download centre and published CMS articles when configured. It returns relevant published passages with links to their source pages; it does not use an external generative-AI service or index staff/admin pages. Exact pricing, technical specifications, live stock and lead times must still be confirmed with the company.

The language toggle applies curated Kiswahili translations across site pages and dynamically rendered content, then restores the original English when switched back. Have a fluent Kiswahili reviewer verify the complete translation before public launch.

## 📈 Marketing measurement and SEO operations

Industry and location pages provide project-specific enquiry paths; the resources centre offers a timber selection guide, procurement checklist and product catalogue. The product quote builder uses four steps: choose products, share project requirements, enter contact details, and review before opening email or WhatsApp. Product detail prompts vary by category without inventing product technical specifications. The blog's built-in articles are buyer-focused and searchable by category, title, tags and article text.

The newsletter has an optional double opt-in backend using Supabase Edge Functions and Resend. It is not enabled by default. Without both function endpoints configured, the form clearly reports that sign-up is inactive and does not store the address locally or send it to the CMS table. Setup, secrets and pre-launch testing are documented in [`SEO_SETUP.md`](SEO_SETUP.md).

Privacy-safe marketing events are available through `js/analytics.js`. Google Analytics is **off by default**; configure a GA4 `G-...` measurement ID in that file to show the consent choices and load Google Analytics only after opt-in. Events intentionally exclude form details and search terms. Contact handoffs indicate that a prepared email or WhatsApp link was opened, not that a message was sent or received. Search Console, Bing Webmaster Tools and Google Business Profile still require verification and access through company-owned accounts; see [`SEO_SETUP.md`](SEO_SETUP.md).

The quality workflow checks JavaScript syntax, internal links, SEO metadata and sitemap coverage on changes, and also runs weekly. It validates the repository, not live Search Console/Bing account data or laboratory Core Web Vitals scores.

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
- ✅ Only preferences and non-personal enquiry reference metadata stored in browser localStorage
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

The contact form validates fields in the browser and prepares an email or WhatsApp message. Personal details are not sent to this website or persisted in its local storage. A real server-side inbox, CRM, or staff dashboard requires a separately configured backend and privacy/security review.

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

- ✅ No sensitive data in localStorage
- ✅ Enquiry content is URL-encoded for email/WhatsApp handoff
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
