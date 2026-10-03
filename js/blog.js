/**
 * Blog Module
 * Manages blog posts, articles, filtering, and search
 */

const Blog = (() => {
    let blogPosts = [];
    let draftPosts = [];
    let contentReady = Promise.resolve();
    let activeCategory = 'all';
    let activeQuery = '';
    const STORAGE_KEY_POSTS = 'pelano_blog_posts';
    const STORAGE_KEY_DRAFTS = 'pelano_blog_drafts';
    const defaultPostImages = [
        'images/gallery/products/treated-timber.jpg',
        'images/gallery/products/utility-poles.jpg',
        'images/gallery/products/telecom-poles.jpg',
        'images/gallery/products/palettes-1.jpeg',
        'images/gallery/products/railway-sleepers.jpeg'
    ];

    /**
     * Initialize blog module
     */
    function init() {
        loadBlogPosts();
        setupBlogPage();
        contentReady = loadManagedPosts();
    }

    async function loadManagedPosts() {
        if (!window.PelanoContentApi?.isConfigured) return;
        try {
            const managed = await window.PelanoContentApi.getPublishedPosts();
            if (!Array.isArray(managed)) return;
            const mapped = managed.map(post => ({
                ...post,
                readTime: post.read_time || 3,
                status: 'published'
            }));
            const managedSlugs = new Set(mapped.map(post => post.slug));
            blogPosts = [...mapped, ...getPublishedPosts().filter(post => !managedSlugs.has(post.slug))];
            const filterContainer = document.getElementById('blog-filters');
            if (filterContainer) {
                filterContainer.querySelectorAll('[data-blog-filter]:not([data-blog-filter="all"])').forEach(button => button.remove());
                getCategories().forEach(category => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.dataset.blogFilter = category;
                    button.textContent = category;
                    filterContainer.append(button);
                });
            }
            renderCurrentResults();
        } catch (error) {
            console.error('Managed blog content could not be loaded; retaining the published local content.', error);
        }
    }

    /**
     * Load blog posts from storage or use defaults
     */
    function loadBlogPosts() {
        const stored = Storage.get(STORAGE_KEY_POSTS);
        if (stored && stored.length > 0) {
            blogPosts = stored;
        } else {
            blogPosts = getDefaultPosts();
            Storage.set(STORAGE_KEY_POSTS, blogPosts);
        }

        const storedDrafts = Storage.get(STORAGE_KEY_DRAFTS);
        if (storedDrafts && storedDrafts.length > 0) {
            draftPosts = storedDrafts;
        }
    }

    /**
     * Get default blog posts
     * @returns {Array} Array of blog post objects
     */
    function getDefaultPosts() {
        return [
            {
                id: 1,
                title: 'The Future of Quality Resources in Tanzania',
                slug: 'future-quality-resources-tanzania',
                excerpt: 'A practical framework for comparing forest-product suppliers and preparing a clear project enquiry in Tanzania.',
                content: 'A useful supplier comparison starts with a clear requirement, not a headline claim. Record the product type, intended application, estimated quantity, preferred dimensions and destination before requesting a quotation.\n\nAsk suppliers to confirm which specifications and quality documents apply to the exact product being offered. Availability, treatment details, transport and lead times can vary by order, so get those points confirmed in writing before making a procurement decision.\n\nPelano Resources supplies treated timber, utility and telecom poles, pallets and railway sleepers. Share your project requirements with the team to confirm current product details and delivery options.',
                image: 'images/gallery/IMG_5146.JPG',
                author: 'Pelano Resources Ltd',
                category: 'News',
                tags: ['resources', 'tanzania', 'quality', 'supply'],
                date: '2026-05-20',
                readTime: 5,
                status: 'published'
            },
            {
                id: 2,
                title: 'Top 5 Tips for Choosing Quality Resources',
                slug: 'top-5-tips-quality-resources',
                excerpt: 'Five questions to ask when selecting treated timber for a construction or infrastructure project.',
                content: '1. Define the application. Explain whether the timber is for a structural, outdoor, packaging or other use so the supplier can discuss relevant options.\n\n2. State the dimensions and quantity you need. If these are still estimates, label them as estimates and ask what sizes are currently available.\n\n3. Describe the exposure and treatment requirements specified by your project team. Do not assume that a general product description proves suitability for a particular design or environment.\n\n4. Ask which grading, treatment or quality documents are available for the offered product and confirm that they match your requirements.\n\n5. Agree the delivery destination, access constraints and required timeframe. Confirm final specifications, availability, price and transport arrangements before placing an order.',
                image: 'images/gallery/IMG_5139.JPG',
                author: 'Pelano Resources Ltd',
                category: 'Guide',
                tags: ['quality', 'tips', 'resources', 'guide'],
                date: '2026-05-15',
                readTime: 7,
                status: 'published'
            },
            {
                id: 3,
                title: 'Responsible Timber Procurement: Questions to Ask',
                slug: 'sustainable-resource-management',
                excerpt: 'A buyer checklist for understanding product origin, documentation and responsible procurement requirements.',
                content: 'Responsible procurement begins by identifying the requirements that apply to your project and market. Ask what origin, chain-of-custody or other supporting documentation is available for the specific product and order; do not rely on broad sustainability language alone.\n\nCheck that product descriptions, quantities and supporting documents refer to the same goods. Where your organization has sourcing or environmental criteria, share them before ordering so the supplier can confirm what can be provided.\n\nThis checklist is a starting point, not a certification or legal determination. Confirm applicable requirements with your project team and the relevant authorities.',
                image: 'images/gallery/IMG_5137.JPG',
                author: 'Pelano Resources Ltd',
                category: 'Sustainability',
                tags: ['responsible procurement', 'documentation', 'timber', 'sourcing'],
                date: '2026-05-10',
                readTime: 6,
                status: 'published'
            },
            {
                id: 4,
                title: 'Planning a Forest-Product Supply Project',
                slug: 'case-study-project-implementation',
                excerpt: 'Prepare a complete enquiry with product, quantity, specification, documentation and delivery details.',
                content: 'A complete supply enquiry helps both sides identify open questions early. Start with the product category, intended use, estimated quantity and any dimensions or treatment requirements already defined by your project.\n\nInclude the delivery location, target timeframe, site access considerations and documents required for approval. If some information is not yet known, say so rather than guessing; the supplier can then explain what must be confirmed before a quotation is final.\n\nUse the procurement checklist in the resources centre to organize these details. Final availability, price, specifications and delivery arrangements should be confirmed for each order.',
                image: 'images/gallery/IMG_5133.JPG',
                author: 'Pelano Resources Ltd',
                category: 'Guide',
                tags: ['project planning', 'procurement', 'delivery', 'checklist'],
                date: '2026-05-05',
                readTime: 8,
                status: 'published'
            },
            {
                id: 5,
                title: 'Pallets and Timber for Storage and Logistics',
                slug: 'industry-trends-market-insights',
                excerpt: 'What to include when enquiring about pallets or timber packaging for storage and transport.',
                content: 'Start by describing the goods being handled, the expected load, storage conditions and how the pallet will move through your operation. Share required dimensions, quantities, handling equipment and any return or reuse needs that affect the design.\n\nFor transport or export use, check which packaging rules and documents apply to your route and cargo with the relevant logistics provider or authority. Do not assume a general-purpose pallet meets a specific shipping or regulatory requirement.\n\nAsk the supplier to confirm available options, specifications, quantity, price and delivery plan for your order. Browse Pelano Resources products or send an enquiry with your handling requirements.',
                image: 'images/gallery/IMG_5121.JPG',
                author: 'Pelano Resources Ltd',
                category: 'Insights',
                tags: ['pallets', 'logistics', 'storage', 'procurement'],
                date: '2026-04-28',
                readTime: 9,
                status: 'published'
            }
        ];
    }

    /**
     * Setup blog page functionality
     */
    function setupBlogPage() {
        const searchInput = document.getElementById('blog-search');
        const filterContainer = document.getElementById('blog-filters');
        const postsContainer = document.getElementById('blog-posts');

        if (filterContainer && filterContainer.querySelectorAll('[data-blog-filter]').length === 1) {
            getCategories().forEach(category => {
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.blogFilter = category;
                button.textContent = category;
                filterContainer.append(button);
            });
        }

        filterContainer?.addEventListener('click', event => {
            const button = event.target.closest('[data-blog-filter]');
            if (!button) return;
            activeCategory = button.dataset.blogFilter || 'all';
            updateActiveFilter(button);
            renderCurrentResults();
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                activeQuery = e.target.value;
                renderCurrentResults();
            });
        }

        renderPosts(getPublishedPosts(), postsContainer);
        setupNewsletter();
    }

    function renderCurrentResults() {
        const matchesCategory = activeCategory === 'all' ? getPublishedPosts() : getByCategory(activeCategory);
        const query = activeQuery.trim().toLocaleLowerCase();
        const posts = query ? matchesCategory.filter(post => {
            const searchable = `${post.title} ${post.excerpt} ${post.content} ${post.category} ${post.tags.join(' ')}`.toLocaleLowerCase();
            return searchable.includes(query);
        }) : matchesCategory;
        renderPosts(posts, document.getElementById('blog-posts'));
    }

    function setupNewsletter() {
        const emailInput = document.getElementById('newsletter-email');
        const consent = document.getElementById('newsletter-consent');
        const status = document.getElementById('newsletter-status');
        const form = document.getElementById('newsletter-form');
        const button = form?.querySelector('[data-newsletter-submit]');
        if (!emailInput || !consent || !status || !form || !button) return;
        let isSubmitting = false;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (isSubmitting) return;
            if (!form.reportValidity() || !consent.checked) {
                status.textContent = 'Enter a valid email and accept the newsletter consent.';
                return;
            }
            isSubmitting = true;
            button.disabled = true;
            const email = emailInput.value.trim();
            try {
                if (window.PelanoContentApi?.isNewsletterConfigured) {
                    const result = await window.PelanoContentApi.subscribe(email, true);
                    status.textContent = result.submitted
                        ? 'Please check your inbox to confirm your subscription. You can unsubscribe at any time.'
                        : 'Newsletter sign-up could not be completed. Please contact us directly.';
                    if (result.submitted) window.PelanoAnalytics?.track('newsletter_subscribe', { form: 'newsletter' });
                } else {
                    status.textContent = 'Newsletter sign-up is not active yet. Your email has not been saved; please contact us to receive updates.';
                }
                if (window.PelanoContentApi?.isNewsletterConfigured) {
                    emailInput.value = '';
                    consent.checked = false;
                }
            } catch (error) {
                console.error('Newsletter subscription could not be sent to the configured service.', error);
                status.textContent = 'Subscription could not be completed right now. Please contact us directly.';
            } finally {
                isSubmitting = false;
                button.disabled = false;
            }
        });
    }

    /**
     * Render blog posts to container
     * @param {Array} posts - Posts to render
     * @param {HTMLElement} container - Container element
     */
    function renderPosts(posts, container) {
        if (!container) return;

        if (posts.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: var(--spacing-xl);">No posts found.</p>';
            return;
        }

        container.innerHTML = posts.map(post => {
            const imageSrc = getPostImage(post);
            return `
            <article class="blog-card" data-post-id="${post.id}">
                <div class="blog-image">
                    <picture>
                        <source srcset="${DOM.escape(imageSrc.replace(/\.(jpe?g)$/i, '.webp'))}" type="image/webp">
                        <img src="${DOM.escape(imageSrc)}" alt="${DOM.escape(post.title)}" class="blog-img" loading="lazy" decoding="async">
                    </picture>
                    <span class="blog-category">${DOM.escape(post.category)}</span>
                </div>
                <div class="blog-content">
                    <h3 class="blog-title"><a href="blog-detail.html?slug=${encodeURIComponent(post.slug)}">${DOM.escape(post.title)}</a></h3>
                    <p class="blog-excerpt">${DOM.escape(post.excerpt)}</p>
                    <div class="blog-meta">
                        <span class="blog-author">By ${DOM.escape(post.author)}</span>
                        <span class="blog-date">${formatDate(post.date)}</span>
                        <span class="blog-read-time">${post.readTime} min read</span>
                    </div>
                    <div class="blog-tags">
                        ${post.tags.map(tag => `<a href="blog.html?tag=${encodeURIComponent(tag)}" class="blog-tag">#${DOM.escape(tag)}</a>`).join('')}
                    </div>
                    <a href="blog-detail.html?slug=${encodeURIComponent(post.slug)}" class="blog-read-more">Read More →</a>
                </div>
            </article>
        `;
        }).join('');
    }

    function getPostImage(post) {
        const legacyImage = post.image?.match(/^images\/blog-([1-5])\.jpg$/);
        if (legacyImage) {
            return defaultPostImages[Number(legacyImage[1]) - 1];
        }
        return post.image || defaultPostImages[(post.id - 1) % defaultPostImages.length];
    }

    /**
     * Get published posts only
     * @returns {Array} Published posts
     */
    function getPublishedPosts() {
        return blogPosts.filter(post => post.status === 'published');
    }

    /**
     * Get post by ID
     * @param {number} id - Post ID
     * @returns {Object|null} Post object or null
     */
    function getPostById(id) {
        return blogPosts.find(post => post.id === id);
    }

    /**
     * Get post by slug
     * @param {string} slug - Post slug
     * @returns {Object|null} Post object or null
     */
    function getPostBySlug(slug) {
        return blogPosts.find(post => post.slug === slug);
    }

    /**
     * Get posts by category
     * @param {string} category - Category name
     * @returns {Array} Posts in category
     */
    function getByCategory(category) {
        if (category === 'all') return getPublishedPosts();
        return blogPosts.filter(post => 
            post.status === 'published' && post.category.toLowerCase() === category.toLowerCase()
        );
    }

    /**
     * Get posts by tag
     * @param {string} tag - Tag name
     * @returns {Array} Posts with tag
     */
    function getByTag(tag) {
        return blogPosts.filter(post => 
            post.status === 'published' && post.tags.includes(tag.toLowerCase())
        );
    }

    /**
     * Search posts
     * @param {string} query - Search query
     * @returns {Array} Matching posts
     */
    function search(query) {
        const q = query.toLowerCase();
        return blogPosts.filter(post => 
            post.status === 'published' && (
                post.title.toLowerCase().includes(q) ||
                post.excerpt.toLowerCase().includes(q) ||
                post.content.toLowerCase().includes(q) ||
                post.tags.some(tag => tag.toLowerCase().includes(q))
            )
        );
    }

    /**
     * Filter posts by category
     * @param {string} category - Category name
     */
    function filterPostsByCategory(category) {
        activeCategory = category;
        renderCurrentResults();
    }

    /**
     * Search posts (UI update)
     * @param {string} query - Search query
     */
    function searchPosts(query) {
        activeQuery = query;
        renderCurrentResults();
    }

    /**
     * Update active filter button
     * @param {HTMLElement} activeBtn - Active button
     */
    function updateActiveFilter(activeBtn) {
        document.querySelectorAll('[data-blog-filter]').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    /**
     * Add new blog post
     * @param {Object} post - Post object
     */
    function addPost(post) {
        post.id = Math.max(...blogPosts.map(p => p.id), 0) + 1;
        post.date = new Date().toISOString().split('T')[0];
        post.slug = post.title.toLowerCase().replace(/\s+/g, '-');
        post.status = post.status || 'draft';
        
        if (post.status === 'draft') {
            draftPosts.push(post);
            Storage.set(STORAGE_KEY_DRAFTS, draftPosts);
        } else {
            blogPosts.push(post);
            Storage.set(STORAGE_KEY_POSTS, blogPosts);
        }
        return post;
    }

    /**
     * Get all categories
     * @returns {Array} Unique categories
     */
    function getCategories() {
        const categories = new Set();
        getPublishedPosts().forEach(post => {
            categories.add(post.category);
        });
        return Array.from(categories).sort();
    }

    /**
     * Get all tags
     * @returns {Array} Unique tags
     */
    function getTags() {
        const tags = new Set();
        getPublishedPosts().forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }

    /**
     * Get related posts
     * @param {number} postId - Post ID
     * @param {number} limit - Number of related posts
     * @returns {Array} Related posts
     */
    function getRelated(postId, limit = 3) {
        const post = getPostById(postId);
        if (!post) return [];

        return getPublishedPosts()
            .filter(p => p.id !== postId && p.tags.some(tag => post.tags.includes(tag)))
            .slice(0, limit);
    }

    /**
     * Increment view count
     * @param {number} postId - Post ID
     */
    function incrementViews(postId) {
        const post = getPostById(postId);
        if (post) {
            post.views = (post.views || 0) + 1;
            Storage.set(STORAGE_KEY_POSTS, blogPosts);
        }
    }

    /**
     * Format date
     * @param {string} date - Date string
     * @returns {string} Formatted date
     */
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    // Public API
    return {
        init,
        get ready() { return contentReady; },
        loadBlogPosts,
        getPublishedPosts,
        getPostById,
        getPostBySlug,
        getByCategory,
        getByTag,
        search,
        addPost,
        getCategories,
        getTags,
        getRelated,
        incrementViews,
        renderPosts,
        filterPostsByCategory,
        searchPosts,
        formatDate
    };
})();

window.PelanoBlog = Blog;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Blog.init());
} else {
    Blog.init();
}
