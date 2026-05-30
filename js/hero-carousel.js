/**
 * Hero Carousel Module
 * Manages auto-playing image carousel in the hero section
 */

const HeroCarousel = (() => {
    let currentIndex = 0;
    let autoPlayInterval;
    const slideDelay = 5000; // 5 seconds

    /**
     * Initialize hero carousel
     */
    function init() {
        setupCarousel();
        startAutoPlay();
        setupEventListeners();
    }

    /**
     * Setup carousel elements
     */
    function setupCarousel() {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.hero-slide');
        const dotsContainer = carousel.querySelector('.hero-carousel-dots');

        if (slides.length === 0) return;

        // Activate first slide
        if (slides[0]) {
            slides[0].classList.add('active');
        }

        // Create navigation dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `hero-carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('type', 'button');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Previous button
        const prevBtn = carousel.querySelector('.hero-carousel-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => previousSlide());
        }

        // Next button
        const nextBtn = carousel.querySelector('.hero-carousel-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => nextSlide());
        }
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
        stopAutoPlay();
        const slides = document.querySelectorAll('#hero-carousel .hero-slide');
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        startAutoPlay();
    }

    /**
     * Go to previous slide
     */
    function previousSlide() {
        stopAutoPlay();
        const slides = document.querySelectorAll('#hero-carousel .hero-slide');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        startAutoPlay();
    }

    /**
     * Go to specific slide
     */
    function goToSlide(index) {
        stopAutoPlay();
        currentIndex = index;
        updateCarousel();
        startAutoPlay();
    }

    /**
     * Update carousel display
     */
    function updateCarousel() {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.hero-slide');
        const dots = carousel.querySelectorAll('.hero-carousel-dot');

        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    /**
     * Start auto-play
     */
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const slides = document.querySelectorAll('#hero-carousel .hero-slide');
            if (slides.length > 0) {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }
        }, slideDelay);
    }

    /**
     * Stop auto-play
     */
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Public API
    return {
        init,
        nextSlide,
        previousSlide,
        goToSlide
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HeroCarousel.init());
} else {
    HeroCarousel.init();
}
