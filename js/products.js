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
        title: 'Treated Timber',
        image: 'images/products/treated-timber.jpg',
        description: 'Premium pressure-treated timber for long-lasting construction and outdoor use.',
        features: [
            'Pressure-treated for durability',
            'Ideal for construction and decking',
            'Moisture and rot-resistant',
            'Consistent sizing and grading',
            'Built for long-term performance'
        ]
    },
    '2': {
        title: 'Utility Poles',
        image: 'images/products/utility-poles.jpg',
        description: 'Strong utility poles manufactured for power distribution and infrastructure projects.',
        features: [
            'High strength and stability',
            'Treated for outdoor durability',
            'Certified for utility use',
            'Perfect for power and lighting',
            'Designed for easy installation'
        ]
    },
    '2b': {
        title: 'Telecom Poles',
        image: 'images/products/telecom-poles.jpg',
        description: 'Robust telecom poles designed to support telecommunications and broadband connectivity.',
        features: [
            'Engineered for telecom networks',
            'Impact and weather resistant',
            'Precision-treated for longevity',
            'Suitable for rural and urban installations',
            'Reliable performance across environments'
        ]
    },
    '2c': {
        title: 'Premium Telecom Poles',
        image: 'images/products/telecom2.jpeg',
        description: 'Premium-grade telecom poles for demanding telecom and infrastructure installations.',
        features: [
            'Extra-durable pole material',
            'High load-bearing capacity',
            'Superior treatment for longevity',
            'Designed for mission-critical networks',
            'Delivered ready for installation'
        ]
    },
    '3': {
        title: 'Standard Pallets',
        image: 'images/products/palettes-1.jpeg',
        description: 'Durable wooden pallets for storage, shipping, and material handling operations.',
        features: [
            'Heavy-duty timber construction',
            'Optimized for logistics',
            'Stackable and stable',
            'Weather-resistant finish',
            'Designed for industrial handling'
        ]
    },
    '3a': {
        title: 'Heavy Duty Pallets',
        image: 'images/products/palettes-1.jpeg',
        description: 'Industrial-grade pallets built for high-volume storage and heavy loads.',
        features: [
            'Reinforced for extra weight',
            'Long-lasting construction',
            'Perfect for heavy goods',
            'Safe handling and transport',
            'Quality-assured manufacturing'
        ]
    },
    '5': {
        title: 'Railway Sleepers',
        image: 'images/products/railway-sleepers.jpeg',
        description: 'Durable railway sleepers engineered for track stability and long-term performance.',
        features: [
            'Quality timber for rail use',
            'Consistent dimensions',
            'Treated for weather resistance',
            'Designed for stable rail installation',
            'Trusted in infrastructure projects'
        ]
    },
    '5a': {
        title: 'Premium Railway Sleepers',
        image: 'images/products/railway-sleepers.jpeg',
        description: 'Premium-treated sleepers for high-traffic railway and industrial applications.',
        features: [
            'Premium-grade timber',
            'Enhanced treatment protection',
            'Excellent load-bearing capacity',
            'Built for long service life',
            'Suitable for demanding environments'
        ]
    },
    '6': {
        title: 'Structural Timber',
        image: 'images/products/treated-timber.jpg',
        description: 'Certified structural timber suited for construction, framing, and heavy-duty applications.',
        features: [
            'Grade-certified structure timber',
            'Stable and reliable for builds',
            'Ideal for load-bearing use',
            'Properly treated for long life',
            'Consistent and uniform finish'
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