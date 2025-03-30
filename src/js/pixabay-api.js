import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '49484278-b8d1b278e9cf12a9e395a9aea';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query, page) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    })
    .then(response => ({
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    }))
    .catch(error => {
      console.error('Помилка запиту:', error);
      throw error;
    });
}
