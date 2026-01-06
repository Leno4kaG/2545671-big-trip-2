import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyFilterMessagesView from '../view/empty-filter-messages-view.js';

import PointPresenter from './point-presenter.js';

import { render } from '../framework/render.js';

import { updateItem, sortPointsByPrice } from '../utils/common.js';
import { sortPointsByTime } from '../utils/date.js';
import { FilterType, DEFAULT_SORT, SortTypes } from '../consts.js';

export default class MainPresenter {
  #mainContainer = null;
  #pointModel = null;
  #offers = [];
  #destinations = [];
  #emptyMessagesContainer = null;

  #sortComponent = null;
  #listComponent = new TripListView();

  #mainPoints = [];
  #pointPresenters = new Map();
  #currentSortType = DEFAULT_SORT;
  #sourceMainPoints = [];

  constructor({ mainContainer, emptyMessagesContainer, pointModel }) {
    this.#mainContainer = mainContainer;
    this.#pointModel = pointModel;
    this.#emptyMessagesContainer = emptyMessagesContainer;
  }

  init() {
    this.#mainPoints = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#sourceMainPoints = [...this.#pointModel.points];
    this.#renderMain();
  }

  #handelModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#sourceMainPoints = updateItem(this.#sourceMainPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortTypes.TIME:
        this.#mainPoints.sort(sortPointsByTime);
        break;
      case SortTypes.PRICE:
        this.#mainPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#mainPoints = [...this.#sourceMainPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#mainContainer);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handelModeChange,
      offers: this.#offers,
      destinations: this.#destinations });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointsList() {
    render(this.#listComponent, this.#mainContainer);

    this.#mainPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderMain() {
    if (this.#mainPoints.length === 0) {
      render(new EmptyFilterMessagesView({ filterType: FilterType.EVERYTHING }), this.#emptyMessagesContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
