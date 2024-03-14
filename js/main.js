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


getData((data) => {
  renderPictures(data, 25);
  setDefaultSortClick(() => renderPictures(data, 25));
  setRandomSortClick(() => renderPictures(data, 10, compareRandomPhoto));
  setPopularSortClick(() => renderPictures(data, 25, comparePopularPhoto));
}
  // (data) => sortBtn.addEventListener('click', ()=> {
  //   renderPopularPhoto(data);
  // })
);
setFormSubmit(hideModal);

