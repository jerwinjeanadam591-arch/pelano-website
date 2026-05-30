/**
 * Testimonials Module
 * Manages testimonial carousel, ratings, and reviews
 */

const Testimonials = (() => {
    let testimonialsList = [];
    let currentIndex = 0;
    const STORAGE_KEY = 'pelano_testimonials';

    /**
     * Initialize testimonials
     */
    function init() {
        loadTestimonials();
        setupCarousel();
        renderTestimonials();
        renderTestimonialGrid();
    }

    /**
     * Load testimonials from storage or use defaults
     */
    function loadTestimonials() {
        // Clear old storage to force reload defaults
        Storage.remove(STORAGE_KEY);
        
        const stored = Storage.get(STORAGE_KEY);
        if (stored && stored.length > 0) {
            testimonialsList = stored;
        } else {
            testimonialsList = getDefaultTestimonials();
            Storage.set(STORAGE_KEY, testimonialsList);
        }
    }

    /**
     * Get default testimonials
     * @returns {Array} Array of testimonial objects
     */
    function getDefaultTestimonials() {
        return [
            {
                id: 1,
                name: 'JerwinJ. severian',
                title: 'CEO, DigiCore tech SolutionsLtd',
                image: '',
                text: 'Pelano Resources provided exceptional service. Their expertise and dedication transformed our business operations. Highly recommended for any organization!',
                rating: 5,
                date: '2025-05-15'
            },
            {
                id: 2,
                name: 'Sarah Ndoto',
                title: 'Marketing Director, Growth Corp',
                image: '',
                text: 'Professional team with outstanding results. They understood our needs and delivered beyond expectations with remarkable efficiency.',
                rating: 5,
                date: '2025-05-10'
            },
            {
                id: 3,
                name: 'David Kamau',
                title: 'Business Owner, E-commerce Plus',
                image: '',
                text: 'Fantastic collaboration. The services provided by Pelano Resources are top-notch, reliable, and truly exceed industry standards.',
                rating: 5,
                date: '2025-05-05'
            },
            {
                id: 4,
                name: 'Maria Santos',
                title: 'Project Manager, Digital Solutions',
                image: '',
                text: 'Excellent experience working with Pelano Resources. They are responsive, professional, and truly care about delivering results.',
                rating: 5,
                date: '2025-04-28'
            },
            {
                id: 5,
                name: 'Ahmed Hassan',
                title: 'Operations Lead, Trade Hub',
                image: '',
                text: 'Reliable partner for our business needs. Great support and consistent quality throughout the engagement. A trusted resource.',
                rating: 4,
                date: '2025-04-20'
            },
            {
                id: 6,
                name: 'Elizabeth Mwangi',
                title: 'Supply Chain Manager, LogiFirst',
                image: '',
                text: 'Working with Pelano Resources has been a game-changer for our supply chain. Efficient, professional, and highly dependable team.',
                rating: 5,
                date: '2025-04-15'
            },
            {
                id: 7,
                name: 'James Kipchoge',
                title: 'Financial Director, Capital Plus',
                image: '',
                text: 'Outstanding service quality and attention to detail. Pelano Resources consistently delivers excellent results that exceed our expectations.',
                rating: 5,
                date: '2025-04-10'
            },
            {
                id: 8,
                name: 'Amina Juma',
                title: 'HR Manager, Premier Services',
                image: '',
                text: 'Impressive professionalism and dedication to client satisfaction. Pelano Resources is our go-to partner for quality solutions.',
                rating: 5,
                date: '2025-04-05'
            },
            {
                id: 9,
                name: 'Robert Okonkwo',
                title: 'Production Manager, Quality Industries',
                image: '',
                text: 'Top-tier service and commitment to excellence. Pelano Resources has been instrumental in improving our operational efficiency.',
                rating: 4,
                date: '2025-03-30'
            },
            {
                id: 10,
                name: 'Fatima Al-Rashid',
                title: 'Business Development, Global Trade Ltd',
                image: '',
                text: 'Exceptional quality and remarkable customer service. Pelano Resources stands out as an innovative and reliable business partner.',
                rating: 5,
                date: '2026-03-25'
            },
            {
                id: 11,
                name: 'Michael Mutua',
                title: 'Project Coordinator, Build Solutions',
                image: '',
                text: 'Reliable, efficient, and highly professional. Pelano Resources has proven to be an invaluable asset to our organization.',
                rating: 5,
                date: '2026-03-20'
            },
            {
                id: 12,
                name: 'Grace Muthoni',
                title: 'Quality Assurance Lead, TechCore',
                image: '',
                text: 'Consistent excellence in all their deliverables. Pelano Resources demonstrates exceptional commitment to quality and customer satisfaction.',
                rating: 5,
                date: '2026-03-15'
            },
            {
                id: 13,
                name: 'Charles Mutuku',
                title: 'Operations Director, MainStream Corp',
                image: '',
                text: 'Professional, responsive, and results-driven. Pelano Resources has been a key factor in our business success and growth.',
                rating: 4,
                date: '2026-03-10'
            },
            {
                id: 14,
                name: 'Naomi Kiplagat',
                title: 'Partnership Manager, Venture Plus',
                image: '',
                text: 'Impressive dedication and outstanding service delivery. Pelano Resources continues to exceed our expectations in every engagement.',
                rating: 5,
                date: '2026-03-05'
            },
            {
                id: 15,
                name: 'Peter Owuor',
                title: 'Executive Manager, Prime Resources',
                image: '',
                text: 'Exceptional partner for quality products and services. Pelano Resources has earned our complete trust and confidence.',
                rating: 5,
                date: '2026-02-28'
            }
        ];
    }

    /**
     * Setup carousel functionality
     */
    function setupCarousel() {
        const carousel = document.getElementById('testimonials-carousel');
        if (!carousel) return;

        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const dotsContainer = carousel.querySelector('[data-carousel-dots]');

        if (prevBtn) prevBtn.addEventListener('click', () => previousTestimonial());
        if (nextBtn) nextBtn.addEventListener('click', () => nextTestimonial());

        // Setup dots
        if (dotsContainer) {
            testimonialsList.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                dot.addEventListener('click', () => goToTestimonial(index));
                dotsContainer.appendChild(dot);
            });
        }

        // Auto-advance carousel every 6 seconds
        setInterval(() => {
            nextTestimonial();
        }, 6000);

        // Touch/swipe support
        setupTouchSupport(carousel);
    }

    /**
     * Setup touch/swipe support for mobile
     * @param {HTMLElement} carousel - Carousel element
     */
    function setupTouchSupport(carousel) {
        let startX = 0;
        const testimonialItem = carousel.querySelector('[data-testimonial-item]');

        if (testimonialItem) {
            testimonialItem.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            testimonialItem.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) {
                    nextTestimonial();
                } else if (endX - startX > 50) {
                    previousTestimonial();
                }
            });
        }
    }

    /**
     * Render testimonials to carousel
     */
    function getAvatarMarkup(testimonial) {
        if (!testimonial.image) return '';
        const imageString = String(testimonial.image);
        const isUrl = /^(https?:\/\/|\.\.?(\/|\\)|\/|images\/|\.\/|.*\.(jpg|jpeg|png|gif|svg))$/i.test(imageString);
        return isUrl
            ? `<img src="${DOM.escape(imageString)}" alt="${DOM.escape(testimonial.name)}" class="testimonial-image">`
            : `<div class="testimonial-avatar">${DOM.escape(imageString)}</div>`;
    }

    function renderTestimonials() {
        const carousel = document.getElementById('testimonials-carousel');
        if (!carousel) return;

        const container = carousel.querySelector('[data-testimonial-item]');
        if (!container) return;

        const testimonial = testimonialsList[currentIndex];
        if (!testimonial) return;

        container.innerHTML = `
            <div class="testimonial-card">
                ${getAvatarMarkup(testimonial)}
                <div class="testimonial-content">
                    <p class="testimonial-text">"${DOM.escape(testimonial.text)}"</p>
                    <div class="testimonial-rating">
                        ${renderStars(testimonial.rating)}
                    </div>
                    <p class="testimonial-author">
                        <strong>${DOM.escape(testimonial.name)}</strong><br>
                        <span class="testimonial-title">${DOM.escape(testimonial.title)}</span>
                    </p>
                </div>
            </div>
        `;

        updateDots();
    }

    /**
     * Render star rating
     * @param {number} rating - Rating value (1-5)
     * @returns {string} HTML string with stars
     */
    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
        }
        return stars;
    }

    /**
     * Update carousel dots
     */
    function updateDots() {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    /**
     * Render testimonials grid
     */
    function renderTestimonialGrid() {
        const gridContainer = document.getElementById('testimonials-grid');
        if (!gridContainer) return;

        gridContainer.innerHTML = testimonialsList.map(testimonial => `
            <div class="testimonial-grid-item">
                <div class="testimonial-grid-card">
                    ${testimonial.image ? `<div class="testimonial-grid-avatar">${testimonial.image}</div>` : ''}
                    <h4 class="testimonial-grid-name">${DOM.escape(testimonial.name)}</h4>
                    <p class="testimonial-grid-title">${DOM.escape(testimonial.title)}</p>
                    <div class="testimonial-grid-rating">
                        ${renderStars(testimonial.rating)}
                    </div>
                    <p class="testimonial-grid-text">"${DOM.escape(testimonial.text)}"</p>
                    <p class="testimonial-grid-date">${testimonial.date}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Go to next testimonial
     */
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialsList.length;
        renderTestimonials();
    }

    /**
     * Go to previous testimonial
     */
    function previousTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialsList.length) % testimonialsList.length;
        renderTestimonials();
    }

    /**
     * Go to specific testimonial
     * @param {number} index - Testimonial index
     */
    function goToTestimonial(index) {
        if (index >= 0 && index < testimonialsList.length) {
            currentIndex = index;
            renderTestimonials();
        }
    }

    /**
     * Add new testimonial
     * @param {Object} testimonial - Testimonial object
     */
    function addTestimonial(testimonial) {
        testimonial.id = testimonialsList.length + 1;
        testimonial.date = new Date().toISOString().split('T')[0];
        testimonialsList.push(testimonial);
        Storage.set(STORAGE_KEY, testimonialsList);
        return testimonial;
    }

    /**
     * Get all testimonials
     * @returns {Array} Array of testimonials
     */
    function getAllTestimonials() {
        return testimonialsList;
    }

    /**
     * Get testimonial by ID
     * @param {number} id - Testimonial ID
     * @returns {Object|null} Testimonial object or null
     */
    function getTestimonial(id) {
        return testimonialsList.find(t => t.id === id);
    }

    /**
     * Delete testimonial
     * @param {number} id - Testimonial ID
     */
    function deleteTestimonial(id) {
        const index = testimonialsList.findIndex(t => t.id === id);
        if (index > -1) {
            testimonialsList.splice(index, 1);
            Storage.set(STORAGE_KEY, testimonialsList);
        }
    }

    /**
     * Get testimonials by rating
     * @param {number} rating - Minimum rating
     * @returns {Array} Filtered testimonials
     */
    function getByRating(rating) {
        return testimonialsList.filter(t => t.rating >= rating);
    }

    // Public API
    return {
        init,
        loadTestimonials,
        renderTestimonials,
        renderTestimonialGrid,
        addTestimonial,
        getAllTestimonials,
        getTestimonial,
        deleteTestimonial,
        getByRating,
        nextTestimonial,
        previousTestimonial,
        goToTestimonial
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Testimonials.init());
} else {
    Testimonials.init();
}
