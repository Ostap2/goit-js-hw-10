// app.js
import { fetchBreeds, fetchCatsByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const catBreed = document.querySelector(".cat-breed");
const catList = document.querySelector(".cat-list");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catDescription = document.querySelector(".cat-description");
const catTemperament = document.querySelector(".cat-temperament");

catInfo.style.display = "none";
error.style.display = "none";

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
}

function clearCatList() {
  catList.innerHTML = "";
}

fetchBreeds()
  .then((breeds) => {
    populateBreedSelect(breeds);
  })
  .catch(() => {
    showError();
  });

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
    .join("");
}

breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;

  showLoader();

  fetchCatsByBreed(breedId)
    .then((catData) => {
      hideLoader();

      if (catData) {
        catInfo.style.display = "block";
        catBreed.textContent = catData.breed;
        catDescription.textContent = catData.description;
        catTemperament.textContent = catData.temperament;

        const catImage = document.createElement("img");
        catImage.src = catData.image;
        catImage.alt = "Cat Image";

        clearCatList();
        catList.appendChild(catImage);
      } else {
        catInfo.style.display = "none";
      }
    })
    .catch(() => {
      hideLoader();
      showError();
    });
});
