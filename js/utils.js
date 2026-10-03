/**
 * Utility Functions - Reusable helpers for the website
 */

// ===== STORAGE HELPERS =====
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Unable to save "${key}" in browser storage.`, error);
            return false;
        }
    },
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.error(`Unable to read "${key}" from browser storage.`, error);
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Unable to remove "${key}" from browser storage.`, error);
            return false;
        }
    },
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Unable to clear browser storage.', error);
            return false;
        }
    }
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
        DarkMode.updateToggle();
    },
    
    disable: () => {
        document.body.classList.remove('dark-mode');
        Storage.set('dark-mode', false);
        DarkMode.updateToggle();
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
            toggle.addEventListener('click', () => {
                DarkMode.toggle();
            });
            DarkMode.updateToggle();
        }
    },

    updateToggle: () => {
        const toggle = document.getElementById('dark-mode-toggle');
        if (!toggle) return;
        const isDark = document.body.classList.contains('dark-mode');
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }
};

const PelanoPhone = {
    getFullNumber(form, inputName = 'phone') {
        const input = form?.querySelector(`input[name="${inputName}"]`);
        const countrySelect = form?.querySelector(`select[name="${inputName}_country_code"]`);
        if (!input?.value) return '';
        const code = countrySelect?.value === 'other'
            ? form.querySelector(`input[name="${inputName}_custom_code"]`)?.value || ''
            : countrySelect?.value || '';
        return `${code}${input.value}`;
    },

    init() {
        document.querySelectorAll('[data-person-name]').forEach(input => {
            const validate = () => {
                const value = input.value.trim();
                const validName = !value || /^[\p{L}\p{M}][\p{L}\p{M} .'\-]{0,98}[\p{L}\p{M}]$/u.test(value);
                input.setCustomValidity(validName ? '' : 'Enter a name using letters, spaces, apostrophes, periods, or hyphens.');
            };
            input.addEventListener('input', validate);
            input.addEventListener('blur', validate);
            validate();
        });

        document.querySelectorAll('.phone-input').forEach(group => {
            const countrySelect = group.querySelector('select[data-phone-country]');
            const nationalInput = group.querySelector('input[type="tel"][data-phone-national]');
            const customCode = group.querySelector('input[data-phone-custom-code]');
            if (!countrySelect || !nationalInput) return;

            const updateValidity = () => {
                const hasNumber = nationalInput.value.length > 0;
                if (customCode) {
                    const useCustomCode = countrySelect.value === 'other';
                    customCode.hidden = !useCustomCode;
                    customCode.required = useCustomCode && hasNumber;
                    customCode.setAttribute('aria-hidden', String(!useCustomCode));
                    if (!useCustomCode) customCode.value = '';
                }
                const callingCode = countrySelect.value === 'other'
                    ? customCode?.value || ''
                    : countrySelect.value;
                const internationalLength = callingCode.replace(/\D/g, '').length + nationalInput.value.length;
                nationalInput.setCustomValidity(
                    hasNumber && (nationalInput.value.length < 7 || internationalLength > 15)
                        ? 'Enter 7–12 national digits; the complete international number must not exceed 15 digits.'
                        : ''
                );
            };

            nationalInput.addEventListener('input', () => {
                const digits = nationalInput.value.replace(/\D/g, '').slice(0, 12);
                if (nationalInput.value !== digits) nationalInput.value = digits;
                updateValidity();
            });
            countrySelect.addEventListener('change', updateValidity);
            customCode?.addEventListener('input', () => {
                const cleaned = customCode.value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '').slice(0, 4);
                if (customCode.value !== cleaned) customCode.value = cleaned;
                customCode.setCustomValidity(/^\+[1-9]\d{0,2}$/.test(cleaned) ? '' : 'Enter a valid country calling code, such as +81.');
                updateValidity();
            });
            updateValidity();
        });
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
    PelanoPhone.init();
});
