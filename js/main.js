import './create-comment.js';
import './render-picture.js';
import './full-picture.js';
import './user-form.js';
import './resize-img.js';
import './api.js';
import './validate.js';
import { setFormSubmit } from './validate.js';
import { hideModal } from './user-form.js';
import { getData } from './api.js';
import {  comparePopularPhoto, compareRandomPhoto, renderPictures, setDefaultSortClick, setPopularSortClick, setRandomSortClick } from './render-picture.js';
import { debounce } from './debounce.js';
const RERENDER_DELAY = 500;

getData((data) => {
  renderPictures(data, 25);
  setDefaultSortClick(debounce(() => renderPictures(data, 25), RERENDER_DELAY));
  setRandomSortClick(debounce(() => renderPictures(data, 10, compareRandomPhoto), RERENDER_DELAY));
  setPopularSortClick(debounce(() => renderPictures(data, 25, comparePopularPhoto), RERENDER_DELAY));
}
  // (data) => sortBtn.addEventListener('click', ()=> {
  //   renderPopularPhoto(data);
  // })
);
setFormSubmit(hideModal);

