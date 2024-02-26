import { commentsCount } from './create-comment.js';
import { getRandomNumber } from './random-number.js';


// eslint-disable-next-line no-console
console.log(commentsCount());

// eslint-disable-next-line arrow-body-style
export const createPhoto = () => {
  // const comms = commentsCount();
  // eslint-disable-next-line no-console
  // console.log(comms);
  return {
    id: getRandomNumber(0, 25),
    url: `photos/${getRandomNumber(1, 25)}.jpg`,
    description: 'какое-то описание',
    likes: getRandomNumber(15, 200),
    // comments: [createRandomComment()],
    comments: commentsCount(getRandomNumber(0, 10)),

  };
};

export const createPhotos = () => Array.from({length: 5}, createPhoto);
