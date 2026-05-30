// ===== CHECK AUTHENTICATION =====
async function checkAuth() {
    // Simple check - in production, use proper session management
    const response = await fetch('/admin/api/logout', {
        method: 'POST'
    });
    // If we can reach the admin API, user is authenticated
    return true;
}

// ===== TAB SWITCHING =====
const adminMenuItems = document.querySelectorAll('.admin-menu li');
const adminTabs = document.querySelectorAll('.admin-tab');

adminMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        const tabName = item.dataset.tab;
        
        // Remove active class from all
        adminMenuItems.forEach(i => i.classList.remove('active'));
        adminTabs.forEach(t => t.classList.remove('active'));
        
        // Add active to clicked
        item.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// ===== UPLOAD FUNCTION =====
async function uploadFile(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
        const response = await fetch('/admin/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            alert(`Upload failed: ${data.message}`);
            return null;
        }
    } catch (error) {
        alert('Upload error: ' + error.message);
        return null;
    }
}

// ===== PRODUCTS UPLOAD =====
const productUploadBtn = document.getElementById('product-upload-btn');
const productFileInput = document.getElementById('product-file');

if (productUploadBtn && productFileInput) {
    productUploadBtn.addEventListener('click', async () => {
        const files = productFileInput.files;
        
        if (files.length === 0) {
            alert('Please select files to upload');
            return;
        }

        for (let file of files) {
            const result = await uploadFile(file, 'product');
            if (result) {
                addFileToList('product-files-list', result);
            }
        }
        
        productFileInput.value = ''; // Clear input
    });
}

// ===== GALLERY UPLOAD =====
const galleryUploadBtn = document.getElementById('gallery-upload-btn');
const galleryFileInput = document.getElementById('gallery-file');

if (galleryUploadBtn && galleryFileInput) {
    galleryUploadBtn.addEventListener('click', async () => {
        const files = galleryFileInput.files;
        
        if (files.length === 0) {
            alert('Please select files to upload');
            return;
        }

        for (let file of files) {
            const result = await uploadFile(file, 'gallery');
            if (result) {
                addFileToList('gallery-files-list', result);
            }
        }
        
        galleryFileInput.value = '';
    });
}

// ===== VIDEOS UPLOAD =====
const videoUploadBtn = document.getElementById('video-upload-btn');
const videoFileInput = document.getElementById('video-file');

if (videoUploadBtn && videoFileInput) {
    videoUploadBtn.addEventListener('click', async () => {
        const files = videoFileInput.files;
        
        if (files.length === 0) {
            alert('Please select files to upload');
            return;
        }

        for (let file of files) {
            const result = await uploadFile(file, 'video');
            if (result) {
                addFileToList('video-files-list', result);
            }
        }
        
        videoFileInput.value = '';
    });
}

// ===== DOCUMENTS UPLOAD =====
const documentUploadBtn = document.getElementById('document-upload-btn');
const documentFileInput = document.getElementById('document-file');

if (documentUploadBtn && documentFileInput) {
    documentUploadBtn.addEventListener('click', async () => {
        const files = documentFileInput.files;
        
        if (files.length === 0) {
            alert('Please select files to upload');
            return;
        }

        for (let file of files) {
            const result = await uploadFile(file, 'document');
            if (result) {
                addFileToList('document-files-list', result);
            }
        }
        
        documentFileInput.value = '';
    });
}

// ===== ADD FILE TO LIST =====
function addFileToList(listId, result) {
    const list = document.getElementById(listId);
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileType = listId.includes('product') ? 'product' :
                     listId.includes('gallery') ? 'gallery' :
                     listId.includes('video') ? 'video' : 'document';
    
    let preview = '';
    if (fileType === 'product' || fileType === 'gallery') {
        preview = `<img src="${result.url}" alt="Uploaded image">`;
    } else if (fileType === 'video') {
        preview = `<video src="${result.url}" controls></video>`;
    } else {
        preview = `<span>📄 PDF</span>`;
    }
    
    fileItem.innerHTML = `
        <div class="file-info">
            ${preview}
            <span>${result.filename}</span>
        </div>
        <div class="file-url">
            <a href="${result.url}" target="_blank">${result.url}</a>
        </div>
    `;
    
    list.appendChild(fileItem);
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await fetch('/admin/api/logout', {
            method: 'POST'
        });
        window.location.href = '/admin/login.html';
    });
}

// ===== DRAG & DROP =====
const uploadAreas = document.querySelectorAll('.upload-area');

uploadAreas.forEach(area => {
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.style.borderColor = '#27ae60';
        area.style.background = 'rgba(39, 174, 96, 0.1)';
    });
    
    area.addEventListener('dragleave', () => {
        area.style.borderColor = '#ddd';
        area.style.background = 'transparent';
    });
    
    area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.style.borderColor = '#ddd';
        area.style.background = 'transparent';
    });
});