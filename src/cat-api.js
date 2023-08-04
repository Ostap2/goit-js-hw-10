const errorItem = document.querySelector('.error');

const loaderItem = document.querySelector('.loader');

const catInfo = document.querySelector('.cat-info')

const breeds = `https://api.thecatapi.com/v1/breeds`;

export const api_key = "live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH"

export function fetchBreeds() {
    return fetch(breeds,{headers: {
    'x-api-key': api_key
    }})
        .then((response) => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
        })
};