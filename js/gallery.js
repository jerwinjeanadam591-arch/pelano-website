// ===== GALLERY MANAGER FOR 35+ IMAGES =====

class GalleryManager {
    constructor() {
        this.totalImages = 33;
        this.imagesPerLoad = 12;
        this.loadedCount = 0;
        this.galleryGrid = document.getElementById('gallery-grid');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.galleryCounter = document.getElementById('gallery-shown');
        this.endMessage = document.getElementById('gallery-end-message');
        this.imageDescriptions = this.getImageDescriptions();
        this.imageFiles = this.getImageFiles();
        
        this.init();
    }

    init() {
        if (!this.galleryGrid) return;
        
        // Load initial batch
        this.loadMoreImages();
        
        // Attach event listener
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
        }
    }

    // Pre-defined image files (all 33 unique images)
    getImageFiles() {
        return [
            '20250107_115323.jpg',
            '20250405_142337.jpg',
            '20250407_100011.jpg',
            '20251013_174811 - Copy.jpg',
            'IMG-20251120-WA0017.jpg',
            'IMG-20251120-WA0019.jpg',
            'IMG-20251127-WA0006 - Copy.jpg',
            'IMG-20251127-WA0042.jpg',
            'IMG_5112.JPG',
            'IMG_5121.JPG',
            'IMG_5133.JPG',
            'IMG_5137.JPG',
            'IMG_5139.JPG',
            'IMG_5146.JPG',
            'IMG_8970.jpg',
            'IMG_E5100.JPG',
            'PFP_8133.jpg',
            'PFP_8254.jpg',
            'PFP_8258.jpg',
            'PFP_8259.jpg',
            'PFP_8277.jpg',
            'PFP_8282.jpg',
            'PFP_8289.jpg',
            'PFP_8314.jpg',
            'PFP_8346.jpg',
            'PXL_20260224_112009685.jpg',
            'PXL_20260302_051459426.jpg',
            'PXL_20260302_053544021.jpg',
            'PXL_20260306_062709766.jpg',
            'PXL_20260306_062927733.jpg',
            'PXL_20260307_105149473.PORTRAIT.jpg',
            'PXL_20260323_062339246.jpg',
            'PXL_20260326_075056370.PORTRAIT.ORIGINAL.jpg'
        ];
    }

    // Image descriptions for each of the 33 unique images
    getImageDescriptions() {
        return [
            '"Excellence starts with quality mineral extraction from nature\'s finest reserves." - Fresh mineral extracts',
            '"Processing perfection transforms raw materials into premium products." - High-quality ore processing',
            '"Every aggregate tells a story of durability and strength." - Premium quality aggregates',
            '"Strategic operations in Mafinga build Africa\'s resource foundation." - Strategic mining operations',
            '"Quality assurance is our commitment to every customer globally." - Professional quality inspection',
            '"Refined materials, refined standards - that\'s the Pelano difference." - Quality verification process',
            '"Capacity that speaks: storing excellence for the world market." - Bulk mineral storage',
            '"Maintenance excellence ensures uninterrupted production quality." - Equipment care and reliability',
            '"Advanced technology transforms resources into solutions." - Modern processing technology',
            '"Skilled hands, precise minds, premium results every time." - Technical expertise in operation',
            '"Sustainable extraction today, prosperity tomorrow for communities." - Eco-friendly mining practices',
            '"Infrastructure built for scale, designed for excellence." - Modern facility overview',
            '"Packaging precision protects our premium promise to clients." - Professional packaging standards',
            '"People power drives our operational excellence and innovation." - Professional team dedication',
            '"Continuous improvement fuels our competitive advantage." - Facility management excellence',
            '"Efficiency extracted: maximizing value from every resource." - Resource extraction techniques',
            '"Market-ready minerals meeting international compliance standards." - Storage infrastructure',
            '"Teamwork transforms vision into tangible mineral wealth." - Team collaboration efforts',
            '"Growth built on sustainable mining practices and community trust." - Facility expansion progress',
            '"Every product carries our promise of quality and reliability." - Quality mineral samples',
            '"Documentation excellence reflects our professional operations." - Professional product records',
            '"Controlled environments produce controlled excellence consistently." - Modern equipment operations',
            '"Sustainability integrated into every aspect of our operations." - Resource management excellence',
            '"Final inspection: where quality meets customer satisfaction." - Export-ready verification',
            '"United teams, unified mission - delivering premium resources." - Team dedication showcase',
            '"Investing in infrastructure, investing in our future." - Strategic infrastructure development',
            '"Modern equipment, modern standards, modern results." - Advanced operational technology',
            '"Resource management that respects both profit and planet." - Sustainable practice showcase',
            '"New quality captured: innovation in every extraction process." - Advanced extraction quality',
            '"Precision extraction: maximizing quality, minimizing waste." - Advanced extraction methods',
            '"Operational transparency builds customer confidence and trust." - Operations facility view',
            '"Premium reserves, premium future for Pelano Resources." - Strategic reserve management',
            '"Professional standards at every level - that\'s Pelano excellence." - Industry leadership demonstration'
        ];
    }

    // Create gallery item element
    createGalleryItem(imageNumber) {
        const imgIndex = imageNumber - 1;
        const imageName = this.imageFiles[imgIndex];
        const description = this.imageDescriptions[imgIndex] || 'Premium forest products from Pelano Resources';
        
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-image-id', `gallery-${imageNumber}`);
        
        item.innerHTML = `
            <picture>
                <source srcset="images/gallery/${imageName}" type="image/webp">
                <source srcset="images/gallery/${imageName.replace('.webp', '.jpg')}" type="image/jpeg">
                <img 
                    src="images/gallery/${imageName.replace('.webp', '.jpg')}" 
                    alt="Gallery Image ${imageNumber}" 
                    class="gallery-image" 
                    loading="lazy" 
                    decoding="async"
                    onerror="this.src='images/gallery/gallery-1.jpg'"
                >
            </picture>
            <p class="image-description">${description}</p>
        `;
        
        return item;
    }

    // Load more images
    loadMoreImages() {
        const startIndex = this.loadedCount;
        const endIndex = Math.min(this.loadedCount + this.imagesPerLoad, this.totalImages);
        
        // Add new images to gallery
        for (let i = startIndex + 1; i <= endIndex; i++) {
            const item = this.createGalleryItem(i);
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
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
});

// Alternative initialization if script loads after DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryManager();
    });
} else {
    new GalleryManager();
}
