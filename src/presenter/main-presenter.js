import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';
import EmptyFilterMessagesView from '../view/empty-filter-messages-view.js';

import { render, replace } from '../framework/render.js';
import { FilterType } from '../consts.js';

export default class MainPresenter {
  #mainContainer = null;
  #pointModel = null;
  #emptyMessagesContainer = null;

  #sortComponent = new SortView();
  #listComponent = new TripListView();

  #mainPoints = [];

  constructor({ mainContainer, emptyMessagesContainer, pointModel }) {
    this.#mainContainer = mainContainer;
    this.#pointModel = pointModel;
    this.#emptyMessagesContainer = emptyMessagesContainer;
  }

  init() {
    this.#mainPoints = [...this.#pointModel.points];

    if (this.#mainPoints.length === 0) {
      render(new EmptyFilterMessagesView({ filterType: FilterType.EVERYTHING }), this.#emptyMessagesContainer);
      return;
    }

    render(this.#sortComponent, this.#mainContainer);
    render(this.#listComponent, this.#mainContainer);

    this.#mainPoints.forEach((point) => {
      this.#renderPoint(point, this.#pointModel.getOffersByType(point.type), this.#pointModel.getDestinationsById(point.destination));
    });
  }

  #renderPoint(point, offers, destination) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point, offers, destination, onEditButtonClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formEditComponent = new FormEditView({
      point, offers, destination,
      onEditButtonClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(formEditComponent, pointComponent);
    }
    function replaceFormToPoint() {
      replace(pointComponent, formEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
