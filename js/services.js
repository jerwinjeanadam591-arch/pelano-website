// ===== SERVICE IMAGE UPLOAD HANDLER =====

class ServiceImageUploader {
    constructor() {
        this.services = [
            { id: 'dryKiln', uploadId: 'dryKilnUpload', previewId: 'dryKilnPreview', name: 'Kiln Drying' },
            { id: 'planing', uploadId: 'planingUpload', previewId: 'planingPreview', name: 'Timber Planing' },
            { id: 'polesSkiddng', uploadId: 'skiddingUpload', previewId: 'polesSkiddingPreview', name: 'Poles Skidding' },
            { id: 'treatment', uploadId: 'treatmentUpload', previewId: 'treatmentPreview', name: 'Treatment' },
            { id: 'handling', uploadId: 'handlingUpload', previewId: 'handlingPreview', name: 'Handling' }
        ];
        
        this.init();
    }

    init() {
        this.services.forEach(service => {
            const uploadInput = document.getElementById(service.uploadId);
            if (uploadInput) {
                uploadInput.addEventListener('change', (e) => this.handleImageUpload(e, service));
            }
        });
        
        // Load stored images from localStorage
        this.loadStoredImages();
    }

    handleImageUpload(event, service) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Read file as data URL
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            
            // Store in localStorage
            this.storeImage(service.id, imageData, file.name);
            
            // Update preview
            this.updatePreview(service.previewId, imageData);
            
            // Show notification
            this.showNotification(`${service.name} image uploaded successfully!`, 'success');
        };
        
        reader.onerror = () => {
            this.showNotification('Error reading file', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    storeImage(serviceId, imageData, fileName) {
        try {
            const imageInfo = {
                data: imageData,
                fileName: fileName,
                uploadedAt: new Date().toISOString(),
                size: this.formatFileSize(imageData.length)
            };
            
            localStorage.setItem(`service_image_${serviceId}`, JSON.stringify(imageInfo));
        } catch (error) {
            console.error('Error storing image:', error);
            this.showNotification('Error saving image to local storage', 'error');
        }
    }

    loadStoredImages() {
        this.services.forEach(service => {
            try {
                const stored = localStorage.getItem(`service_image_${service.id}`);
                if (stored) {
                    const imageInfo = JSON.parse(stored);
                    this.updatePreview(service.previewId, imageInfo.data);
                }
            } catch (error) {
                console.error('Error loading stored image:', error);
            }
        });
    }

    updatePreview(previewId, imageSrc) {
        const preview = document.getElementById(previewId);
        if (preview) {
            const img = preview.querySelector('img');
            if (img) {
                img.src = imageSrc;
                img.style.opacity = '1';
            }
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Export images data for download
    exportImageData() {
        const data = {};
        this.services.forEach(service => {
            const stored = localStorage.getItem(`service_image_${service.id}`);
            if (stored) {
                data[service.id] = JSON.parse(stored);
            }
        });
        return data;
    }

    // Clear all uploaded images
    clearAllImages() {
        if (confirm('Are you sure you want to clear all uploaded images?')) {
            this.services.forEach(service => {
                localStorage.removeItem(`service_image_${service.id}`);
            });
            location.reload();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ServiceImageUploader();
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
