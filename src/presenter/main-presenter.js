import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyFilterMessagesView from '../view/empty-filter-messages-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

import PointPresenter from './point-presenter.js';
import NewFormPresenter from './new-form-presenter.js';

import { render, replace, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';


import { FilterType, EmptyFilterMessages, DEFAULT_SORT, UserAction, UpdateType, InfoMessage, TimeLimit } from '../consts.js';
import { filterPoints, sortPoints } from '../utils/common.js';
import LoadingView from '../view/loading-view.js';


export default class MainPresenter {
  #mainContainer = null;
  #headerContainer = null;

  #pointModel = null;
  #filterModel = null;

  #emptyFilterMessagesComponent = null;
  #sortComponent = null;
  #listComponent = new TripListView();
  #addNewButtonComponent = null;
  #loadingComponent = null;
  #errorMessageComponent = null;

  #isLoading = true;

  #pointPresenters = new Map();
  #newFormPresenter = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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
    this.#renderNewButton();
    this.#renderBoard();
  }

  get points() {
    return [...this.#pointModel.points];
  }

  get offers() {
    return [...this.#pointModel.offers];
  }

  get destinations() {
    return [...this.#pointModel.destinations];
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, updatedPoint) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(updatedPoint.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointPresenters.get(updatedPoint.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newFormPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, updatedPoint);
        } catch (err) {
          this.#newFormPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(updatedPoint.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointPresenters.get(updatedPoint.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#sortComponent);
        this.#clearBoard();
        this.#renderErrorMessage();
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
    this.#newFormPresenter = new NewFormPresenter({
      headerContainer: this.#listComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onViewAction: this.#handleViewAction,
      onDestroy: this.#handleDestroyForm,
    });
    this.#currentSortType = DEFAULT_SORT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newFormPresenter.init();
  };

  #handleDestroyForm = () => {
    this.#addNewButtonComponent.element.disabled = false;
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      offers: this.offers,
      destinations: this.destinations
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderLoading() {
    this.#loadingComponent = new LoadingView({ message: InfoMessage.LOADING });
    render(this.#loadingComponent, this.#mainContainer);
  }

  #renderErrorMessage() {
    this.#errorMessageComponent = new LoadingView({ message: InfoMessage.ERROR });
    render(this.#errorMessageComponent, this.#listComponent);
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
    if (this.#isLoading) {
      remove(this.#errorMessageComponent);
      this.#renderLoading();
      return;
    }
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#pointModel.points);

    if (filteredPoints.length === 0) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
      this.#renderEmptyMessages();
      return;
    }

    remove(this.#emptyFilterMessagesComponent);

    const sortedPoints = sortPoints(this.#currentSortType, filteredPoints);

    this.#renderSort();
    this.#renderPointsList(sortedPoints);
  }
}
