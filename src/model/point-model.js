import { POINT_COUNT } from '../consts.js';
import { getRandomPoints } from '../mock/points.js';
import { getOffers } from '../mock/offers.js';
import { getDestinations } from '../mock/destinations.js';

export default class PointModel {
  #points = Array.from({ length: POINT_COUNT }, getRandomPoints);
  #offers = getOffers();

  #destinations = getDestinations();

  get points() {
    return this.#points;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getDestinationsById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
