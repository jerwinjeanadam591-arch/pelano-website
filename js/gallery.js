// ===== GALLERY MANAGER FOR 35+ IMAGES =====

class GalleryManager {
    constructor() {
        this.totalImages = 35;
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

    // Pre-defined image files (use actual image filenames)
    getImageFiles() {
        return [
            'PFP_8265.jpg',
            'PFP_8266.jpg',
            'PFP_8280.jpg',
            'PFP_8254.jpg',
            'PXL_20260224_112035481.jpg',
            'PXL_20260302_051459426.jpg',
            'PXL_20260313_063914992.jpg',
            'IMG-20251127-WA0042.jpg',
            'IMG-20251210-WA0001 - Copy.jpg',
            '20251013_174811 - Copy.jpg',
            'IMG-20251127-WA0006 - Copy.jpg',
            'IMG_5123.JPG',
            'IMG_5135.JPG',
            'IMG_E5100.JPG',
            'PFP_8265.jpg',
            'PFP_8266.jpg',
            'PFP_8280.jpg',
            'PFP_8254.jpg',
            'PXL_20260224_112035481.jpg',
            'PXL_20260302_051459426.jpg',
            'PXL_20260313_063914992.jpg',
            'IMG-20251127-WA0042.jpg',
            'IMG-20251210-WA0001 - Copy.jpg',
            '20251013_174811 - Copy.jpg',
            'IMG-20251127-WA0006 - Copy.jpg',
            'IMG_5123.JPG',
            'IMG_5135.JPG',
            'IMG_E5100.JPG',
            'PFP_8265.jpg',
            'PFP_8266.jpg',
            'PFP_8280.jpg',
            'PFP_8254.jpg',
            'PXL_20260224_112035481.jpg',
            'PXL_20260302_051459426.jpg',
            'PXL_20260313_063914992.jpg',
            'IMG-20251127-WA0042.jpg'
        ];
    }

    // Image descriptions for each of the 35 images
    getImageDescriptions() {
        return [
            'Our state-of-the-art facilities and modern equipment dedicated to quality production.',
            'Professional team members ensuring exceptional quality control.',
            'Premium products and materials showcasing our commitment to excellence.',
            'Comprehensive operations demonstrating our large-scale project capacity.',
            'Strategic infrastructure investments reflecting our sustainable growth commitment.',
            'Collaborative partnerships highlighting our proven track record.',
            'Advanced processing equipment optimizing production efficiency.',
            'Quality assurance inspection ensuring premium product standards.',
            'Modern storage facilities maintaining optimal product conditions.',
            'Skilled workforce dedicated to operational excellence.',
            'Equipment maintenance protocols ensuring reliability and performance.',
            'Production capacity demonstration showcasing our capabilities.',
            'Forest resource management practices promoting sustainability.',
            'Processing technology advancing industry standards.',
            'Environmental responsibility in all operations.',
            'Supply chain optimization for timely delivery.',
            'Product testing and verification procedures.',
            'Team collaboration fostering innovation and excellence.',
            'Facility expansion reflecting business growth.',
            'Safety protocols protecting our workforce.',
            'Logistics operations ensuring efficient distribution.',
            'Customer satisfaction initiatives and feedback systems.',
            'Continuous improvement in manufacturing processes.',
            'Research and development advancing product quality.',
            'Infrastructure supporting large-scale operations.',
            'Export-ready products meeting international standards.',
            'Quality packaging protecting product integrity.',
            'Distribution network ensuring global reach.',
            'Industry certification achievements and recognition.',
            'Employee training programs for skill development.',
            'Environmental conservation in forest management.',
            'Premium timber selection and grading process.',
            'Sawmill operations maximizing resource efficiency.',
            'Market leadership through consistent quality delivery.',
            'Community partnership in sustainable development.'
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
