import AbstractView from '../framework/view/abstract-view.js';

function createItemFiltresTemplate({ type, count, isChecked }) {
  const isCheckedAtr = isChecked ? 'isChecked' : '';
  const isDisabled = (count === 0) ? 'disabled' : '';

  return `<div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isCheckedAtr} ${isDisabled}>
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>`;
}

function createFiltersTemplate(filters) {
  const filterItemsTemplate = filters.map((filter) => createItemFiltresTemplate(filter)).join('');
  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export default class FiltersView extends AbstractView {
  #filters = [];
  #handelFilterChange = () => { };

  constructor({ filters, onFilterChange }) {
    super();
    this.#filters = filters;
    this.#handelFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.#handelFilterChange(evt.target.value);
    }
  };
}
