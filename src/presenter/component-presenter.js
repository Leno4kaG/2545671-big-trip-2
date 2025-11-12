import NewTripSortView from '../view/trip-sort-view.js';
import NewTripListView from '../view/trip-list-view.js';
import NewPointView from '../view/point-view.js';
import NewFormEditView from '../view/form-edit-view.js';

import { render } from '../render.js';

export default class ComponentPresenter {
  sortComponent = new NewTripSortView();
  listComponent = new NewTripListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    render(new NewFormEditView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewPointView(), this.listComponent.getElement());
    }
  }
}
