import SlimSelect from "slim-select";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "твій ключ";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const catImage = document.createElement("img");
const catName = document.createElement("h2");
const catDescription = document.createElement("p");
const catTemperament = document.createElement("p");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

catInfo.style.display = "none";
error.style.display = "none";

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  alert("Oops! Something went wrong! Try reloading the page!");
}

function clearCatInfo() {
  catImage.src = "";
  catName.textContent = "";
  catDescription.textContent = "";
  catTemperament.textContent = "";
}

function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data[0])
    .catch((error) => {
      throw error;
    });
}

fetchBreeds()
  .then((breeds) => {
    breedSelect.innerHTML = breeds
      .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
      .join("");

    new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(() => {
    showError();
  });

breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;

  showLoader();

  fetchCatByBreed(breedId)
    .then((cat) => {
      hideLoader();

      clearCatInfo();

      catImage.src = cat.url;
      catName.textContent = `Breed: ${cat.breeds[0].name}`;
      catDescription.textContent = `Description: ${cat.breeds[0].description}`;
      catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      catInfo.style.display = "block";
    })
    .catch(() => {
      hideLoader();
      showError();
    });
});
