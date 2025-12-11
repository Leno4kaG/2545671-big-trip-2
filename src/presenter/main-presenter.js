import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyFilterMessagesView from '../view/empty-filter-messages-view.js';

import PointPresenter from './point-presenter.js';

import { render } from '../framework/render.js';

import { updateItem } from '../utils/common.js';
import { FilterType } from '../consts.js';

export default class MainPresenter {
  #mainContainer = null;
  #pointModel = null;
  #emptyMessagesContainer = null;

  #sortComponent = new SortView();
  #listComponent = new TripListView();

  #mainPoints = [];
  #pointPresenters = new Map();

  constructor({ mainContainer, emptyMessagesContainer, pointModel }) {
    this.#mainContainer = mainContainer;
    this.#pointModel = pointModel;
    this.#emptyMessagesContainer = emptyMessagesContainer;
  }

  init() {
    this.#mainPoints = [...this.#pointModel.points];
    this.#renderMain();
  }

  #handelModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint, updatedOffers, updatedDestination) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, updatedOffers, updatedDestination);
  };

  #renderSort() {
    render(this.#sortComponent, this.#mainContainer);
  }

  #renderList() {
    render(this.#listComponent, this.#mainContainer);
  }

  #renderAllPoint() {
    this.#mainPoints.forEach((point) => {
      this.#renderPoint(point, this.#pointModel.getOffersByType(point.type), this.#pointModel.getDestinationsById(point.destination));
    });
  }

  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({ pointListContainer: this.#listComponent.element, onDateChange: this.#handlePointChange, onModeChange: this.#handelModeChange });
    pointPresenter.init(point, offers, destination);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderMain() {
    if (this.#mainPoints.length === 0) {
      render(new EmptyFilterMessagesView({ filterType: FilterType.EVERYTHING }), this.#emptyMessagesContainer);
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderAllPoint();
  }
}
