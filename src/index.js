import SlimSelect from "slim-select";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "твій ключ";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const catBreed = document.querySelector(".cat-breed");
const catList = document.querySelector(".cat-list");
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
    breedSelect.innerHTML = breeds
      .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
      .join("");

    new SlimSelect(".breed-select");
  })
  .catch(() => {
    showError();
  });

breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;

  showLoader();

  fetchBreeds()
    .then((breeds) => {
      const selectedBreed = breeds.find((breed) => breed.id === breedId);

      if (selectedBreed) {
        catBreed.textContent = selectedBreed.name;
      }

      return fetchCatsByBreed(breedId);
    })
    .then((cats) => {
      hideLoader();
      clearCatList();

      cats.forEach((cat) => {
        const catImage = document.createElement("img");
        catImage.src = cat.url;
        catImage.alt = "Cat Image";

        catList.appendChild(catImage);
      });

      catInfo.style.display = "block";
    })
    .catch(() => {
      hideLoader();
      showError();
    });
});
