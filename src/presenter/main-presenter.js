import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyFilterMessagesView from '../view/empty-filter-messages-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

import PointPresenter from './point-presenter.js';
import NewFormPresenter from './new-form-presenter.js';

import { render, replace, remove } from '../framework/render.js';


import { FilterType, EmptyFilterMessages, DEFAULT_SORT, UserAction, UpdateType } from '../consts.js';
import { sortPoints } from '../utils/common.js';
import { filterPoints } from '../utils/date.js';


export default class MainPresenter {
  #mainContainer = null;
  #pointModel = null;
  #filterModel = null;
  #offers = [];
  #destinations = [];

  #emptyFilterMessagesComponent = null;
  #sortComponent = null;
  #listComponent = new TripListView();
  #addNewButtonComponent = null;
  #headerContainer = null;


  #pointPresenters = new Map();
  #currentSortType = DEFAULT_SORT;

  constructor({ mainContainer, headerContainer, pointModel, filterModel }) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#renderNewButton();
    this.#renderBoard();
  }

  get points() {
    return [...this.#pointModel.points];
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, updatedPoint);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, updatedPoint);
        break;
    }
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.init();
        break;
    }
  };

  #renderNewButton() {
    if (this.#addNewButtonComponent) {
      remove(this.#addNewButtonComponent);
      this.#addNewButtonComponent = null;
    }

    this.#addNewButtonComponent = new NewEventButtonView({ onNewButtonClick: this.#handleNewButtonClick });
    render(this.#addNewButtonComponent, this.#headerContainer);
  }

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#mainContainer);
      return;
    }
    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  #clearBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleNewButtonClick = () => {
    this.#addNewButtonComponent.element.disabled = true;
    const newFormPresenter = new NewFormPresenter({
      headerContainer: this.#listComponent.element,
      offers: this.#offers,
      destinations: this.#destinations,
      onViewAction: this.#handleViewAction,
      onDestroy: this.#handleDestroyForm,
    });
    this.#currentSortType = DEFAULT_SORT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    newFormPresenter.init();
  };

  #handleDestroyForm = () => {
    this.#addNewButtonComponent.element.disabled = false;
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      offers: this.#offers,
      destinations: this.#destinations
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEmptyMessages() {
    this.#emptyFilterMessagesComponent = new EmptyFilterMessagesView({ filterType: EmptyFilterMessages[this.#filterModel.filter.toUpperCase()] });
    render(this.#emptyFilterMessagesComponent, this.#mainContainer);
  }

  #renderPointsList(pointsToRender) {
    render(this.#listComponent, this.#mainContainer);

    pointsToRender.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#pointModel.points);

    if (filteredPoints.length === 0) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
      this.#renderEmptyMessages();
      return;
    }

    remove(this.#emptyFilterMessagesComponent);

    sortPoints(this.#currentSortType, filteredPoints);

    this.#renderSort();
    this.#renderPointsList(filteredPoints);
  }
}
