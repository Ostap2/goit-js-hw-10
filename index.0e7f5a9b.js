!function(){document.querySelector(".error"),document.querySelector(".loader"),document.querySelector(".cat-info");var e="live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH";var t=document.querySelector(".error"),n=document.querySelector(".loader"),o=document.querySelector(".cat-info"),r=document.querySelector(".breed-select");t.textContent="",t.style.display="none",r.style.visibility="hidden";var c=[];function i(){var t,n=null===(t=c.find((function(e){return"Abyssinian"===e.name})))||void 0===t?void 0:t.id;if(n){var i="https://api.thecatapi.com/v1/images/search?breed_ids=".concat(n);return fetch(i,{headers:{"x-api-key":e}}).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){var t=r.selectedIndex;c[t],function(){var e=r.selectedIndex;c.length>1&&(o.innerHTML="");var t=document.createElement("img"),n=document.createElement("h2"),i=document.createElement("p"),a=document.createElement("h3");t.style.display="block",t.src="".concat(c[e].image.url),t.style.width="".concat(700,"px"),t.style.height="".concat(600,"px"),t.style.backgroundSize="cover",n.textContent="".concat(c[e].name),n.style.fontSize="".concat(38,"px"),n.style.marginBottom=0,n.style.backgroundColor="rgb(255, 255, 255)",i.textContent="".concat(c[e].description),i.style.fontSize="".concat(24,"px"),a.textContent="Temperament: ".concat(c[e].temperament),a.style.fontSize="".concat(28,"px"),a.style.marginTop=0,o.innerHTML="",o.append(t,n,i,a)}()})).catch((function(e){return a()}))}a()}function a(){n.style.display="none",n.textContent="",t.textContent="Oops! Something went wrong! Try reloading the page!",t.style.display="block"}r.addEventListener("change",i),n.style.display="block",fetch("https://api.thecatapi.com/v1/breeds",{headers:{"x-api-key":e}}).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){e=e.filter((function(e){var t;return null!=(null===(t=e.image)||void 0===t?void 0:t.url)})),c=e;for(var t=0;t<c.length;t++){var o=c[t];if(o.image){var a=document.createElement("option");a.value=o.id,a.innerHTML="".concat(o.name),r.appendChild(a)}}r.style.visibility="visible",n.style.display="none",i()})).catch((function(e){n.style.display="none",a(),console.error(e)}))}();
//# sourceMappingURL=index.0e7f5a9b.js.map
