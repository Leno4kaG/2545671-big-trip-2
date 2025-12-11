import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';

import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../consts.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDateChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #formEditComponent = null;

  #point = null;
  #offers = [];
  #destination = [];
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, onDateChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDateChange = onDateChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, offers, destination) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point, offers: this.#offers, destination: this.#destination,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditButtonClick: this.#handleEditButtonClick
    });

    this.#formEditComponent = new FormEditView({
      point: this.#point, offers: this.#offers, destination: this.#destination,
      onEditButtonClick: this.#handleEditFormDeleteSubmit,
      onFormSubmit: this.#handleEditFormAdditionSubmit
    });

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
      return;
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditComponent, prevFormEditComponent);
      return;
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPointCloseForm();
    }
  }

  #replacePointToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPointOpenForm() {
    replace(this.#pointComponent, this.#formEditComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPointCloseForm() {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPointCloseForm();
    }
  };

  #handleEditButtonClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDateChange({ ...this.#point, isFavorite: !this.#point.isFavorite }, this.#offers, this.#destination);
  };

  #handleEditFormAdditionSubmit = (point) => {
    this.#handleDateChange(point);
    this.#replaceFormToPointOpenForm();
  };

  #handleEditFormDeleteSubmit = () => {
    this.#replaceFormToPointCloseForm();
  };
}
