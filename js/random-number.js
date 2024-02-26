/* eslint-disable arrow-body-style */
export function getRandomNumber (a, b) {
  const minNumber = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNumber = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  return randomNumber;
}

// eslint-disable-next-line arrow-body-style
export const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};
