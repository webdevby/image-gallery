const imgPerPage = 12;
const search = document.getElementById('search');
const btnClear = document.querySelector('.btn-clear');
const imgWrapper = document.querySelector('.imgWrapper');
let isSearchEmpty = true;

async function showImages (imagesArr) {
  imgWrapper.innerHTML = "";
  imagesArr.map((el) => {
    const img = document.createElement('img');
    img.classList.add('gallery-img');
    img.alt = 'image';
    img.src = el.urls.regular;
    imgWrapper.append(img);
  });
}

async function getRandomImg() {
  const url = `https://api.unsplash.com/photos/random?count=${imgPerPage}&orientation=landscape&client_id=41dUw3xmuZtxyu57YHSRCPOYYMMfbsvbzTowcsZNKSU`;
  const res = await fetch(url);
  const data = await res.json();
  showImages(data);
}

async function getDirectImg() {
  const query = search.value;
  const url = `https://api.unsplash.com/search/photos?orientation=landscape&per_page=${imgPerPage}&query=${query}&client_id=41dUw3xmuZtxyu57YHSRCPOYYMMfbsvbzTowcsZNKSU`;
  const res = await fetch(url);
  const data = await res.json();
  showImages(data.results);
}

function searchByEnter(e) {
  if (e.keyCode === 13) {
    if (search.value) {
      getDirectImg();
    }
  }
}

function toggleBtnClear() {
  if (search.value === '' && isSearchEmpty === false){
    btnClear.classList.remove('btn-clear-visible');
    isSearchEmpty = true;
  } else if (search.value !== '' && isSearchEmpty){
    btnClear.classList.add('btn-clear-visible');
    isSearchEmpty = false;
  }
}

function clearSearchField() {
  search.value = '';
  isSearchEmpty = true;
  btnClear.classList.remove('btn-clear-visible');
}

getRandomImg ();

search.addEventListener('input', toggleBtnClear);
btnClear.addEventListener('click', clearSearchField);
document.addEventListener('load', search.focus());
search.addEventListener('keydown', searchByEnter);
