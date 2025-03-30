import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchOnQuery } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const searchInp = document.querySelector('input[name="search-text"]');
const submitBtn = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInp.value.trim();
  if (query === '') {
    clearGallery(gallery);
    iziToast.error({
      title: '',
      titleColor: '#FFFFFF',
      iconColor: '#fffff',
      iconUrl: '../img/svg/wn-ic.svg',
      messageColor: '#FFFFFF',
      backgroundColor: '#ef4040',
      position: 'topRight',
      progressBar: true,
      progressBarColor: ' #B51B1B',
      closeOnClick: true,
      timeout: 3500,
      message: 'Будь ласка, заповніть поле для вводу!',
    });
    return;
  }

  loader.style.display = 'inline-flex';

  fetchOnQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        clearGallery(gallery);
      } else {
        renderImages(data.hits, gallery);
      }
    })
    .catch(error => {
      clearGallery(gallery);
      iziToast.error({
        title: '',
        titleColor: '#FFFFFF',
        iconColor: '#fffff',
        iconUrl: '../img/svg/wn-ic.svg',
        messageColor: '#FFFFFF',
        backgroundColor: '#ef4040',
        position: 'topRight',
        progressBar: true,
        progressBarColor: ' #B51B1B',
        closeOnClick: true,
        timeout: 3500,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
