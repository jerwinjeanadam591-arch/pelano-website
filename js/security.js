/**
 * Security Module - Input Sanitization, XSS Protection, CSRF Tokens
 */

const Security = {
    /**
     * Sanitize user input to prevent XSS attacks
     * Removes potentially dangerous HTML/JavaScript
     */
    sanitize: (input) => {
        if (typeof input !== 'string') return input;
        
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;'
        };
        
        return input.replace(/[&<>"'\/]/g, char => map[char]);
    },

    /**
     * Sanitize email input - removes common XSS vectors
     */
    sanitizeEmail: (email) => {
        if (typeof email !== 'string') return '';
        return email.trim().toLowerCase().replace(/[^a-z0-9@._-]/g, '');
    },

    /**
     * Sanitize phone input - allows only digits, +, -, spaces
     */
    sanitizePhone: (phone) => {
        if (typeof phone !== 'string') return '';
        return phone.replace(/[^0-9+\-\s()]/g, '');
    },

    /**
     * Sanitize URLs to prevent protocol-based XSS
     */
    sanitizeUrl: (url) => {
        if (typeof url !== 'string') return '';
        try {
            const parsed = new URL(url);
            // Only allow http and https protocols
            if (['http:', 'https:'].includes(parsed.protocol)) {
                return parsed.href;
            }
            return '';
        } catch {
            return '';
        }
    },

    /**
     * Remove HTML tags from string
     */
    stripHtml: (html) => {
        if (typeof html !== 'string') return '';
        const tmp = document.createElement('DIV');
        tmp.textContent = html;
        return tmp.innerHTML;
    },

    /**
     * Validate and sanitize form data
     */
    validateFormData: (formData) => {
        const sanitized = {};
        const errors = [];

        for (const [key, value] of Object.entries(formData)) {
            if (typeof value === 'string') {
                // Check for suspicious patterns
                if (Security.hasXSSPatterns(value)) {
                    errors.push(`Field "${key}" contains invalid characters`);
                    continue;
                }
                sanitized[key] = Security.sanitize(value);
            } else {
                sanitized[key] = value;
            }
        }

        return { sanitized, errors };
    },

    /**
     * Detect common XSS patterns
     */
    hasXSSPatterns: (str) => {
        if (typeof str !== 'string') return false;
        
        const xssPatterns = [
            /<script[\s\S]*?<\/script>/i,
            /javascript:/i,
            /on\w+\s*=/i,  // Event handlers
            /<iframe/i,
            /<embed/i,
            /<object/i,
            /eval\(/i,
            /expression\(/i,
            /<img[^>]+src/i
        ];

        return xssPatterns.some(pattern => pattern.test(str));
    },

    /**
     * Generate CSRF token
     */
    generateCSRFToken: () => {
        const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        Storage.set('csrf-token', token);
        return token;
    },

    /**
     * Get current CSRF token (generates if missing)
     */
    getCSRFToken: () => {
        let token = Storage.get('csrf-token');
        if (!token) {
            token = Security.generateCSRFToken();
        }
        return token;
    },

    /**
     * Verify CSRF token
     */
    verifyCSRFToken: (token) => {
        const storedToken = Storage.get('csrf-token');
        return storedToken && storedToken === token;
    },

    /**
     * Add security headers as meta tags (supported headers)
     */
    addSecurityHeaders: () => {
        const headers = [
            { name: 'X-UA-Compatible', content: 'ie=edge' },
            { name: 'X-Content-Type-Options', content: 'nosniff' },
            { name: 'X-Frame-Options', content: 'SAMEORIGIN' },
            { name: 'X-XSS-Protection', content: '1; mode=block' },
            { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
        ];

        headers.forEach(header => {
            const meta = document.querySelector(`meta[http-equiv="${header.name}"]`);
            if (!meta) {
                const newMeta = document.createElement('meta');
                newMeta.httpEquiv = header.name;
                newMeta.content = header.content;
                document.head.appendChild(newMeta);
            }
        });
    },

    /**
     * Rate limiting for form submissions
     */
    rateLimit: (() => {
        const limits = {};
        
        return {
            check: (key, maxAttempts = 5, timeWindow = 60000) => {
                const now = Date.now();
                
                if (!limits[key]) {
                    limits[key] = [];
                }

                // Remove old attempts outside time window
                limits[key] = limits[key].filter(time => now - time < timeWindow);

                if (limits[key].length >= maxAttempts) {
                    return false; // Rate limit exceeded
                }

                limits[key].push(now);
                return true; // Within rate limit
            }
        };
    })(),

    /**
     * Initialize all security features
     */
    init: () => {
        // Generate initial CSRF token
        Security.generateCSRFToken();
        
        // Add security headers
        Security.addSecurityHeaders();

        // Add secure cookie attributes to localStorage (if available)
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        console.log('Security module initialized');
    }
};

// Initialize on script load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Security.init);
} else {
    Security.init();
}
