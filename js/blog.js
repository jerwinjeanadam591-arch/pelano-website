/**
 * Blog Module
 * Manages blog posts, articles, filtering, and search
 */

const Blog = (() => {
    let blogPosts = [];
    let draftPosts = [];
    const STORAGE_KEY_POSTS = 'pelano_blog_posts';
    const STORAGE_KEY_DRAFTS = 'pelano_blog_drafts';

    /**
     * Initialize blog module
     */
    function init() {
        loadBlogPosts();
        setupBlogPage();
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
                excerpt: 'Exploring how Pelano Resources is shaping the future of quality resource supply in Tanzania.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                image: 'images/blog-1.jpg',
                author: 'John Mwamba',
                category: 'News',
                tags: ['resources', 'tanzania', 'quality', 'supply'],
                date: '2026-05-20',
                readTime: 5,
                views: 234,
                status: 'published'
            },
            {
                id: 2,
                title: 'Top 5 Tips for Choosing Quality Resources',
                slug: 'top-5-tips-quality-resources',
                excerpt: 'Learn how to identify and choose the best quality resources for your business needs.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                image: 'images/blog-2.jpg',
                author: 'Sarah Ndoto',
                category: 'Guide',
                tags: ['quality', 'tips', 'resources', 'guide'],
                date: '2026-05-15',
                readTime: 7,
                views: 456,
                status: 'published'
            },
            {
                id: 3,
                title: 'Sustainable Resource Management',
                slug: 'sustainable-resource-management',
                excerpt: 'How sustainable practices are transforming the resource industry.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                image: 'images/blog-3.jpg',
                author: 'David Kamau',
                category: 'Sustainability',
                tags: ['sustainability', 'environment', 'resources'],
                date: '2026-05-10',
                readTime: 6,
                views: 345,
                status: 'published'
            },
            {
                id: 4,
                title: 'Case Study: Successful Project Implementation',
                slug: 'case-study-project-implementation',
                excerpt: 'A detailed case study of how Pelano Resources successfully implemented a large-scale project.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                image: 'images/blog-4.jpg',
                author: 'Maria Santos',
                category: 'Case Study',
                tags: ['case-study', 'implementation', 'success'],
                date: '2026-05-05',
                readTime: 8,
                views: 567,
                status: 'published'
            },
            {
                id: 5,
                title: 'Industry Trends and Market Insights',
                slug: 'industry-trends-market-insights',
                excerpt: 'Latest industry trends and market insights for resource businesses.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                image: 'images/blog-5.jpg',
                author: 'Ahmed Hassan',
                category: 'Insights',
                tags: ['trends', 'market', 'insights', 'industry'],
                date: '2026-04-28',
                readTime: 9,
                views: 678,
                status: 'published'
            }
        ];
    }

    /**
     * Setup blog page functionality
     */
    function setupBlogPage() {
        const filterButtons = document.querySelectorAll('[data-blog-filter]');
        const searchInput = document.getElementById('blog-search');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-blog-filter');
                filterPostsByCategory(category);
                updateActiveFilter(btn);
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchPosts(e.target.value);
            });
        }
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

        container.innerHTML = posts.map(post => `
            <article class="blog-card" data-post-id="${post.id}">
                <div class="blog-image">
                    <img src="${post.image}" alt="${DOM.escape(post.title)}" class="blog-img">
                    <span class="blog-category">${DOM.escape(post.category)}</span>
                </div>
                <div class="blog-content">
                    <h3 class="blog-title"><a href="blog-detail.html?id=${post.id}">${DOM.escape(post.title)}</a></h3>
                    <p class="blog-excerpt">${DOM.escape(post.excerpt)}</p>
                    <div class="blog-meta">
                        <span class="blog-author">By ${DOM.escape(post.author)}</span>
                        <span class="blog-date">${formatDate(post.date)}</span>
                        <span class="blog-read-time">${post.readTime} min read</span>
                    </div>
                    <div class="blog-tags">
                        ${post.tags.map(tag => `<a href="blog.html?tag=${tag}" class="blog-tag">#${DOM.escape(tag)}</a>`).join('')}
                    </div>
                    <a href="blog-detail.html?id=${post.id}" class="blog-read-more">Read More →</a>
                </div>
            </article>
        `).join('');
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
        const container = document.getElementById('blog-posts');
        const posts = getByCategory(category);
        renderPosts(posts, container);
    }

    /**
     * Search posts (UI update)
     * @param {string} query - Search query
     */
    function searchPosts(query) {
        const container = document.getElementById('blog-posts');
        const results = search(query);
        renderPosts(results, container);
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

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Blog.init());
} else {
    Blog.init();
}
