import './style.css';
import { fetchBreeds } from "./cat-api";

const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

// Функція для приховування повідомлення про помилку
function hideErrorMessage() {
  errorItem.style.display = 'none';
}

// Функція для показу повідомлення про помилку
function showErrorMessage() {
  errorItem.style.display = 'block';
}

// Ініціалізація стану
hideErrorMessage();

let storedBreeds = [];

fetchBreeds()
  .then((data) => {
    data = data.filter(img => img.image?.url != null);
    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      if (!breed.image) continue;
      option.value = breed.id;
      option.innerHTML = `${breed.name}`;
      select.appendChild(option);
    };
  })
  .catch((error) => {
    showErrorMessage(); // Показати повідомлення про помилку при завантаженні списку порід
    console.log(error)
  });

const api_key = `live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH`

function fetchCatByBreed() {
  let breedId = select.value;
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  loaderItem.style.display = 'block'; // Показати поле загрузки перед запитом

  return fetch(url, {
    headers: {
      'x-api-key': api_key
    }
  })
    .then((response) => {
      loaderItem.style.display = 'none'; // Приховати поле загрузки після завершення запиту
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      let id = select.selectedIndex;
      data = storedBreeds[id];
      return renderBreeds();
    })
    .catch((error) => {
      errorMessage();
      console.log(error);
    });
};

function renderBreeds() {
  let id = select.selectedIndex;

  if (storedBreeds.length > 1) {
    catInfo.innerHTML = '';
  }
  const image = document.createElement('img');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const temperament = document.createElement('h3');

  image.style.display = 'block';
  image.src = `${storedBreeds[id].image.url}`;
  image.style.width = `${700}px`;
  image.style.height = `${600}px`;
  image.style.backgroundSize = 'cover';
  image.style.marginBottom = '10px';

  title.textContent = `${storedBreeds[id].name}`;
  title.style.fontSize = '38px';
  title.style.margin = '0';
  title.style.padding = '5px 10px';
  title.style.backgroundColor = '#fff';

  description.textContent = `${storedBreeds[id].description}`;
  description.style.fontSize = '24px';

  temperament.textContent = `Temperament: ${storedBreeds[id].temperament}`;
  temperament.style.fontSize = '28px';
  temperament.style.margin = '0';

  catInfo.append(image, title, description, temperament);
};

function onLoader() {
  select.style.visibility = 'visible';
  fetchCatByBreed();
};

onLoader();
