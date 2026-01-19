import NewFormView from '../view/new-form-view.js';

import { UserAction, UpdateType } from '../consts.js';
import { remove, render, RenderPosition } from '../framework/render.js';

export default class NewFormPresenter {
  #headerContainer = null;
  #offers = [];
  #destinations = [];
  #handleViewAction = null;
  #handleDestroy = null;

  #newFormComponent = null;

  constructor({ headerContainer, offers, destinations, onViewAction, onDestroy }) {
    this.#headerContainer = headerContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleViewAction = onViewAction;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newFormComponent !== null) {
      return;
    }

    this.#newFormComponent = new NewFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });
    render(this.#newFormComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this.#newFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newFormComponent);
    this.#newFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newFormComponent.updateElement({
      isSaving: true,
    });
  }

  #handleFormSubmit = (point) => {
    this.#handleViewAction(UserAction.ADD_POINT, UpdateType.MAJOR, point);
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  setAborting() {
    const resetFormState = () => {
      this.#newFormComponent.updateElement({
        isSaving: false,
      });
    };
    this.#newFormComponent.shake(resetFormState);
  }
}
