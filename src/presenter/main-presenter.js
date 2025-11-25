import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';

import { render } from '../render.js';

export default class MainPresenter {
  sortComponent = new SortView();
  listComponent = new TripListView();

  constructor({ container, pointModel }) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.mainPoints = [...this.pointModel.getPoints()];
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    render(new FormEditView({
      point: this.mainPoints[0],
      offers: this.pointModel.getOffersByType(this.mainPoints[0].type),
      destination: this.pointModel.getDestinationsById(this.mainPoints[0].destination)
    }), this.listComponent.getElement());

    for (let i = 1; i < this.mainPoints.length; i++) {
      render(new PointView({
        point: this.mainPoints[i],
        offers: this.pointModel.getOffersByType(this.mainPoints[i].type),
        destination: this.pointModel.getDestinationsById(this.mainPoints[i].destination)
      }), this.listComponent.getElement());
    }
  }
}
