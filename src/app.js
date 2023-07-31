const loaderImg = 'url(https://papik.pro/grafic/uploads/posts/2023-04/1682206914_papik-pro-p-stikeri-rizhii-kot-vektor-26.png)';

import './style.css';

import { fetchBreeds } from "./cat-api";

const errorItem = document.querySelector('.error');
errorItem.textContent = '';
errorItem.style.display = 'none';
const loaderItem = document.querySelector('.loader');

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
select.addEventListener('change', fetchCatByBreed);
select.style.visibility = 'hidden';

let storedBreeds = [];

fetchBreeds()
    .then((data) => {
        data = data.filter(img => img.image?.url != null)
        storedBreeds = data;
    
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement('option');
            
            if (!breed.image) continue
            option.value = breed.id;
            option.innerHTML = `${breed.name}`;
            select.appendChild(option);
        };
    })
    .catch((error) => console.log(error)); 
        
const api_key = `live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH`

function fetchCatByBreed() {
    let breedId = select.value
    
    const url = "https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}"
    
    return fetch(url, {
        headers: {
            'x-api-key': api_key
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            } 
            return response.json();
        })
        .then((data) => {
            let id = select.selectedIndex
            data = storedBreeds[id];
        
            return renderBreeds();
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

    catInfo.append(image, title, description, temperament);
};

function onLoader() {

    select.style.visibility = 'visible';
   
    fetchCatByBreed();
};

onLoader()

function errorMessage() {

    loaderItem.style.display = 'none';
    loaderItem.textContent = '';
    errorItem.textContent = 'Oops! Something went wrong! Try reloading the page!';
    errorItem.style.display = 'block';

};

    