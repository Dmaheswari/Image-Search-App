const apiKey = 'U1WMLoUXQhriQx1JKIEsPHTSxGtOGjWJKk5KFGt20spMScOfixxh4sYZ';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const imageGallery = document.getElementById('image-gallery');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = searchInput.value;
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=12`;
    
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        displayImages(data.photos);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function displayImages(photos) {
    imageGallery.innerHTML = '';
    photos.forEach(photo => {
        const imageUrl = photo.src.medium; // Adjust size: large, medium, small
        const photographer = photo.photographer;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = `Photo by ${photographer}`;
        imageGallery.appendChild(imageElement);
    });
}
