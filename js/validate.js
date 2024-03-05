// import { hideBigPicture } from './full-picture.js';

import { sendData } from './api.js';
// import { onEscKeyDown } from './full-picture.js';
import { hideModal } from './user-form.js';

const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const INVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTag = tags.map((tag)=>tag.toLowerCase());
  return lowerCaseTag.length === new Set(lowerCaseTag).size;
};

const startsWithHash = (tag) => tag[0] === '#';

const hasValidLength = (tag) => tag.length >= MIN_HASHTAG_LENGTH && tag.length <= MAX_HASHTAG_LENGTH;
const hasValidSymbols = (tag) => !INVALID_SYMBOLS.test(tag.slice(1));

const isValidTag = (tag) => startsWithHash(tag)
&& hasValidLength(tag) && hasValidSymbols(tag);


const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);


const showAlert = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  document.addEventListener('keydown', () => errorElement.remove());

  document.addEventListener( 'click', (e) => {
    const errorDiv = errorElement.querySelector('.error__inner');
    const withinBoundaries = e.composedPath().includes(errorDiv);

    if ( ! withinBoundaries ) {
      errorElement.remove();
    }
  });

  document.body.append(errorElement);
};

const showSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  successElement.querySelector('.success__button').addEventListener('click', () => {
    successElement.remove();
  });
  document.addEventListener('keydown', () => successElement.remove());

  document.addEventListener( 'click', (e) => {
    const errorDiv = successElement.querySelector('.success__inner');
    const withinBoundaries = e.composedPath().includes(errorDiv);

    if ( ! withinBoundaries ) {
      successElement.remove();
    }
  });

  document.body.append(successElement);

  setTimeout(() => {
    successElement.remove();
  }, 5000);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

export const setFormSubmit = async (onSuccess) => {
  await form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();

    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccess();
        },
        () => {
          hideModal();
          showAlert();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  }
  );
};
