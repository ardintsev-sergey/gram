import { renderFullPicture } from './full-picture.js';
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const imgFilters = document.querySelector('.img-filters');


commentCount.classList.remove('hidden');
commentsLoader.classList.remove('hidden');

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPhoto = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  if (pictureElement) {
    pictureElement.addEventListener('click', () => {
      renderFullPicture(photo);
    });
  }

  return pictureElement;
};

const sortDefaultBtn = document.querySelector('#filter-default');
const sortPopularBtn = document.querySelector('#filter-discussed');
const sortRandomBtn = document.querySelector('#filter-random');
// const activeBtn = document.querySelector('.img-filters__button--active');

export const renderPopularPhoto = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.slice()
    .sort()
    .slice(0, 10)
    .forEach((picture) => {
      const pictureEl = createPhoto(picture);
      fragment.append(pictureEl);
    });

  picturesList.innerHTML='';
  picturesList.append(fragment);
};

export const comparePopularPhoto = (a, b) =>  b.comments.length - a.comments.length;
export const compareRandomPhoto = () => Math.random() - 0.5;
// function shuffle(arr){
//  eslint-disable-next-line no-console
// console.log(arr);
// let j, temp;
// for(let i = arr.length - 1; i > 0; i--){
//   j = Math.floor(Math.random()*(i + 1));
//   temp = arr[j];
//   arr[j] = arr[i];
//   arr[i] = temp;
// }
// //  eslint-disable-next-line no-console
// console.log(arr);
// return arr;
// return
// };

export const setDefaultSortClick =(cb) => {
  sortDefaultBtn.addEventListener('click', () => {
    cb();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    sortDefaultBtn.classList.add('img-filters__button--active');
  });
};

export const setRandomSortClick = (cb) => {
  sortRandomBtn.addEventListener('click', ()=> {
    // picturesList.innerHTML = '';
    cb();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    sortRandomBtn.classList.add('img-filters__button--active');
  });
};

export const setPopularSortClick = (cb) => {
  sortPopularBtn.addEventListener('click', ()=> {
    // picturesList.innerHTML = '';
    cb();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    sortPopularBtn.classList.add('img-filters__button--active');
  });
};


const renderPictures = (pictures, pictureCount, compareFn) =>  new Promise( (  ) => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
  const fragment = document.createDocumentFragment();
  pictures
    .slice()
    .sort(compareFn)
    .slice(0, pictureCount)
    .forEach((picture) => {
      const pictureEl = createPhoto(picture);
      fragment.append(pictureEl);
    });
  // picturesList.innerHTML = '';
  picturesList.append(fragment);
})
  .then(
    setTimeout(() => imgFilters.classList.remove('img-filters--inactive'), 5000)
  );

export {renderPictures};
