const smallerBtn = document.querySelector('.scale__control--smaller');
const biigerBtn = document.querySelector('.scale__control--bigger');
const sizeValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
sizeValue.value = '55%';

let value = +sizeValue.value.slice(0, 2);
let scaleValue = value/100;
imgPreview.style.transform = `scale(${scaleValue}`;
//  eslint-disable-next-line no-console
// console.log(value, scaleValue);

smallerBtn.addEventListener('click', () => {
  if (value < 50) {
    value = 25;
  } else {
    value -= 25;
  }
  scaleValue = value/100;
  //  eslint-disable-next-line no-console
  // console.log(value, scaleValue);
  sizeValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${scaleValue}`;
});

biigerBtn.addEventListener('click', () => {
  if (value > 125) {
    value = 150;
  } else {
    value += 25;
  }
  scaleValue = value/100;
  //  eslint-disable-next-line no-console
  // console.log(value, scaleValue);
  sizeValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${scaleValue}`;
});

const formPreview = document.querySelector('.effects');
let inputValue = 'none';
formPreview.addEventListener('change', onFilterChange);

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});
sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  //  eslint-disable-next-line no-console
  // console.log(valueElement.value);

  switch (inputValue) {
    case 'chrome':
      imgPreview.style.filter = 'none';
      imgPreview.style.filter = `grayscale(${valueElement.value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = 'none';
      imgPreview.style.filter = `sepia(${valueElement.value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = 'none';
      imgPreview.style.filter = `invert(${valueElement.value}%)`;

      break;
    case 'phobos':
      imgPreview.style.filter = 'none';
      imgPreview.style.filter = `blur(${valueElement.value}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = 'none';
      imgPreview.style.filter = `brightness(${valueElement.value})`;
      break;
    default:
      imgPreview.style.filter = 'none';
  }
});

function onFilterChange (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    imgPreview.className = 'img-upload__preview';
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    //  eslint-disable-next-line no-console
    // console.log(evt.target.value);
  }

  switch (evt.target.value) {
    case 'chrome':
      inputValue = 'chrome';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      break;
    case 'sepia':
      inputValue = 'sepia';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      break;
    case 'marvin':
      inputValue = 'marvin';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
      break;
    case 'phobos':
      inputValue = 'phobos';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      break;
    case 'heat':
      inputValue = 'heat';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      break;
    default:
      inputValue = 'none';
      imgPreview.style.filter = 'none';
  }
}
