/**
 * Utility Functions - Reusable helpers for the website
 */

// ===== STORAGE HELPERS =====
const Storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
};

// ===== DARK MODE MANAGER =====
const DarkMode = {
    init: () => {
        const isDark = Storage.get('dark-mode') || false;
        if (isDark) {
            DarkMode.enable();
        }
        DarkMode.setupToggle();
    },
    
    enable: () => {
        document.body.classList.add('dark-mode');
        Storage.set('dark-mode', true);
    },
    
    disable: () => {
        document.body.classList.remove('dark-mode');
        Storage.set('dark-mode', false);
    },
    
    toggle: () => {
        if (document.body.classList.contains('dark-mode')) {
            DarkMode.disable();
        } else {
            DarkMode.enable();
        }
    },
    
    setupToggle: () => {
        let toggle = document.getElementById('dark-mode-toggle');
        if (!toggle && document.body) {
            toggle = document.createElement('button');
            toggle.id = 'dark-mode-toggle';
            toggle.type = 'button';
            toggle.className = 'dark-mode-toggle';
            toggle.setAttribute('aria-label', 'Toggle dark mode');
            toggle.title = 'Toggle dark mode';
            document.body.appendChild(toggle);
        }

        if (toggle) {
            const updateIcon = () => {
                toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            };

            toggle.addEventListener('click', () => {
                DarkMode.toggle();
                updateIcon();
            });

            updateIcon();
        }
    }
};

// ===== NOTIFICATION SYSTEM =====
const Notify = {
    create: (message, type = 'info', duration = 4000) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${Notify.getIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        if (duration) {
            setTimeout(() => {
                notification.classList.add('notification-fade-out');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
        
        return notification;
    },
    
    getIcon: (type) => {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    },
    
    success: (message, duration = 4000) => Notify.create(message, 'success', duration),
    error: (message, duration = 4000) => Notify.create(message, 'error', duration),
    warning: (message, duration = 4000) => Notify.create(message, 'warning', duration),
    info: (message, duration = 4000) => Notify.create(message, 'info', duration)
};

// ===== DEBOUNCE & THROTTLE =====
const Debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const Throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== DOM HELPERS =====
const DOM = {
    query: (selector) => document.querySelector(selector),
    queryAll: (selector) => document.querySelectorAll(selector),
    create: (tag, className = '', innerHTML = '') => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    },
    escape: (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;'),
    addClass: (el, className) => el.classList.add(className),
    removeClass: (el, className) => el.classList.remove(className),
    toggleClass: (el, className) => el.classList.toggle(className),
    hasClass: (el, className) => el.classList.contains(className),
    show: (el) => el.style.display = '',
    hide: (el) => el.style.display = 'none',
    toggle: (el) => el.style.display === 'none' ? DOM.show(el) : DOM.hide(el)
};

// ===== FORM VALIDATION =====
const Validation = {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    phone: (phone) => /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10,
    required: (value) => value && value.trim().length > 0,
    minLength: (value, length) => value && value.length >= length,
    maxLength: (value, length) => value && value.length <= length,
    url: (url) => /^https?:\/\/.+/.test(url),
    number: (value) => !isNaN(value) && value !== ''
};

// ===== ANIMATION HELPERS =====
const Animate = {
    fadeIn: (el, duration = 300) => {
        el.style.opacity = '0';
        el.style.transition = `opacity ${duration}ms ease`;
        setTimeout(() => el.style.opacity = '1', 10);
    },
    
    fadeOut: (el, duration = 300) => {
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity = '0';
    },
    
    slideDown: (el, duration = 300) => {
        el.style.maxHeight = '0';
        el.style.overflow = 'hidden';
        el.style.transition = `max-height ${duration}ms ease`;
        setTimeout(() => {
            el.style.maxHeight = el.scrollHeight + 'px';
        }, 10);
    },
    
    slideUp: (el, duration = 300) => {
        el.style.transition = `max-height ${duration}ms ease`;
        el.style.maxHeight = '0';
    }
};

// ===== SCROLL HELPERS =====
const Scroll = {
    to: (element, behavior = 'smooth') => {
        element.scrollIntoView({ behavior });
    },
    
    toTop: (behavior = 'smooth') => {
        window.scrollTo({ top: 0, behavior });
    },
    
    getPosition: (element) => element.getBoundingClientRect(),
    
    isInView: (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    },
    
    onScroll: (callback) => window.addEventListener('scroll', Throttle(callback, 100))
};

// ===== API HELPERS (For future backend integration if needed) =====
const API = {
    fetch: async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    post: async (url, data) => API.fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    
    get: async (url) => API.fetch(url, { method: 'GET' })
};

// ===== ANALYTICS HELPERS =====
const Analytics = {
    trackEvent: (category, action, label = '') => {
        if (window.gtag) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    },
    
    trackPageView: (pagePath) => {
        if (window.gtag) {
            gtag('config', 'GA_MEASUREMENT_ID', {
                'page_path': pagePath
            });
        }
    }
};

// ===== LAZY LOADING IMAGES =====
const LazyLoad = {
    init: () => {
        if ('IntersectionObserver' in window) {
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
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
};

// ===== DEVICE DETECTION =====
const Device = {
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024,
    hasTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    DarkMode.init();
    LazyLoad.init();
});
