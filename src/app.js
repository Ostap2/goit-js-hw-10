import './style.css';
import { fetchBreeds, api_key } from "./cat-api";

const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

errorItem.textContent = '';
errorItem.style.display = 'none';
select.style.visibility = 'hidden';

let storedBreeds = [];

function onLoader() {
  loaderItem.style.display = 'block';
  fetchBreeds()
    .then((data) => {
      storedBreeds = data;

      const options = storedBreeds.map((breed) => {
        if (breed.image) {
          return `<option value="${breed.id}">${breed.name}</option>`;
        }
        return '';
      }).join('');

      select.innerHTML = options;

      select.style.visibility = 'visible';
      loaderItem.style.display = 'none';
    })
    .catch((error) => {
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

  return axios.get(url, { headers: { 'x-api-key': api_key } })
    .then((response) => response.data)
    .then((data) => {
      renderBreeds(data);
    })
    .catch((error) => errorMessage());
}

function renderBreeds(data) {
  const image = document.createElement('img');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const temperament = document.createElement('h3');

  image.style.display = 'block';
  image.src = data[0].url;
  image.style.width = '700px';
  image.style.height = '600px';
  image.style.backgroundSize = 'cover';

  title.textContent = storedBreeds[select.selectedIndex].name;
  title.style.fontSize = '38px';
  title.style.marginBottom = 0;
  title.style.backgroundColor = 'rgb(255, 255, 255)';

  description.textContent = storedBreeds[select.selectedIndex].description;
  description.style.fontSize = '24px';

  temperament.textContent = `Temperament: ${storedBreeds[select.selectedIndex].temperament}`;
  temperament.style.fontSize = '28px';
  temperament.style.marginTop = 0;

  catInfo.innerHTML = '';
  catInfo.append(image, title, description, temperament);
}

function errorMessage() {
  loaderItem.style.display = 'none';
  loaderItem.textContent = '';
  errorItem.textContent = 'Oops! Something went wrong! Try reloading the page!';
  errorItem.style.display = 'block';
}

select.addEventListener('change', fetchCatByBreed);

onLoader();