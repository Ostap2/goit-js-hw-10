import './css/styles.css';
import { fetchBreeds } from "./js/cat-api";


const select = document.querySelector('.breed-select')
console.dir(select)
const catInfo = document.querySelector('.cat-info')
console.dir(catInfo);
select.addEventListener('change', fetchCatByBreed);
let storedBreeds = [];

function fetchCatByBreed(evt) {
    fetchBreeds()
    console.log(evt.currentTarget.elements)
};

fetchBreeds()    
    .then((data) => {
    console.log(data)
    data = data.filter(img => img.image?.url!=null)
    storedBreeds = data;
    console.log(storedBreeds);
    for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option'); 
        //skip any breeds that don't have an image
        if(!breed.image)continue
        //use the current array index
        option.value = i;
        option.innerHTML = `${breed.name}`;
        select.appendChild(option);
    };
    })
    .catch((error) => console.log(error)); 


function renderBreeds() { 
    const markup = storedBreeds.map(({ name, image:url, description, temperament}) => {
        return
        `<div>
        <img src="${url}" alt="" id="breed_image">
        </div>
        <div id="breed_json">
        <h2>${name}</h2>
        <p>${description}</p>
        <h3>${temperament}</h3>
        </div>`
    }).json('');
    catInfo.innerHTML = markup;
};



// const param = { name, image:url, description, temperament}













// fetch(url,{headers: {
//     'x-api-key': api_key
//     }})
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(resp.statusaText)
//         }
//         // console.log(response);
//         return response.json();
//     })
// .then((data) => {
//    //filter to only include those with an `image` object
//     data = data.filter(img => img.image?.url!=null)
// //    console.log(data)
//     storedBreeds = data;
//     console.log(storedBreeds);
//     for (let i = 0; i < storedBreeds.length; i++) {
//     const breed = storedBreeds[i];
//     let option = document.createElement('option'); 
//      //skip any breeds that don't have an image
//     if(!breed.image)continue
//     //use the current array index
//     option.value = i;
//     option.innerHTML = `${breed.name}`;
//     select.appendChild(option);
//     }
// //    show the first breed by default
// //    console.log(showBreedImage())
//     console.dir(select)
// })
// .catch(function(error) {
// //    console.log(error);
// });

// function showBreedImage(index) {
//     document.getElementById("#breed_image").src = storedBreeds[index].image.url
//     document.getElementById("#breed_json").textContent = storedBreeds[index].temperament

// }


// select.addEventListener('input', onSearch)

// function onSearch(evt) {
//     const { sity, day } = evt.currentTarget.elements;
//     console.log
//     getWeather(sity.value, day.value)
//         .then((data) => createMark(data.forcast.forcastday))
//         .catch((error) => console.log(error))
// }






/* <div>
<img id="breed_image"></img>
</div> */

/* <div id="breed_json"></div> */



// document.getElementById("breed_image").src = storedBreeds[index].image.url;



// const markup = cars.map(({ id = "none", modal, type, price, img }) =>
//     `<li data-id="${id}">
//     <img src="${img}" alt="${modal}" class="img" />
//     <h2>Mark: ${modal}</h2>
//     <h3>Type: ${type}</h3>
//     <p>Price: ${price}</p>
// </li>`
// ).join('');
// container.insertAdjacentHTML("beforeend", markup);