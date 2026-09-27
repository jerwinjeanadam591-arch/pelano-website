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

// Open modal
if (detailsBtns.length > 0 && modal) {
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const title = productCard?.querySelector('.product-info h3')?.textContent?.trim();
            const description = productCard?.querySelector('.product-description')?.textContent?.trim();
            const image = productCard?.querySelector('.product-image');

            if (!title || !description || !image) {
                console.error('Unable to open product details: product card is incomplete.', btn);
                return;
            }

            document.getElementById('modal-title').textContent = title;
            const modalImage = document.getElementById('modal-image');
            modalImage.src = image.currentSrc || image.src;
            modalImage.alt = image.alt || title;
            document.getElementById('modal-description').textContent = description;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
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