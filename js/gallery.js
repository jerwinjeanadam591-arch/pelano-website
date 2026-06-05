// ===== GALLERY MANAGER FOR 33 UNIQUE IMAGES (NO DUPLICATES) =====

class GalleryManager {
    constructor() {
        // Combined data structure: each photo paired with its unique quote
        this.imageData = [
            { file: '20250107_115323.jpg', quote: '"Excellence starts with quality mineral extraction from nature\'s finest reserves." - Fresh mineral extracts' },
            { file: '20250405_142337.jpg', quote: '"Processing perfection transforms raw materials into premium products." - High-quality ore processing' },
            { file: '20250407_100011.jpg', quote: '"Every aggregate tells a story of durability and strength." - Premium quality aggregates' },
            { file: '20251013_174811 - Copy.jpg', quote: '"Strategic operations in Mafinga build Africa\'s resource foundation." - Strategic mining operations' },
            { file: 'IMG-20251120-WA0017.jpg', quote: '"Quality assurance is our commitment to every customer globally." - Professional quality inspection' },
            { file: 'IMG-20251120-WA0019.jpg', quote: '"Refined materials, refined standards - that\'s the Pelano difference." - Quality verification process' },
            { file: 'IMG-20251127-WA0006 - Copy.jpg', quote: '"Capacity that speaks: storing excellence for the world market." - Bulk mineral storage' },
            { file: 'IMG-20251127-WA0042.jpg', quote: '"Maintenance excellence ensures uninterrupted production quality." - Equipment care and reliability' },
            { file: 'IMG_5112.JPG', quote: '"Advanced technology transforms resources into solutions." - Modern processing technology' },
            { file: 'IMG_5121.JPG', quote: '"Skilled hands, precise minds, premium results every time." - Technical expertise in operation' },
            { file: 'IMG_5133.JPG', quote: '"Sustainable extraction today, prosperity tomorrow for communities." - Eco-friendly mining practices' },
            { file: 'IMG_5137.JPG', quote: '"Infrastructure built for scale, designed for excellence." - Modern facility overview' },
            { file: 'IMG_5139.JPG', quote: '"Packaging precision protects our premium promise to clients." - Professional packaging standards' },
            { file: 'IMG_5146.JPG', quote: '"People power drives our operational excellence and innovation." - Professional team dedication' },
            { file: 'IMG_8970.jpg', quote: '"Continuous improvement fuels our competitive advantage." - Facility management excellence' },
            { file: 'IMG_E5100.JPG', quote: '"Efficiency extracted: maximizing value from every resource." - Resource extraction techniques' },
            { file: 'PFP_8133.jpg', quote: '"Market-ready minerals meeting international compliance standards." - Storage infrastructure' },
            { file: 'PFP_8254.jpg', quote: '"Teamwork transforms vision into tangible mineral wealth." - Team collaboration efforts' },
            { file: 'PFP_8258.jpg', quote: '"Growth built on sustainable mining practices and community trust." - Facility expansion progress' },
            { file: 'PFP_8259.jpg', quote: '"Every product carries our promise of quality and reliability." - Quality mineral samples' },
            { file: 'PFP_8277.jpg', quote: '"Documentation excellence reflects our professional operations." - Professional product records' },
            { file: 'PFP_8282.jpg', quote: '"Controlled environments produce controlled excellence consistently." - Modern equipment operations' },
            { file: 'PFP_8289.jpg', quote: '"Sustainability integrated into every aspect of our operations." - Resource management excellence' },
            { file: 'PFP_8314.jpg', quote: '"Final inspection: where quality meets customer satisfaction." - Export-ready verification' },
            { file: 'PFP_8346.jpg', quote: '"United teams, unified mission - delivering premium resources." - Team dedication showcase' },
            { file: 'PXL_20260224_112009685.jpg', quote: '"Investing in infrastructure, investing in our future." - Strategic infrastructure development' },
            { file: 'PXL_20260302_051459426.jpg', quote: '"Modern equipment, modern standards, modern results." - Advanced operational technology' },
            { file: 'PXL_20260302_053544021.jpg', quote: '"Resource management that respects both profit and planet." - Sustainable practice showcase' },
            { file: 'PXL_20260306_062709766.jpg', quote: '"New quality captured: innovation in every extraction process." - Advanced extraction quality' },
            { file: 'PXL_20260306_062927733.jpg', quote: '"Precision extraction: maximizing quality, minimizing waste." - Advanced extraction methods' },
            { file: 'PXL_20260307_105149473.PORTRAIT.jpg', quote: '"Operational transparency builds customer confidence and trust." - Operations facility view' },
            { file: 'PXL_20260323_062339246.jpg', quote: '"Premium reserves, premium future for Pelano Resources." - Strategic reserve management' },
            { file: 'PXL_20260326_075056370.PORTRAIT.ORIGINAL.jpg', quote: '"Professional standards at every level - that\'s Pelano excellence." - Industry leadership demonstration' }
        ];

        this.totalImages = this.imageData.length;
        this.imagesPerLoad = 12;
        this.loadedCount = 0;
        this.galleryGrid = document.getElementById('gallery-grid');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.galleryCounter = document.getElementById('gallery-shown');
        this.endMessage = document.getElementById('gallery-end-message');
        
        this.init();
    }

    init() {
        if (!this.galleryGrid) return;
        
        // Verify all images exist
        console.log(`Gallery: Loading ${this.totalImages} images`);
        
        // Load initial batch
        this.loadMoreImages();
        
        // Attach event listener
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
        }
    }

    // Create gallery item element with image and quote
    createGalleryItem(imageData, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-image-file', imageData.file);
        
        // Only use lazy loading for images after the first batch
        const isEager = index < this.imagesPerLoad;
        const loading = isEager ? 'eager' : 'lazy';
        
        item.innerHTML = `
            <picture>
                <img 
                    src="images/gallery/${imageData.file}" 
                    alt="Pelano Resources - ${imageData.file}" 
                    class="gallery-image" 
                    loading="${loading}" 
                    decoding="async"
                    onerror="this.style.display='none'; this.parentElement.style.background='#f0f0f0';"
                >
            </picture>
            <p class="image-description">${imageData.quote}</p>
        `;
        
        return item;
    }

    // Load more images - uses direct array indexing, NO modulo/repeat
    loadMoreImages() {
        const startIndex = this.loadedCount;
        const endIndex = Math.min(this.loadedCount + this.imagesPerLoad, this.totalImages);
        
        // Add new images to gallery using direct index access
        for (let i = startIndex; i < endIndex; i++) {
            const item = this.createGalleryItem(this.imageData[i], i);
            this.galleryGrid.appendChild(item);
        }
        
        this.loadedCount = endIndex;
        
        // Update counter
        if (this.galleryCounter) {
            this.galleryCounter.textContent = this.loadedCount;
        }
        
        // Hide load more button if all images loaded
        if (this.loadedCount >= this.totalImages) {
            if (this.loadMoreBtn) {
                this.loadMoreBtn.style.display = 'none';
            }
            if (this.endMessage) {
                this.endMessage.style.display = 'block';
            }
        } else if (this.loadMoreBtn) {
            this.loadMoreBtn.style.display = 'block';
        }
    }

    // Reset gallery (if needed)
    reset() {
        this.loadedCount = 0;
        this.galleryGrid.innerHTML = '';
        if (this.endMessage) {
            this.endMessage.style.display = 'none';
        }
        this.loadMoreImages();
    }
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryManager();
    });
} else {
    new GalleryManager();
}
