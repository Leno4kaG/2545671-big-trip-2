import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes, DISABLED_SORTS, DEFAULT_SORT } from '../consts.js';

function createItemSortTemplate(type) {

  const isChecked = DEFAULT_SORT === type ? 'checked' : '';
  const isDisabled = DISABLED_SORTS.includes(type) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${type}" value="${type}" ${isChecked} ${isDisabled}>
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`;
}

function createSortTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
         ${Object.values(SortTypes).map((type) => createItemSortTemplate(type)).join('')}
          </form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = () => { };

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;
    this.#handleSortTypeChange(sortType);
  };
}
