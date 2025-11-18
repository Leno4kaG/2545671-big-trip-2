import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';

import { render } from '../render.js';

export default class MainPresenter {
  sortComponent = new SortView();
  listComponent = new TripListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    render(new FormEditView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
