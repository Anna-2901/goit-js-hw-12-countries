
import refs from './refs.js';
import listNameCountry from '../templates/listName.hbs';
import country from '../templates/country.hbs';
import debounce from 'lodash.debounce';
import notifications from './notifications.js';
import showError from './notifications.js';
import fetchCountries from './fetchCountries.js';


refs.input.addEventListener('input', debounce(onSearch, 500));
function onSearch() {
  const searchQuery = getSearchQuery();
  refs.containerCountry.innerHTML = '';
  if (!searchQuery) {
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        return showError(
          'Введите название страны точнее');
      }
       else if (data.length > 1 && data.length <= 10) {
        renderCountriesList(data);
      } 
      else {
        renderOneCountry(data);
      }
    })
   .catch(error => {
      if (error === 404) {
        showError('Совпадений не найдено');
      } else {
        showError('Что-то пошло не так. Попробуйте еще раз');
      }
    });
}
function getSearchQuery() {
  return refs.input.value;
}
function renderOneCountry(data) {
  const oneCountryMarkup = country(data);
  refs.containerCountry.insertAdjacentHTML('beforeend', oneCountryMarkup);
}
function renderCountriesList(data) {
  const countriesListMarkup = listNameCountry(data);
  refs.containerCountry.insertAdjacentHTML('beforeend', countriesListMarkup);
}