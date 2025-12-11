import AbstractView from '../framework/view/abstract-view.js';
import { SortType, DEFAULT_SORT } from '../consts.js';

function createItemSortTemplate(type) {

  const isChecked = DEFAULT_SORT === type ? 'checked' : '';
  const isDisabled = SortType.DISABLED_SORTS.includes(type) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked} ${isDisabled}>
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`;
}

function createSortTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
         ${SortType.SORT_TYPES.map((type) => createItemSortTemplate(type)).join('')}
          </form>`;
}

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
