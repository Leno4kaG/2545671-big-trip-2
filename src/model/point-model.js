import { getRandomPoints } from '../mock/points.js';
import { getOffers } from '../mock/offers.js';
import { getDestinations } from '../mock/destinations.js';

export default class PointModel {
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
}
