import { createElement } from '../render.js';

function createNewTripListTemplate() {
  return `
  <ul class="trip-events__list"></ul>
  `;
}

export default class NewTripListView {
  getTemplate() {
    return createNewTripListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
