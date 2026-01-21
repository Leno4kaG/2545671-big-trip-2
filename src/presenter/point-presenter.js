import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';

import { render, replace, remove } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../consts.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleViewAction = null;
  #handleModeChange = null;

  #pointComponent = null;
  #formEditComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, onDataChange, onModeChange, offers, destinations }) {
    this.#pointListContainer = pointListContainer;
    this.#handleViewAction = onDataChange;
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
      onFormSubmit: this.#handleEditFormSubmit,
      onButtonDeleteClick: this.#handleButtonDeleteClick,
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
      replace(this.#pointComponent, prevFormEditComponent);
      this.#mode = Mode.DEFAULT;
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
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.PATCH, { ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleEditButtonCloseClick = () => {
    this.#replaceFormToPoint();
  };

  #handleEditFormSubmit = (point) => {
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleButtonDeleteClick = (point) => {
    this.#handleViewAction(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#formEditComponent.updateElement({
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#formEditComponent.updateElement({
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#formEditComponent.updateElement({
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#formEditComponent.shake(resetFormState);
  }
}
