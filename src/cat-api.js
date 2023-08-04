import SlimSelect from 'slim-select';

const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

const breeds = `https://api.thecatapi.com/v1/breeds`;

export const api_key = "live_JN7SGLs0bBlgTEetxzYXuopzP3WrCT2FAmmQQyIkE7YGEUgp1MC2MI3IRIsQ9wYo";

export function fetchBreeds() {
    return fetch(breeds, { headers: { 'x-api-key': api_key } })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}
