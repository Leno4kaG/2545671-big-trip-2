import FiltersView from '../view/filters-view.js';

import { render } from '../framework/render.js';
import { generateFilter } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #pointModel = null;
  #filtres = [];

  constructor({ filterContainer, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#pointModel = pointModel;
    this.#filtres = generateFilter(this.#pointModel.points);
  }

  init() {
    render(new FiltersView({ filters: this.#filtres }), this.#filterContainer);
  }

}
