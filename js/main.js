// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        });
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
    whatsappBtn.href = 'https://wa.me/255755885888'; // Replace with actual WhatsApp number
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-btn';
    whatsappBtn.title = 'Chat with us on WhatsApp';
    whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
    whatsappBtn.innerHTML = '💬 WhatsApp';
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        background: #25D366;
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        transition: all 0.3s ease;
        z-index: 998;
        display: none;
        font-size: 0.9rem;
    `;
    
    whatsappBtn.addEventListener('mouseover', () => {
        whatsappBtn.style.background = '#1ebd56';
        whatsappBtn.style.transform = 'translateY(-5px)';
        whatsappBtn.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
    });
    
    whatsappBtn.addEventListener('mouseout', () => {
        whatsappBtn.style.background = '#25D366';
        whatsappBtn.style.transform = 'translateY(0)';
        whatsappBtn.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
    });
    
    window.addEventListener('scroll', () => {
        whatsappBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    
    document.body.appendChild(whatsappBtn);
}

createWhatsAppButton();

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

    const phrases = [
        'High Quality Forest Products and Services',
        'Kiln Drying Services',
        'Timber Planing',
        'Poles Skidding Solutions',
        'Professional Treatment Services',
        'Timber & Poles Handling'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;

    const typingSpeed = 50;
    const typedColor = '#FFD700';

    function updateText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (letterIndex < currentPhrase.length) {
            letterIndex++;
            typedTextElement.textContent = currentPhrase.slice(0, letterIndex);
            setTimeout(updateText, typingSpeed);
        } else {
            // Move to next phrase
            letterIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(updateText, 1500); // Pause before next phrase
        }
    }

    function setTypedColor() {
        typedTextElement.style.color = typedColor;
    }

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