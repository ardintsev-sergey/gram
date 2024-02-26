const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

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
const hasValidSymbols = (tag) => !UNVALID_SYMBOLS.test(tag.slice(1));

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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

form.addEventListener('submit', onFormSubmit);
