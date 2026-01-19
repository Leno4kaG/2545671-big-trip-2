import Observable from '../framework/observable.js';

import { UpdateType } from '../consts.js';

export default class PointModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];

  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = [...points];
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
    }
  }

  async updatePoint(updateType, updatedPoint) {
    try {
      const response = await this.#pointsApiService.updatePoint(updatedPoint);
      const newPoint = this.#adaptToClient(response);
      this.points = this.#points.map((point) => newPoint.id ? newPoint : point);
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, updatedPoint) {
    this.points = this.#points.push(updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  deletePoint(updateType, updatedPoint) {
    this.points = this.#points.filter((point) => point.id !== updatedPoint.id);
    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      'basePrice': point['base_price'],
      'dateFrom': point['date_from'],
      'dateTo': point['date_to'],
      'isFavorite': point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
