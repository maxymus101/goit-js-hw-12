import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderImages(images, gallery) {
  if (images.length === 0) {
    gallery.innerHTML = '';
    return;
  }
  const fragment = document.createDocumentFragment();

  images.forEach(hit => {
    const item = document.createElement('li');
    item.classList.add('gallery-item');

    const link = document.createElement('a');
    link.href = hit.largeImageURL;
    link.dataset.caption = hit.tags;

    const img = document.createElement('img');
    img.src = hit.webformatURL;
    img.alt = hit.tags;

    const stats = document.createElement('div');
    stats.classList.add('image-stats');
    stats.innerHTML = `
          <div><p class="stat-title">Likes</p><p class="stat-text">${hit.likes}</p></div>
          <div><p class="stat-title">Views</p><p class="stat-text">${hit.views}</p></div>
          <div><p class="stat-title">Comments</p><p class="stat-text">${hit.comments}</p></div>
          <div><p class="stat-title">Downloads</p><p class="stat-text">${hit.downloads}</p></div>
        `;

    link.appendChild(img);
    item.appendChild(link);
    item.appendChild(stats);
    fragment.appendChild(item);
  });
  clearGallery(gallery);
  gallery.appendChild(fragment);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}
