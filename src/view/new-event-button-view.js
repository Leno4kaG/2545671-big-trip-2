import AbstractView from '../framework/view/abstract-view.js';

function createButtonTemplate() {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

export default class NewEventButtonView extends AbstractView {
  #handleNewButtonClick = null;

  constructor({onNewButtonClick}) {
    super();
    this.#handleNewButtonClick = onNewButtonClick;

    this.element.addEventListener('click', this.#newButtonClickHandler);
  }

  get template() {
    return createButtonTemplate();
  }

  #newButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewButtonClick();
  };
}
