import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInp = document.querySelector('input[name="search-text"]');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchInp.value.trim();

  if (query === '') {
    clearGallery();
    hideLoadMoreButton();
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

  currentPage = 1;
  currentQuery = query;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      clearGallery();
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
        message: 'Вибачте, за вашим запитом нічого не знайдено.',
      });
      hideLoadMoreButton();
    } else {
      createGallery(data.hits);
      if (currentPage * 15 >= data.totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          title: '',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    clearGallery();
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
      message: 'Виникла помилка при завантаженні зображень. Спробуйте ще раз.',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    showLoadMoreButton();

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    // Прокручуємо сторінку на дві висоти карточки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    clearGallery();
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
      message: 'Виникла помилка при завантаженні зображень. Спробуйте ще раз.',
    });
  } finally {
    hideLoader();
  }
});
