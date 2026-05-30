/**
 * Social Integration Module
 * Handles social media links, share buttons, and social features
 */

const Social = (() => {
    const STORAGE_KEY = 'pelano_social_config';

    /**
     * Default social media configuration
     */
    const defaultConfig = {
        facebook: 'https://facebook.com/pelanoresources',
        twitter: 'https://twitter.com/pelanoresources',
        linkedin: 'https://linkedin.com/company/pelano-resources',
        instagram: 'https://instagram.com/pelanoresources',
        youtube: 'https://youtube.com/@pelanoresources',
        whatsapp: 'https://wa.me/255755885888',
        email: 'info@pelanoresources.co.tz'
    };

    /**
     * Initialize social module
     */
    function init() {
        setupSocialLinks();
        setupShareButtons();
        setupInstagramFeed();
    }

    /**
     * Setup social media links
     */
    function setupSocialLinks() {
        const config = getConfig();
        const socialLinks = document.querySelectorAll('[data-social-link]');

        socialLinks.forEach(link => {
            const platform = link.getAttribute('data-social-link');
            if (config[platform]) {
                link.href = config[platform];
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('aria-label', `Visit our ${platform}`);
            }
        });
    }

    /**
     * Setup share buttons
     */
    function setupShareButtons() {
        const shareButtons = document.querySelectorAll('[data-share-button]');

        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.getAttribute('data-share-button');
                const title = button.getAttribute('data-share-title') || document.title;
                const text = button.getAttribute('data-share-text') || document.title;
                const url = button.getAttribute('data-share-url') || window.location.href;

                shareOnPlatform(platform, { title, text, url });
            });
        });
    }

    /**
     * Share on specified platform
     * @param {string} platform - Social platform name
     * @param {Object} data - Share data (title, text, url)
     */
    function shareOnPlatform(platform, data) {
        const { title, text, url } = data;
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);
        let shareUrl = '';

        switch (platform.toLowerCase()) {
            case 'facebook':
                shareUrl = `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%0D%0A${encodedUrl}`;
                break;
            case 'copy':
                copyToClipboard(url);
                Notify.success('Link copied to clipboard!');
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            Analytics.trackEvent('social_share', platform);
        }
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     */
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    /**
     * Fallback copy to clipboard for older browsers
     * @param {string} text - Text to copy
     */
    function fallbackCopyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    /**
     * Setup Instagram feed embed
     * Requires Instagram API (optional)
     */
    function setupInstagramFeed() {
        const instagramFeed = document.getElementById('instagram-feed');
        if (!instagramFeed) return;

        // Load Instagram embed script if needed
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }

        // Alternative: Load sample Instagram posts
        const posts = getInstagramPosts();
        if (posts && posts.length > 0) {
            renderInstagramFeed(instagramFeed, posts);
        }
    }

    /**
     * Get Instagram posts (mock data - replace with API call)
     * @returns {Array} Array of Instagram post objects
     */
    function getInstagramPosts() {
        return [
            {
                id: 1,
                image: 'images/instagram-1.jpg',
                caption: 'Amazing project with our team',
                likes: 234,
                comments: 12,
                url: 'https://instagram.com/p/SAMPLE1'
            },
            {
                id: 2,
                image: 'images/instagram-2.jpg',
                caption: 'Innovation in action',
                likes: 456,
                comments: 23,
                url: 'https://instagram.com/p/SAMPLE2'
            },
            {
                id: 3,
                image: 'images/instagram-3.jpg',
                caption: 'Meet our talented team',
                likes: 345,
                comments: 18,
                url: 'https://instagram.com/p/SAMPLE3'
            }
        ];
    }

    /**
     * Render Instagram feed
     * @param {HTMLElement} container - Container element
     * @param {Array} posts - Array of posts
     */
    function renderInstagramFeed(container, posts) {
        const feedHtml = posts.map(post => `
            <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="instagram-post">
                <img src="${post.image}" alt="${DOM.escape(post.caption)}" class="instagram-image">
                <div class="instagram-overlay">
                    <span class="instagram-stat">❤️ ${post.likes}</span>
                    <span class="instagram-stat">💬 ${post.comments}</span>
                </div>
            </a>
        `).join('');

        container.innerHTML = feedHtml;
    }

    /**
     * Get social configuration
     * @returns {Object} Social config
     */
    function getConfig() {
        const stored = Storage.get(STORAGE_KEY);
        return stored || defaultConfig;
    }

    /**
     * Update social configuration
     * @param {Object} config - New config
     */
    function updateConfig(config) {
        const updated = { ...getConfig(), ...config };
        Storage.set(STORAGE_KEY, updated);
        setupSocialLinks();
        return updated;
    }

    /**
     * Get share metrics
     * @param {string} platform - Platform name
     * @returns {Object} Share metrics
     */
    function getShareMetrics(platform) {
        const key = `shares_${platform}`;
        const metrics = Storage.get(key) || { count: 0, lastShare: null };
        return metrics;
    }

    /**
     * Track social share
     * @param {string} platform - Platform name
     */
    function trackShare(platform) {
        const key = `shares_${platform}`;
        const metrics = getShareMetrics(platform);
        metrics.count = (metrics.count || 0) + 1;
        metrics.lastShare = new Date().toISOString();
        Storage.set(key, metrics);
    }

    /**
     * Get follow button HTML
     * @param {string} platform - Platform name
     * @returns {string} HTML for follow button
     */
    function getFollowButton(platform) {
        const config = getConfig();
        const url = config[platform];
        const icons = {
            facebook: '📘',
            twitter: '𝕏',
            linkedin: '💼',
            instagram: '📷',
            youtube: '▶️'
        };

        return `
            <a href="${url}" target="_blank" rel="noopener noreferrer" 
               class="social-follow-btn" 
               aria-label="Follow us on ${platform}">
                <span class="social-icon">${icons[platform] || '🔗'}</span>
                <span class="social-label">Follow</span>
            </a>
        `;
    }

    // Public API
    return {
        init,
        shareOnPlatform,
        getConfig,
        updateConfig,
        getShareMetrics,
        trackShare,
        getFollowButton,
        getInstagramPosts,
        copyToClipboard
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Social.init());
} else {
    Social.init();
}
