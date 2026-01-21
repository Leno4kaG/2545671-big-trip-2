import AbstractView from '../framework/view/abstract-view.js';


function createMessagesTemplate(message) {
  return (`
    <p class="trip-events__msg">${message}</p>
    `);
}

export default class MessagesView extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createMessagesTemplate(this.#message);
  }
}
