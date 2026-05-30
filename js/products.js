// ===== PRODUCT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;

            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                    // Add animation
                    card.animate([
                        { opacity: 0, transform: 'scale(0.9)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], {
                        duration: 300,
                        easing: 'ease-out'
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('search-input');

if (searchInput && productCards.length > 0) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

// ===== PRODUCT MODAL/LIGHTBOX =====
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close');
const detailsBtns = document.querySelectorAll('.btn-details');

// Product data (expand this with real product information)
const productsData = {
    '1': {
        title: 'Product Name 1',
        image: 'images/products/product-1.jpg',
        description: 'High-quality product with excellent features. Perfect for your needs and built to last with premium materials. This product has been tested and proven to deliver outstanding results for our customers.',
        features: [
            'High-quality materials',
            'Durable and long-lasting',
            'Excellent customer support',
            'Competitive pricing',
            'Warranty included'
        ]
    },
    '2': {
        title: 'Product Name 2',
        image: 'images/products/product-2.jpg',
        description: 'Premium quality product designed for durability and performance. Meets all quality standards and certified for excellence. Perfect for both residential and commercial use.',
        features: [
            'Premium quality',
            'Certified excellence',
            'Versatile use',
            'Easy maintenance',
            'Eco-friendly'
        ]
    },
    '3': {
        title: 'Product Name 3',
        image: 'images/products/product-3.jpg',
        description: 'Reliable product backed by our commitment to quality. Excellent value and dependable performance with proven track record of customer satisfaction.',
        features: [
            'Reliable performance',
            'Great value',
            'Customer favorite',
            'Fast delivery',
            'Quality guarantee'
        ]
    },
    '4': {
        title: 'Product Name 4',
        image: 'images/products/product-4.jpg',
        description: 'Professional grade product suitable for various applications. Trusted by customers nationwide with consistent quality and performance.',
        features: [
            'Professional grade',
            'Multi-application',
            'Nationwide trusted',
            'Consistent quality',
            'Expert support'
        ]
    },
    '5': {
        title: 'Product Name 5',
        image: 'images/products/product-5.jpg',
        description: 'Innovative solution with modern features. Designed to exceed your expectations with cutting-edge technology and superior craftsmanship.',
        features: [
            'Innovative design',
            'Modern features',
            'Cutting-edge tech',
            'Superior craftsmanship',
            'Future-proof'
        ]
    },
    '6': {
        title: 'Product Name 6',
        image: 'images/products/product-6.jpg',
        description: 'Customer favorite with proven track record. Quality you can trust and depend on for all your needs with excellent after-sales support.',
        features: [
            'Customer favorite',
            'Proven track record',
            'Trustworthy quality',
            'After-sales support',
            'Highly rated'
        ]
    }
};

// Open modal
if (detailsBtns.length > 0 && modal) {
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.product;
            const product = productsData[productId];

            if (product) {
                document.getElementById('modal-title').textContent = product.title;
                document.getElementById('modal-image').src = product.image;
                document.getElementById('modal-image').alt = product.title;
                document.getElementById('modal-description').textContent = product.description;

                // Update features list
                const featuresList = document.querySelector('.modal-features ul');
                featuresList.innerHTML = product.features
                    .map(feature => `<li>${feature}</li>`).join('');

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close modal
if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});