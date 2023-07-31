const errorItem = document.querySelector('.error');
// errorItem.hidden = true;
const loaderItem = document.querySelector('.loader');
// loaderItem.hidden = false;
const catInfo = document.querySelector('.cat-info')

const breeds = `https://api.thecatapi.com/v1/breeds`;
// const breed = 'https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}'
const api_key = "live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH"

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








// https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}

// ?${searchParams}
        // "breeds": 

        //         "id": "acur",
        //         "name": "American Curl",
                
        //         "temperament": "Affectionate, Curious, Intelligent, Interactive, Lively, Playful, Social",
             
        //         "description": "Distinguished by truly unique ears that curl back in a graceful arc, offering an alert, perky, happily surprised expression, they cause people to break out into a big smile when viewing their first Curl. Curls are very people-oriented, faithful, affectionate soulmates, adjusting remarkably fast to other pets, children, and new situations.",

        // "id": "ji-5E0VwY",
        // "url": "https://cdn2.thecatapi.com/images/ji-5E0VwY.jpg",


// +++++++++++++
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
// ++++++++++++++