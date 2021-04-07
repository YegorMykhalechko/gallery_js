'use strict';
import items from './gallery-items.js';

const list = document.querySelector('.gallery');

const div = document.querySelector('.lightbox');

const image = document.querySelector('.lightbox__image');

let originItems = [];

const gallery = items.forEach(item => {
  list.insertAdjacentHTML('afterbegin', `<li class="gallery__item">
                                                <a class="gallery__link" href = "${item.original}">
                                                     <img class="gallery__image" src = "${item.preview}" data-source = "${item.original}" alt = "${item.description}">
                                                 </a>
                                            </li>`);
  originItems.push(item.original);
})

list.addEventListener('click', handleOpenModal);

function handleOpenModal(e) {
  e.preventDefault();

  const target = e.target;
  if (target.nodeName !== 'IMG')
    return;
  div.classList.add('is-open');
  image.src = target.dataset.source;
  image.alt = target.alt;

  window.addEventListener('keydown', handleEsqCloseModal);

  window.addEventListener('keydown', handleScroll);
}

div.addEventListener('click', handleCloseModal)
function handleCloseModal(e) {
  const target = e.target;
  if (target.nodeName === 'IMG')
    return;
  div.classList.remove('is-open');

  image.removeAttribute('src');

  window.removeEventListener('keydown', handleEsqCloseModal);
  window.removeEventListener('keydown', handleScroll);
}

function handleEsqCloseModal(e) {
  const target = e.code;
  if (target === 'Escape') {
    handleCloseModal(e)
  }
}

function handleScroll(e) {
  let index = originItems.indexOf(image.src);

  if (e.code === 'ArrowLeft') {
    if (index < originItems.length - 1) {
      image.setAttribute("src", originItems[index + 1]);
      return;
    }
    index = -1;
    image.setAttribute("src", originItems[index + 1]);
  }

  if (e.code === 'ArrowRight') {
    if (index === 0) {
      index = originItems.length;
      image.setAttribute("src", originItems[index - 1]);
      return;
    }
    image.setAttribute("src", originItems[index - 1]);
  }
}






