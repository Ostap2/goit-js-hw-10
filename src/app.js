import SlimSelect from 'slim-select';
import axios from 'axios';
import './style.css';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, api_key } from './cat-api';

const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

errorItem.textContent = '';
errorItem.style.display = 'none';
select.style.visibility = 'hidden';

function onLoader() {
  loaderItem.style.display = 'block';
  fetchBreeds()
    .then(data => {
      const options = data
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join('');
      select.innerHTML = options;

      select.style.visibility = 'visible';
      loaderItem.style.display = 'none';

      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(error => {
      loaderItem.style.display = 'none';
      errorMessage();
      console.error(error);
    });
}

function fetchCatByBreed() {
  const selectedBreedId = select.value;
  if (!selectedBreedId) {
    errorMessage();
    return;
  }

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`;

  return axios
    .get(url, {
      headers: {
        'x-api-key': api_key,
      },
    })
    .then(response => {
      if (!response.data[0]) {
        throw new Error('No data returned');
      }

      return response.data;
    })
    .then(data => {
      renderBreeds(data[0]);
    })
    .catch(error => {
      console.log(123);
      errorMessage(error.message);
    });
}

function renderBreeds(data) {
  if (!data) {
    catInfo.innerHTML = '';
    return;
  }

  const markup = `
    <div><img src="${data.url}" alt="${data.breeds[0].name}"><h2>${data.breeds[0].name}</h2><p>${data.breeds[0].description}</p><p>Temperament:${data.breeds[0].temperament}</p></div>`;

  catInfo.innerHTML = markup;
}

function errorMessage() {
  loaderItem.style.display = 'none';
  loaderItem.textContent = '';
  errorItem.textContent = 'Oops! Something went wrong! Try reloading the page!';
  errorItem.style.display = 'block';
}

select.addEventListener('change', fetchCatByBreed);

onLoader();