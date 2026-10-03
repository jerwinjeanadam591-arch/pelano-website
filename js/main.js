// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

function renderSharedFooter() {
    const template = document.createElement('template');
    template.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <section class="footer-section footer-brand">
                        <a class="footer-brand-link" href="index.html">
                            <img src="images/pelano-newlogo.png" alt="" width="48" height="48">
                            <span>Pelano Resources Ltd</span>
                        </a>
                        <p>Forest products and supply solutions from Mafinga, Tanzania. Share your requirements and our team will confirm specifications, availability and delivery for your project.</p>
                        <a class="footer-cta" href="contact.html">Talk to our team <span aria-hidden="true">→</span></a>
                    </section>
                    <nav class="footer-section footer-links" aria-label="Explore">
                        <h2>Explore</h2>
                        <ul>
                            <li><a href="products.html">Products</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="industries.html">Industries</a></li>
                            <li><a href="resources.html">Guides &amp; resources</a></li>
                        </ul>
                    </nav>
                    <nav class="footer-section footer-links" aria-label="Company">
                        <h2>Company</h2>
                        <ul>
                            <li><a href="about.html">About us</a></li>
                            <li><a href="projects.html">Projects</a></li>
                            <li><a href="testimonials.html">Testimonials</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                            <li><a href="blog.html">News &amp; insights</a></li>
                        </ul>
                    </nav>
                    <section class="footer-section footer-contact">
                        <h2>Contact</h2>
                        <address>
                            <span class="footer-contact-item">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.1 7 13 7 13s7-7.9 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>
                                <span>Mafinga, Iringa Region<br>Tanzania</span>
                            </span>
                            <a class="footer-contact-item" href="tel:+255755885888">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.3 11.3 0 0 0 3.55.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.3 11.3 0 0 0 .57 3.55 1 1 0 0 1-.24 1Z"/></svg>
                                <span>+255 755 885 888</span>
                            </a>
                            <a class="footer-contact-item" href="mailto:info@pelanoresources.co.tz">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"/></svg>
                                <span>info@pelanoresources.co.tz</span>
                            </a>
                        </address>
                        <h3 class="footer-social-heading">Connect with us</h3>
                        <div class="footer-social-links">
                            <a href="https://facebook.com/pelanoresources" target="_blank" rel="noopener noreferrer" aria-label="Pelano Resources on Facebook">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.65 21.18 10.44 22v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.61 3.52-3.61 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.9h-2.18V22C18.35 21.18 22 17.09 22 12.07z"/></svg>
                            </a>
                            <a href="https://twitter.com/pelanoresources" target="_blank" rel="noopener noreferrer" aria-label="Pelano Resources on X">X</a>
                            <a href="https://linkedin.com/company/pelano-resources" target="_blank" rel="noopener noreferrer" aria-label="Pelano Resources on LinkedIn">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6 1.1 6 0 4.88 0 3.5 0 2.12 1.1 1 2.48 1c1.38 0 2.5 1.12 2.5 2.5zM0 8h5v16H0zM7.5 8h4.78v2.16h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5V16.5c0-1.82-.03-4.16-2.54-4.16-2.55 0-2.94 1.99-2.94 4.04V24h-5z"/></svg>
                            </a>
                            <a href="https://instagram.com/pelanoresources" target="_blank" rel="noopener noreferrer" aria-label="Pelano Resources on Instagram">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.97.24 2.43.4.6.22 1.03.48 1.48.93.45.45.71.88.93 1.48.16.46.34 1.26.4 2.43.058 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.97-.4 2.43-.22.6-.48 1.03-.93 1.48-.45.45-.88.71-1.48.93-.46.16-1.26.34-2.43.4-1.27.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.24-2.43-.4-.6-.22-1.03-.48-1.48-.93-.45-.45-.71-.88-.93-1.48-.16-.46-.34-1.26-.4-2.43C2.212 15.584 2.2 15.204 2.2 12s.012-3.584.07-4.85c.055-1.17.24-1.97.4-2.43.22-.6.48-1.03.93-1.48.45-.45.88-.71 1.48-.93.46-.16 1.26-.34 2.43-.4C8.416 2.212 8.796 2.2 12 2.2zm0 3.6A6.2 6.2 0 1 0 18.2 12 6.208 6.208 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm4.8-8.9a1.44 1.44 0 1 1-1.44-1.44A1.44 1.44 0 0 1 16.8 6.1z"/></svg>
                            </a>
                            <a href="https://youtube.com/@pelanoresources" target="_blank" rel="noopener noreferrer" aria-label="Pelano Resources on YouTube">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.58A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12C4.6 20.5 12 20.5 12 20.5s7.4 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg>
                            </a>
                        </div>
                    </section>
                </div>
                <div class="footer-bottom">
                    <p>&copy; <span data-footer-year></span> Pelano Resources Ltd. All rights reserved.</p>
                    <nav aria-label="Legal">
                        <a href="privacy.html">Privacy</a>
                        <a href="terms.html">Terms</a>
                    </nav>
                </div>
            </div>
        </footer>
    `;
    const footer = template.content.firstElementChild;
    if (!footer) return;
    footer.querySelector('[data-footer-year]').textContent = String(new Date().getFullYear());
    const existingFooter = document.querySelector('footer.footer');
    if (existingFooter) {
        existingFooter.replaceWith(footer);
    } else {
        const main = document.querySelector('main');
        main?.after(footer);
        if (!main) document.body.append(footer);
    }
}

renderSharedFooter();

function buildGroupedNavigation(menu) {
    if (!menu || menu.dataset.grouped === 'true') return;

    const groups = [
        { label: 'Products', items: [
            ['Products', 'products.html'],
            ['Services', 'services.html']
        ] },
        { label: 'Company', items: [
            ['About', 'about.html'],
            ['Testimonials', 'testimonials.html'],
            ['Gallery', 'gallery.html']
        ] },
        { label: 'Resources', items: [
            ['Blog & insights', 'blog.html']
        ] }
    ];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const link = (label, href) => {
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.textContent = label;
        if (currentPage === href) {
            anchor.classList.add('active');
            anchor.setAttribute('aria-current', 'page');
        }
        return anchor;
    };

    menu.replaceChildren();
    const home = document.createElement('li');
    home.append(link('Home', 'index.html'));
    menu.append(home);

    for (const group of groups) {
        const item = document.createElement('li');
        item.className = 'nav-dropdown';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'nav-dropdown-toggle';
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        const submenuId = `nav-submenu-${group.label.toLowerCase()}`;
        toggle.setAttribute('aria-controls', submenuId);
        toggle.append(document.createTextNode(group.label));
        const arrow = document.createElement('span');
        arrow.className = 'nav-dropdown-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '▾';
        toggle.append(arrow);

        const submenu = document.createElement('ul');
        submenu.id = submenuId;
        submenu.className = 'nav-submenu';
        submenu.hidden = true;
        for (const [label, href] of group.items) {
            const entry = document.createElement('li');
            entry.append(link(label, href));
            submenu.append(entry);
        }
        if (group.items.some(([, href]) => currentPage === href)) {
            toggle.classList.add('active');
            toggle.setAttribute('aria-current', 'page');
        }

        toggle.addEventListener('click', () => {
            const isOpen = item.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            submenu.hidden = !isOpen;
        });
        item.append(toggle, submenu);
        menu.append(item);
    }

    const contact = document.createElement('li');
    const contactLink = link('Contact', 'contact.html');
    contactLink.classList.add('nav-contact');
    contact.append(contactLink);
    menu.append(contact);
    menu.dataset.grouped = 'true';

    menu.addEventListener('click', event => {
        const clickedInside = event.target instanceof Element && event.target.closest('.nav-dropdown');
        if (!clickedInside) {
            menu.querySelectorAll('.nav-dropdown.open').forEach(openItem => {
                openItem.classList.remove('open');
                const button = openItem.querySelector('.nav-dropdown-toggle');
                const submenu = openItem.querySelector('.nav-submenu');
                button?.setAttribute('aria-expanded', 'false');
                if (submenu) submenu.hidden = true;
            });
        }
    });

    document.addEventListener('click', event => {
        if (!(event.target instanceof Node) || menu.contains(event.target)) return;
        menu.querySelectorAll('.nav-dropdown.open').forEach(openItem => {
            openItem.classList.remove('open');
            openItem.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
            const submenu = openItem.querySelector('.nav-submenu');
            if (submenu) submenu.hidden = true;
        });
    });

    menu.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const openItem = menu.querySelector('.nav-dropdown.open');
        if (!openItem) return;
        openItem.classList.remove('open');
        openItem.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        const submenu = openItem.querySelector('.nav-submenu');
        if (submenu) submenu.hidden = true;
        openItem.querySelector('.nav-dropdown-toggle')?.focus();
    });
}

buildGroupedNavigation(navMenu);

if (hamburger && navMenu) {
    hamburger.setAttribute('aria-controls', navMenu.id);
    hamburger.setAttribute('aria-expanded', 'false');

    const closeNavMenu = () => {
        navMenu.classList.remove('active');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.textContent = isOpen ? '✕' : '☰';
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeNavMenu();
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeNavMenu();
            hamburger.focus();
        }
    });

    document.addEventListener('click', event => {
        if (
            navMenu.classList.contains('active') &&
            !navMenu.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            closeNavMenu();
        }
    });
}

// ===== STICKY NAVBAR ON SCROLL =====
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
let backToTopBtn;

function updateScrollState() {
    const scrollY = window.pageYOffset;

    if (navbar) {
        navbar.classList.toggle('sticky', scrollY > 100);
    }

    if (backToTopBtn) {
        backToTopBtn.style.display = scrollY > 300 ? 'block' : 'none';
    }

    if (sections.length > 0 && navLinks.length > 0) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
}

const handleScroll = Throttle(updateScrollState, 100);
window.addEventListener('scroll', handleScroll);
updateScrollState();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS (FADE-IN ON SCROLL) =====
const fadeElements = document.querySelectorAll('.product-card, .service-card, .feature-card');

if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
}

// ===== LAZY LOADING IMAGES (WHEN YOU ADD REAL IMAGES) =====
const lazyImages = document.querySelectorAll('img.lazy');

if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #27ae60;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseover', () => {
        btn.style.background = '#219a52';
        btn.style.transform = 'translateY(-5px)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.background = '#27ae60';
        btn.style.transform = 'translateY(0)';
    });

    backToTopBtn = btn;
    document.body.appendChild(btn);
}

createBackToTopButton();

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== GALLERY LIGHTBOX (FOR GALLERY PAGE) =====
const galleryImages = document.querySelectorAll('.gallery-item');

if (galleryImages.length > 0) {
    galleryImages.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const img = item.querySelector('.placeholder-img');
            if (img) {
                // You can expand this to show full-size image in modal
                console.log('Gallery image clicked:', img);
            }
        });
    });
}

// ===== WHATSAPP BUTTON =====
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/255755885888';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.className = 'whatsapp-btn';
    whatsappBtn.title = 'Chat with us on WhatsApp';
    whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
    whatsappBtn.innerHTML = '💬 WhatsApp';
    document.body.appendChild(whatsappBtn);
}

createWhatsAppButton();

function hideFloatingControlsOverFooter() {
    const footer = document.querySelector('.footer');
    if (!footer || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
        document.body.classList.toggle('footer-in-view', entry.isIntersecting);
    });

    observer.observe(footer);
}

hideFloatingControlsOverFooter();

// ===== COUNTER ANIMATION FOR STATISTICS =====
function createCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                            counter.classList.add('counted');
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
}

createCounterAnimation();

function initHeroTyping() {
    const typedTextElement = document.getElementById('hero-typed-text');
    if (!typedTextElement) return;

    const englishPhrases = [
        'High Quality Forest Products and Services',
        'Kiln Drying Services',
        'Timber Planing',
        'Poles Skidding Solutions',
        'Professional Treatment Services',
        'Timber & Poles Handling'
    ];
    const swahiliPhrases = [
        'Bidhaa bora za misitu na huduma',
        'Huduma za ukaushaji kwenye tanuru',
        'Upangaji wa mbao',
        'Utelezaji wa nguzo',
        'Huduma za kitaalamu za utibabu',
        'Ushughulikiaji wa mbao na nguzo'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let timer;

    const typingSpeed = 50;
    const typedColor = '#FFD700';

    function getPhrases() {
        return document.documentElement.lang === 'sw' ? swahiliPhrases : englishPhrases;
    }

    function updateText() {
        const phrases = getPhrases();
        const currentPhrase = phrases[phraseIndex];
        
        if (letterIndex < currentPhrase.length) {
            letterIndex++;
            typedTextElement.textContent = currentPhrase.slice(0, letterIndex);
            timer = setTimeout(updateText, typingSpeed);
        } else {
            // Move to next phrase
            letterIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            timer = setTimeout(updateText, 1500); // Pause before next phrase
        }
    }

    function setTypedColor() {
        typedTextElement.style.color = typedColor;
    }

    document.addEventListener('pelano:languagechange', () => {
        clearTimeout(timer);
        phraseIndex = 0;
        letterIndex = 0;
        typedTextElement.textContent = '';
        updateText();
    });

    setTypedColor();
    updateText();
}

initHeroTyping();

// ===== SMOOTH ANCHOR LINKS WITH OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // navbar height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});