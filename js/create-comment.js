import {  getRandomNumber } from './random-number.js';

const createComment = (comment) => ({
  id: comment.id,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: comment.message,
  name: comment.name,
});

const createPicture = (picture) => ({
  id: picture.id,
  url: `photos/${picture.id}.jpg`,
  description: picture.description,
  likes: picture.likes,
  // comments: picture.comments,
  comments: Array.from(
    { length:  picture.comments.length },
    (comment) => createComment(comment)
  ),
});

const getPictures = () =>
  Array.from({ length: getRandomNumber(10, 25) }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

export { getPictures };
