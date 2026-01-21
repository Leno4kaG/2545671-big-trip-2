import AbstractView from '../framework/view/abstract-view.js';

function createEmptyFilterTemplate(filterType) {
  return (`
    <p class="trip-events__msg">${filterType}</p>
    `);
}

export default class EmptyFilterMessagesView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyFilterTemplate(this.#filterType);
  }
}
