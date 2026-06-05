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
            'IMG_5124.JPG',
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
            'PXL_20260307_105149473.PORTRAIT.jpg',
            'PXL_20260326_075056370.PORTRAIT.ORIGINAL.jpg'
        ];
    }

    // Image descriptions for each of the 33 unique images
    getImageDescriptions() {
        return [
            'Fresh mineral extracts showcasing our natural resource abundance.',
            'High-quality ore processing at our state-of-the-art facility.',
            'Premium aggregates meeting international quality standards.',
            'Strategic mining operations in Mafinga, Tanzania.',
            'Professional team inspecting finished mineral products.',
            'Quality assurance verification of refined materials.',
            'Bulk mineral storage demonstrating production capacity.',
            'Equipment maintenance ensuring operational reliability.',
            'Advanced processing technology for superior output.',
            'Skilled technicians operating precision machinery.',
            'Resource extraction using sustainable practices.',
            'Modern facility infrastructure supporting large-scale operations.',
            'Quality minerals ready for domestic and export markets.',
            'Environmental responsibility in all mining activities.',
            'Transportation and logistics hub for efficient distribution.',
            'Comprehensive facility overview of Pelano Resources operations.',
            'Premium product packaging for international standards compliance.',
            'Professional team member ensuring quality excellence.',
            'Facility management and continuous operational improvement.',
            'Advanced extraction techniques maximizing efficiency.',
            'Mineral processing showing superior production standards.',
            'Storage infrastructure protecting product quality.',
            'Skilled workforce dedicated to operational excellence.',
            'Strategic facility expansion reflecting business growth.',
            'Quality mineral samples from our exclusive reserves.',
            'Professional documentation of premium products.',
            'Modern equipment operation in controlled environments.',
            'Resource management optimizing sustainable practices.',
            'Final inspection of export-ready mineral products.',
            'Team collaboration on facility improvement projects.',
            'Strategic infrastructure investments in Mafinga operations.',
            'Premium reserves demonstrating long-term resource availability.',
            'Professional operations showcasing industry leadership.'
        ];
    }

    // Create gallery item element
    createGalleryItem(imageNumber) {
        const imgIndex = (imageNumber - 1) % this.imageFiles.length;
        const imageName = this.imageFiles[imgIndex];
        const description = this.imageDescriptions[imageNumber - 1] || 'Premium forest products from Pelano Resources';
        
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
