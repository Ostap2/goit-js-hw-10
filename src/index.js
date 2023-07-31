import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_JN7SGLs0bBlgTEetxzYXuopzP3WrCT2FAmmQQyIkE7YGEUgp1MC2MI3IRIsQ9wYo";

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

function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
    .join("");
}

function fetchCatsByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

fetchBreeds()
  .then((breeds) => {
    populateBreedSelect(breeds);
  })
  .catch(() => {
    showError();
  });

breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;

  showLoader();

  fetchCatsByBreed(breedId)
    .then((cats) => {
      hideLoader();
      clearCatList();

      if (cats.length > 0) {
        catInfo.style.display = "block";
        const selectedBreed = cats[0].breeds[0];
        catBreed.textContent = selectedBreed.name;
        catDescription.textContent = selectedBreed.description;
        catTemperament.textContent = selectedBreed.temperament;

        cats.forEach((cat) => {
          const catImage = document.createElement("img");
          catImage.src = cat.url;
          catImage.alt = "Cat Image";

          catList.appendChild(catImage);
        });
      } else {
        catInfo.style.display = "none";
      }
    })
    .catch(() => {
      hideLoader();
      showError();
    });
});


