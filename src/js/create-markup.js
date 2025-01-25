export const createMarkup = arr => {
    return arr.map(item => `
        <li class='gallery__item'>
            <img src='${item.urls.small}' alt='${item.alt_description}' class='gallery-img' />
        </li>
        `).join('');
}