//* Import modules
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPhotos } from './unsplash-api';
import { refs } from './refs';
import { createMarkup } from './create-markup';
import { showLoader, hideLoader } from './loaders';
import { showBtn, hideBtn } from './load-more-btn';

//* Function
let page = 1;
let searchQuery = '';

const onFormSubmit = async event => {
  event.preventDefault();
  refs.galleryList.innerHTML = '';
  page = 1;
  showLoader();
  hideBtn();
  searchQuery = event.currentTarget.elements['user-search-query'].value.trim();

  try {
    const response = await getPhotos(searchQuery, page);

    if (response.results.length === 0) {
      iziToast.error({
        message: 'Bad request.',
        position: 'topRight',
      });

      return;
    }

    if (response.total > 12) showBtn();

    refs.galleryList.innerHTML = createMarkup(response.results);

    iziToast.success({
      message: `We find ${response.total} pictures`,
      position: 'topRight',
    });
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

const onClickMoreBtn = async () => {
  page++;

  showLoader();

  try {
    const response = await getPhotos(searchQuery, page);
    refs.galleryList.insertAdjacentHTML(
      'beforeend',
      createMarkup(response.results)
    );

    const lastPage = Math.ceil(response.total / 12);

    console.log(response);

    if (lastPage === page) {
      hideBtn();
      iziToast.info({
        message: 'Last page',
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

//* Add event listener
refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onClickMoreBtn);
