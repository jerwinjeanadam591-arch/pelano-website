// ===== GALLERY MANAGER FOR 33 UNIQUE IMAGES (NO DUPLICATES) =====

class GalleryManager {
    constructor() {
        // Combined data structure: each photo paired with its unique quote
        this.imageData = [
            { file: '20250107_115323.jpg', quote: '"Premium treated timber built to withstand the elements and time." - Quality timber treatment' },
            { file: '20250405_142337.jpg', quote: '"Structural excellence: every beam built for lasting durability." - Structural timber production' },
            { file: '20250407_100011.jpg', quote: '"Telecom poles connecting communities across Tanzania." - Telecom pole manufacturing' },
            { file: '20251013_174811 - Copy.jpg', quote: '"Railway sleepers engineered for the tracks of progress." - Railway sleeper production' },
            { file: 'IMG-20251120-WA0017.jpg', quote: '"Quality assurance ensures every timber meets international standards." - Quality inspection process' },
            { file: 'IMG-20251120-WA0019.jpg', quote: '"Precision treatment preserves timber strength and longevity." - Advanced timber treatment' },
            { file: 'IMG-20251127-WA0006 - Copy.jpg', quote: '"Pallets built for worldwide logistics and supply chains." - Pallet manufacturing storage' },
            { file: 'IMG-20251127-WA0042.jpg', quote: '"Maintenance excellence ensures consistent product quality." - Facility maintenance' },
            { file: 'IMG_5112.JPG', quote: '"Advanced technology transforms timber into infrastructure solutions." - Modern processing technology' },
            { file: 'IMG_5121.JPG', quote: '"Skilled craftsmanship delivers precision in every timber product." - Expert timber processing' },
            { file: 'IMG_5133.JPG', quote: '"Sustainable forestry practices building a greener future." - Eco-friendly timber sourcing' },
            { file: 'IMG_5137.JPG', quote: '"Infrastructure for excellence: facilities designed for quality output." - Production facility overview' },
            { file: 'IMG_5139.JPG', quote: '"Protective packaging ensures timber arrives in perfect condition." - Professional packaging standards' },
            { file: 'IMG_5146.JPG', quote: '"Dedicated teams drive innovation in timber product development." - Professional team dedication' },
            { file: 'IMG_8970.jpg', quote: '"Continuous improvement keeps us ahead in timber technology." - Process optimization' },
            { file: 'IMG_E5100.JPG', quote: '"Efficient production maximizes value from every timber resource." - Production efficiency' },
            { file: 'PFP_8133.jpg', quote: '"Market-leading timber meeting global construction standards." - Export quality verification' },
            { file: 'PFP_8254.jpg', quote: '"Teamwork turns timber vision into infrastructure solutions." - Team collaboration' },
            { file: 'PFP_8258.jpg', quote: '"Growth through sustainable timber practices and customer trust." - Business expansion' },
            { file: 'PFP_8259.jpg', quote: '"Every product carries our promise of timber excellence." - Product quality showcase' },
            { file: 'PFP_8277.jpg', quote: '"Documentation precision reflects professional timber operations." - Quality records and standards' },
            { file: 'PFP_8282.jpg', quote: '"Controlled processing delivers consistent timber quality." - Precision manufacturing' },
            { file: 'PFP_8289.jpg', quote: '"Sustainability integrated into every timber supply chain." - Green timber practices' },
            { file: 'PFP_8314.jpg', quote: '"Final inspection ensures export-ready timber products." - Quality assurance verification' },
            { file: 'PFP_8346.jpg', quote: '"United mission delivering premium timber to the world." - Team commitment' },
            { file: 'PXL_20260224_112009685.jpg', quote: '"Infrastructure investments supporting timber industry growth." - Facility development' },
            { file: 'PXL_20260302_051459426.jpg', quote: '"Modern standards in timber treatment and processing." - Advanced technology' },
            { file: 'PXL_20260302_053544021.jpg', quote: '"Responsible timber management balancing profit and environment." - Sustainable sourcing' },
            { file: 'PXL_20260306_062709766.jpg', quote: '"Innovation drives quality in every timber product we create." - Product innovation' },
            { file: 'PXL_20260306_062927733.jpg', quote: '"Precision processing maximizes timber quality and value." - Quality optimization' },
            { file: 'PXL_20260307_105149473.PORTRAIT.jpg', quote: '"Transparency in operations builds customer confidence." - Professional operations' },
            { file: 'PXL_20260323_062339246.jpg', quote: '"Premium timber supply ensuring Africa\'s infrastructure future." - Strategic supply' },
            { file: 'PXL_20260326_075056370.PORTRAIT.ORIGINAL.jpg', quote: '"Professional excellence: Pelano sets timber industry standards." - Industry leadership' }
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
        
        const webpFile = imageData.file.replace(/\.(jpe?g|JPG)$/i, '.webp');
        item.innerHTML = `
            <picture>
                <source srcset="images/gallery/${webpFile}" type="image/webp">
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
