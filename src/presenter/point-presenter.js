import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';

import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../consts.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #formEditComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, onDataChange, onModeChange, offers, destinations }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point, offers: this.#offers, destinations: this.#destinations,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditButtonClick: this.#handleEditButtonClick
    });

    this.#formEditComponent = new FormEditView({
      point: this.#point, offers: this.#offers, destinations: this.#destinations,
      onEditButtonClick: this.#handleEditButtonCloseClick,
      onFormSubmit: this.#handleEditFormSubmit
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

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  #replacePointToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#formEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditButtonClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleEditButtonCloseClick = () => {
    this.#replaceFormToPoint();
  };

  #handleEditFormSubmit = (point) => {
    this.#replaceFormToPoint();
    this.#handleDataChange(point);
  };
}
