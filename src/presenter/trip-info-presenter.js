import TripInfoView from '../view/trip-info-view.js';

import { remove, replace, RenderPosition, render } from '../framework/render.js';

import { sortPoints, getDestinationsById } from '../utils/common.js';
import { DEFAULT_SORT, DATE_FORMAT, MAX_DESTINATIONS_TO_RENDER } from '../consts.js';

import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #headerContainer = null;
  #pointModel = null;

  #tripInfoComponent = null;

  #points = null;
  #offers = [];
  #destinations = [];

  constructor({ headerContainer, pointModel }) {
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEventChange);
  }

  init() {
    this.#points = this.#pointModel.points;
    this.#offers = this.#pointModel.offers;
    this.#destinations = this.#pointModel.destinations;


    if (this.#points.length === 0) {
      if (this.#tripInfoComponent !== null) {
        remove(this.#tripInfoComponent);
        this.#tripInfoComponent = null;
      }
      return;
    }

    const prevTripInfoComponent = this.#tripInfoComponent;
    const tripInfo = this.#createTripInfo();

    this.#tripInfoComponent = new TripInfoView(tripInfo);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #createTripInfo() {
    this.#points = sortPoints(DEFAULT_SORT, this.#pointModel.points);
    if (this.#points.length > 0) {
      return {
        title: this.#getInfoDestinations(this.#points),
        dates: this.#getInfoDates(this.#points),
        cost: this.#calculateCost(this.#points),
      };
    }
  }

  #getInfoDestinations(points) {
    const cities = points.map((point) => {
      const destination = getDestinationsById(this.#destinations, point.destination);
      return destination?.name;
    }).filter(Boolean);

    const condensed = [];
    for (let i = 0; i < cities.length; i++) {
      if (i === 0 || cities[i] !== cities[i - 1]) {
        condensed.push(cities[i]);
      }
    }
    if (condensed.length === 0) {
      return '';
    }
    if (condensed.length <= MAX_DESTINATIONS_TO_RENDER) {
      return condensed.join(' — ');
    }
    return `${condensed[0]} ... ${condensed[condensed.length - 1]}`;
  }

  #getInfoDates(points) {
    const firstDate = dayjs(points[0].dateFrom);
    const lastDate = dayjs(points[points.length - 1].dateTo);
    return `${firstDate.format(DATE_FORMAT.DAY_MONTH)} - ${lastDate.format(DATE_FORMAT.DAY_MONTH)}`;
  }

  #calculateCost(points) {
    this.#offers = this.#pointModel.offers;
    let totalCost = 0;

    for (const point of points) {
      const basePrice = Number(point.basePrice) || 0;

      const offerGroup = this.#offers.find((group) => group.type === point.type);
      const availableOffers = offerGroup?.offers ?? [];

      let offersCostForPoint = 0;
      for (const availableOffer of availableOffers) {
        if (point.offers.includes(availableOffer.id)) {
          offersCostForPoint += Number(availableOffer.price) || 0;
        }
      }

      totalCost += basePrice + offersCostForPoint;
    }

    return totalCost;
  }

  #handleModelEventChange = () => {
    this.init();
  };
}
