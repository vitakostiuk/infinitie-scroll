import InfiniteScroll from 'infinite-scroll';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import refs from './components/refs';
import ImageApiService from './services/api';
import '../sass/main.scss';
import markupCardTpl from './templates/markup.hbs';


const imageApiService = new ImageApiService();

let infScroll = new InfiniteScroll( refs.gallery, {
  // options
  path: function() {
  return `${imageApiService.getApiUrl()}&page=${this.pageIndex}`;
  },
  responseBody: 'json',
  history: false,
});

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

    imageApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    imageApiService.resetPage();
  clearGallery();
  
  if (imageApiService.query === '') {
    Notify.warning('Enter a request');
    return;
  }

  infScroll.loadNextPage();

  infScroll.on('load', function (response) {
  const proxyElem = document.createElement('div');
  
  const markup = markupCardTpl(response.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
    
  proxyElem.innerHTML = markup;

  const gallaryCards = proxyElem.querySelectorAll('.photo-card');
  infScroll.appendItems(gallaryCards);

  openLargeImage();
});
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function openLargeImage() {
  const lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  return lightbox;
}
