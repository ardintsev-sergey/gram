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
import { renderPictures } from './render-picture.js';

getData((data) => renderPictures(data));
setFormSubmit(hideModal);
