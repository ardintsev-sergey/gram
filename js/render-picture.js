import { renderFullPicture } from './full-picture.js';
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

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

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureEl = createPhoto(picture);
    fragment.append(pictureEl);
  });

  picturesList.append(fragment);
};

export  {renderPictures};
