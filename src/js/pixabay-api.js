import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function fetchOnQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '49484278-b8d1b278e9cf12a9e395a9aea',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        return Promise.reject('No images found');
      }
      return response.data;
    })
    .catch(error => {
      console.log('Помилка запиту :>> ', error);
      return Promise.reject(error);
    });
}
