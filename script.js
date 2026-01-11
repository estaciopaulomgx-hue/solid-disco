let images = [
    { id: '410851', date: '2025-09-07', image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=410851' },
    { id: '500192', date: '2025-09-07', image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=500192' },
    { id: '559879', date: '2025-09-07', image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=559879' },
    { id: '60-00011', date: '2025-09-07', image: 'https://via.placeholder.com/300x300/4facfe/ffffff?text=60-00011' },
    { id: '60-00371', date: '2025-09-07', image: 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=60-00371' },
    { id: '0083806', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/43e97b/ffffff?text=0083806' },
    { id: '0083807', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/38f9d7/ffffff?text=0083807' },
    { id: '0083808', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=0083808' },
    { id: '0083809', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=0083809' },
    { id: '0100-1107-16', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=0100-1107-16' },
    { id: '0117091', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/4facfe/ffffff?text=0117091' },
    { id: '0126695 techno medica', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=0126695' },
    { id: '013-2002-2', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/43e97b/ffffff?text=013-2002-2' },
    { id: '014-001-005', date: '2025-08-30', image: 'https://via.placeholder.com/300x300/38f9d7/ffffff?text=014-001-005' }
];

let searchTerm = '';
let selectedCount = 0;

// Initialize
function init() {
    renderImages();
    updateStats();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', function (e) {
        searchTerm = e.target.value.toLowerCase();
        renderImages();
    });

    document.getElementById('uploadBtn').addEventListener('click', uploadImages);

    document.getElementById('fileInput').addEventListener('change', function (e) {
        const fileCount = e.target.files.length;
        if (fileCount > 0) {
            document.querySelector('.file-input-label').textContent =
                `${fileCount} file(s) selected`;
        }
    });

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('imageModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
}

// Render Images
function renderImages() {
    const grid = document.getElementById('imagesGrid');
    const noResults = document.getElementById('noResults');

    const filtered = images.filter(img =>
        img.id.toLowerCase().includes(searchTerm) ||
        img.date.includes(searchTerm)
    );

    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';

        grid.innerHTML = filtered.map(img => `
            <div class="image-card" onclick="openModal('${img.image}')">
                <div class="image-container">
                    <img src="${img.image}" alt="${img.id}">
                </div>
                <div class="image-info">
                    <div class="image-id">${img.id}</div>
                    <div class="image-date">${img.date}</div>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('foundImages').textContent = filtered.length;
}

// Upload Images
function uploadImages() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select at least one image to upload');
        return;
    }

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            alert(`${file.name} is not an image file`);
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            images.unshift({
                id: generateImageId(),
                date: new Date().toISOString().split('T')[0],
                image: e.target.result
            });

            renderImages();
            updateStats();
        };
        reader.readAsDataURL(file);
    });

    fileInput.value = '';
    document.querySelector('.file-input-label').textContent = 'Choose File';

    setTimeout(() => {
        alert(`Successfully uploaded ${files.length} image(s)!`);
    }, 100);
}

// Generate random image ID
function generateImageId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function updateStats() {
    document.getElementById('totalImages').textContent = images.length;
    document.getElementById('foundImages').textContent = images.length;
    document.getElementById('selectedImages').textContent = selectedCount;
}

// Modal functions
function openModal(imageSrc) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('imageModal').classList.add('active');
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
}

// Initialize app
init();
