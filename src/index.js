import axios from "axios";
import SlimSelect from "slim-select";
import Notiflix from "notiflix";


const API_KEY = "твій ключ";
axios.defaults.headers.common["x-api-key"] = API_KEY;


async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    const breeds = response.data.map(breed => ({
      value: breed.id,
      text: breed.name
    }));


    const breedSelect = document.querySelector(".breed-select");
    const select = new SlimSelect({
      select: breedSelect,
      data: breeds
    });

    return breeds;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
}


async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const catInfo = response.data[0].breeds[0];


    const catInfoContainer = document.querySelector(".cat-info");
    catInfoContainer.innerHTML = `
      <img src="${response.data[0].url}" alt="Cat Image">
      <h2>${catInfo.name}</h2>
      <p>Description: ${catInfo.description}</p>
      <p>Temperament: ${catInfo.temperament}</p>
    `;
  } catch (error) {
    console.error("Error fetching cat info:", error);
    Notiflix.Notify.failure("Error fetching cat info");
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const breedSelect = document.querySelector(".breed-select");
  const catInfoContainer = document.querySelector(".cat-info");

  try {

    loader.style.display = "block";
    const breeds = await fetchBreeds();
    loader.style.display = "none";


    breedSelect.addEventListener("change", async (event) => {
      const selectedBreedId = event.target.value;

      loader.style.display = "block";
      catInfoContainer.style.display = "none";
      await fetchCatByBreed(selectedBreedId);
      loader.style.display = "none";
      catInfoContainer.style.display = "block";
    });
  } catch (error) {
    loader.style.display = "none";
    error.style.display = "block";
  }
});
