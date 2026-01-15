import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes, DISABLED_SORTS } from '../consts.js';

function createItemSortTemplate(type, currentSortType) {
  const isChecked = type === currentSortType ? 'checked' : '';
  const isDisabled = DISABLED_SORTS.includes(type) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${type}" value="${type}" ${isChecked} ${isDisabled}>
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`;
}

function createSortTemplate(currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
         ${Object.values(SortTypes).map((type) => createItemSortTemplate(type, currentSortType)).join('')}
          </form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = () => { };
  #currentSortType = null;

  constructor({ onSortTypeChange, currentSortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;
    this.#handleSortTypeChange(sortType);
  };
}
