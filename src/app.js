import './style.css';
import { fetchBreeds } from "./cat-api";

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
        .then(() => {
            for (let i = 0; i < storedBreeds.length; i++) {
                const breed = storedBreeds[i];
                if (!breed.image) continue;
                let option = document.createElement('option');
                option.value = breed.id;
                option.innerHTML = `${breed.name}`;
                select.appendChild(option);
            }
            
            select.style.visibility = 'visible';
            loaderItem.style.display = 'none';


            new SlimSelect({
                select: '.breed-select'
            });
        })
        .catch((error) => {
            loaderItem.style.display = 'none';
            errorMessage();
            console.error(error);
        });
};

function fetchCatByBreed() {
    const selectedBreedId = select.value; 
    if (!selectedBreedId) {
        errorMessage();
        return;
    }

    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`;

    return axios.get(url, {
        headers: {
            'x-api-key': api_key
        }
    })
        .then((response) => {
            if (!response.data) {
                throw new Error('No data returned');
            }
            return response.data;
        })
        .then((data) => {
            renderBreeds(); 
        })
        .catch((error) => errorMessage());
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

    title.textContent = `${storedBreeds[id].name}`;
    title.style.fontSize = `${38}px`;
    title.style.marginBottom = 0;
    title.style.backgroundColor = 'rgb(255, 255, 255)';

    description.textContent = `${storedBreeds[id].description}`;
    description.style.fontSize = `${24}px`;
    
    temperament.textContent = `Temperament: ${storedBreeds[id].temperament}`;
    temperament.style.fontSize = `${28}px`;
    temperament.style.marginTop = 0;

    catInfo.innerHTML = '';
    catInfo.append(image, title, description, temperament);
};

function errorMessage() {
    loaderItem.style.display = 'none';
    loaderItem.textContent = '';
    errorItem.textContent = 'Oops! Something went wrong! Try reloading the page!';
    errorItem.style.display = 'block';
};

select.addEventListener('change', fetchCatByBreed);

onLoader();
