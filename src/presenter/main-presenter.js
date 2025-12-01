import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';

import { render, replace } from '../framework/render.js';

export default class MainPresenter {
  #container = null;
  #pointModel = null;

  #sortComponent = new SortView();
  #listComponent = new TripListView();

  #mainPoints = [];

  constructor({ container, pointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#mainPoints = [...this.#pointModel.points];
    render(this.#sortComponent, this.#container);
    render(this.#listComponent, this.#container);


    for (let i = 1; i < this.#mainPoints.length; i++) {
      this.#renderPoint(this.#mainPoints[i], this.#pointModel.getOffersByType(this.#mainPoints[i].type), this.#pointModel.getDestinationsById(this.#mainPoints[i].destination));
    }
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
