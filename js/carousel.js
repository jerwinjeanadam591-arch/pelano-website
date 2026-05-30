/**
 * Picture Carousel Module
 * Manages dynamic picture display carousel with 4 images
 */

const PictureCarousel = (() => {
    let currentIndex = 0;
    let autoPlayInterval;
    const images = [
        'images/products/product-1.jpg',
        'images/products/product-2.jpg',
        'images/products/product-3.jpg',
        'images/gallery/gallery-1.jpg'
    ];

    /**
     * Initialize carousel
     */
    function init() {
        setupCarousel();
        startAutoPlay();
        setupEventListeners();
    }

    /**
     * Setup carousel HTML structure
     */
    function setupCarousel() {
        const carousel = document.getElementById('picture-carousel');
        if (!carousel) return;

        const carouselInner = carousel.querySelector('.carousel-inner');
        const dotsContainer = carousel.querySelector('.carousel-controls');

        if (!carouselInner || !dotsContainer) return;

        // Create carousel items
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            item.innerHTML = `<img src="${img}" alt="Pelano Resources - Image ${index + 1}" loading="lazy">`;
            carouselInner.appendChild(item);
        });

        // Create navigation dots
        images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('type', 'button');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Previous button
        const prevBtn = carousel.querySelector('.carousel-nav-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => previousSlide());
        }

        // Next button
        const nextBtn = carousel.querySelector('.carousel-nav-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => nextSlide());
        }

        // Touch support
        setupTouchSupport(carousel);
    }

    /**
     * Setup touch/swipe support
     */
    function setupTouchSupport(carousel) {
        let startX = 0;
        const wrapper = carousel.querySelector('.carousel-wrapper');

        if (wrapper) {
            wrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            wrapper.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) {
                    nextSlide();
                } else if (endX - startX > 50) {
                    previousSlide();
                }
            });
        }
    }

    /**
     * Setup event listeners for auto-play pause on hover
     */
    function setupEventListeners() {
        const carousel = document.getElementById('picture-carousel');
        if (!carousel) return;

        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
        stopAutoPlay();
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
        startAutoPlay();
    }

    /**
     * Go to previous slide
     */
    function previousSlide() {
        stopAutoPlay();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
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
        const carousel = document.getElementById('picture-carousel');
        if (!carousel) return;

        // Update active item
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });

        // Update active dot
        const dots = carousel.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    /**
     * Start auto-play
     */
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }, 5000);
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
    document.addEventListener('DOMContentLoaded', () => PictureCarousel.init());
} else {
    PictureCarousel.init();
}
