import { getRandomPoints } from '../mock/points.js';
import { getOffers } from '../mock/offers.js';
import { getDestinations } from '../mock/destinations.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = getRandomPoints();
  #offers = getOffers();

  #destinations = getDestinations();

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint(updateType, updatedPoint) {
    this.#points = this.#points.map((point) => updatedPoint.id ? updatedPoint : point);
    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, updatedPoint) {
    this.#points = this.#points.push(updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  deletePoint(updateType, updatedPoint) {
    this.#points = this.#points.filter((point) => point.id !== updatedPoint.id);
    this._notify(updateType);
  }
}
