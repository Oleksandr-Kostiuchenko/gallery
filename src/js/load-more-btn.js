import { refs } from './refs';

export const showBtn = () => refs.loadMoreBtn.classList.remove('is-hidden');

export const hideBtn = () => refs.loadMoreBtn.classList.add('is-hidden');
