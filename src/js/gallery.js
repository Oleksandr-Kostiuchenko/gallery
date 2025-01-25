//* Import modules 
import { getPhotos } from "./unsplash-api";
import { refs } from "./refs";
import { createMarkup } from "./create-markup";
import { showLoader, hideLoader } from "./loaders";

//* Function
let page = 1;

const onFormSubmit = async event => {
    event.preventDefault();
    refs.galleryList.innerHTML = '';
    showLoader();
    const searchQuery = event.currentTarget.elements['user-search-query'].value.trim();

    try {
        const response = await getPhotos(searchQuery, page);
        
        refs.galleryList.innerHTML = createMarkup(response.results);
    } catch (err) {
        console.log(err);
    } finally {
        hideLoader();
    }
}

//* Add event listener
refs.form.addEventListener('submit', onFormSubmit);