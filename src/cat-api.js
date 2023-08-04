import axios from "axios";

const breedsUrl = "https://api.thecatapi.com/v1/breeds";
export const api_key = "live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH";

export function fetchBreeds() {
  return axios.get(breedsUrl, { headers: { 'x-api-key': api_key } })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.message || "Failed to fetch breeds");
    });
}