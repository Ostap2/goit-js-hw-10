document.querySelector(".error"),document.querySelector(".loader"),document.querySelector(".cat-info");const e=document.querySelector(".error"),t=document.querySelector(".loader"),n=document.querySelector(".cat-info"),o=document.querySelector(".breed-select");e.textContent="",e.style.display="none",o.style.visibility="hidden";let r=[];function l(){let l=o.value;return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${l}`,{headers:{"x-api-key":api_key}}).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>{let t=o.selectedIndex;r[t],function(){let e=o.selectedIndex;r.length>1&&(n.innerHTML="");const t=document.createElement("img"),l=document.createElement("h2"),i=document.createElement("p"),c=document.createElement("h3");t.style.display="block",t.src=`${r[e].image.url}`,t.style.width="700px",t.style.height="600px",t.style.backgroundSize="cover",l.textContent=`${r[e].name}`,l.style.fontSize="38px",l.style.marginBottom=0,l.style.backgroundColor="rgb(255, 255, 255)",i.textContent=`${r[e].description}`,i.style.fontSize="24px",c.textContent=`Temperament: ${r[e].temperament}`,c.style.fontSize="28px",c.style.marginTop=0,n.innerHTML="",n.append(t,l,i,c)}()})).catch((n=>(t.style.display="none",t.textContent="",e.textContent="Oops! Something went wrong! Try reloading the page!",void(e.style.display="block"))))}fetch("https://api.thecatapi.com/v1/breeds",{headers:{"x-api-key":"live_CIw3lZRkcpgh759C9YBXivIvAETipzFqRyXtOHa4sXukf5xIGdNG9JZOQ72DPlKH"}}).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>{e=e.filter((e=>{var t;return null!=(null===(t=e.image)||void 0===t?void 0:t.url)})),r=e;for(let e=0;e<r.length;e++){const t=r[e];if(!t.image)continue;let n=document.createElement("option");n.value=t.id,n.innerHTML=`${t.name}`,o.appendChild(n)}o.style.visibility="visible"})).catch((e=>console.log(e))),o.addEventListener("change",l),t.style.display="block",l();
//# sourceMappingURL=index.750ecb43.js.map
