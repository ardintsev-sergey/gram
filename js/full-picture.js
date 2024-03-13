const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
let commentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  commentsCount++;

  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });


  commentList.append(fragment);

  const step = 5;
  let item = 0;

  const tmp = Array.from(document.querySelectorAll('.social__comment'));

  tmp.slice(step).forEach((com) => com.classList.add('hidden'));
  item += step;

  commentsLoader.addEventListener('click', () => {
    tmp.slice(item, item + step).forEach((com) => com.classList.remove('hidden'));
    item += step;
  });
};

export const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

export function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const renderFullPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureDetails(data);
  renderComments(data.comments);
  commentsCount = 0;
  // eslint-disable-next-line no-console
  console.log(commentsCount);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export { renderFullPicture };
