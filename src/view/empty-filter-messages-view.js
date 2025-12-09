import AbstractView from '../framework/view/abstract-view.js';
import { EmptyFilterMessages } from '../consts.js';

function createEmptyFilterTemplate(filterType) {
  return (`
    <p class="trip-events__msg">${EmptyFilterMessages[filterType]}</p>
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
