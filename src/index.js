
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "твій ключ";

export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function fetchCatsByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catData = response.data[0]; 
      const catBreedInfo = catData.breeds[0]; 

      return {
        image: catData.url,
        breed: catBreedInfo.name,
        description: catBreedInfo.description,
        temperament: catBreedInfo.temperament,
      };
    })
    .catch((error) => {
      throw error;
    });
}
