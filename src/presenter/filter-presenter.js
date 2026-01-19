import FiltersView from '../view/filters-view.js';

import { remove, render, replace } from '../framework/render.js';
import { filterPoints } from '../utils/common.js';
import { FilterType, UpdateType } from '../consts.js';

export default class FilterPresenter {
  #filterContainer = null;
  #pointModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => ({
      type,
      count: (this.#pointModel.points.length > 0) ? filterPoints(type, this.#pointModel.points) : 0,
      isChecked: type === this.#filterModel.filter,
    }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: this.filters,
      onFilterChange: this.#handleFilterChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };

  #handleModelEvent = () => {
    this.init();
  };
}
