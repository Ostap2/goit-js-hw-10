const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

export const api_key = "live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH";
const breeds = `https://api.thecatapi.com/v1/breeds`;

errorItem.textContent = '';
errorItem.style.display = 'none';
select.style.visibility = 'hidden';

let storedBreeds = [];

export function fetchBreeds() {
    return axios.get(breeds, { headers: { 'x-api-key': api_key } })
        .then((response) => {
            if (!response.data) {
                throw new Error('No data returned');
            }
            storedBreeds = response.data;
            return storedBreeds;
        })
        .catch((error) => {
            loaderItem.style.display = 'none';
            errorMessage();
            console.error(error);
        });
}
