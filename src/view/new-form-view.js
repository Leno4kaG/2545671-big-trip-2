import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { POINTS_TYPES, DATE_FORMAT, BLANK_POINT } from '../consts.js';
import { getOffersByType, getDestinationsById, capitalize } from '../utils/common.js';
import { humanizeDueDate } from '../utils/date.js';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createTypeItemTemplate(id, pointType, checkedType) {
  const isCheckedType = checkedType === pointType ? 'checked' : '';

  return `<div class="event__type-item">
      <input id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${isCheckedType}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${id}">${capitalize(pointType)}</label>
    </div>`;
}

function createOffersTemplate(offers, checkedOffersId) {
  const { id, title, price } = offers;
  const isCheckedOffers = Array.isArray(checkedOffersId) && checkedOffersId.includes(id) ? 'checked' : '';

  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-id="${id}" id="${id}" type="checkbox" name="${id}" ${isCheckedOffers}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}

function createOfferListTemplate(offers, checkedOffersId) {
  const offersContent = offers && offers.length > 0
    ? offers.map((offer) => createOffersTemplate(offer, checkedOffersId)).join('')
    : '';

  return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersContent}
        </div>
      </section>`;
}

function createPhotosTemplate(pictures) {
  return Array.isArray(pictures) && pictures.length > 0
    ? `<div class="event__photos-tape">
      ${pictures.map(({ src = '', description = '' }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
    </div>`
    : '';
}

function createDescriptionTemplate(description) {
  if (!description) {
    return '';
  }
  return description.length > 0 ? `<p class="event__destination-description">${description}</p>` : '';
}

function createNewFormTemplate(point, offers, destinations) {
  const { id, basePrice, dateFrom, dateTo, offers: checkedOffersId, destination, type } = point;
  const foundOffersByType = getOffersByType(offers, type) || { offers: [] };
  const foundDestinationById = getDestinationsById(destinations, destination) || {};
  const { name, pictures } = foundDestinationById;


  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${POINTS_TYPES.map((pointType) => createTypeItemTemplate(id, pointType, type)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name ? name : ''}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${destinations.map((city) => `<option value='${city.name}'></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${humanizeDueDate(dateFrom, DATE_FORMAT.DAY_MONTH_YEAR_TIME)}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${humanizeDueDate(dateTo, DATE_FORMAT.DAY_MONTH_YEAR_TIME)}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancle</button>

                </header>
                <section class="event__details">
                ${createOfferListTemplate(foundOffersByType.offers, checkedOffersId)}
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${createDescriptionTemplate(foundDestinationById.description)}
                <div class="event__photos-container">
                   ${createPhotosTemplate(pictures)}
                </div>
                </section>
                </section >
            </form >
          </li > `;
}

export default class NewFormView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];
  #handleFormSubmit = () => { };
  #handleDeleteButtonClick = () => { };

  #datepickerFrom = null;
  #datepickerTo = null;

  #configDatepicker = {
    enableTime: true,
    'time_24hr': true,
    dateFormat: DATE_FORMAT.DATE_PICKER
  };

  constructor({ offers, destinations, onFormSubmit, onDeleteClick }) {
    super();
    this._setState(NewFormView.parsePointToState(BLANK_POINT));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteButtonClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createNewFormTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(NewFormView.parsePointToState(point));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewFormView.parseStateToPoint(this._state));
  };

  #typesChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const foundDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      destination: foundDestination.id
    });
  };

  #offersChangeHandler = (evt) => {
    const offersId = evt.target.dataset.id;
    this._setState((state) => {
      const offers = Array.isArray(state.offers) ? state.offers : [];
      if (evt.target.checked) {
        return { offers: offers.includes(offersId) ? offers : [...offers, offersId] };
      } else {
        return { offers: offers.filter((item) => item !== offersId) };
      }
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };

  #buttonDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteButtonClick();
  };

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typesChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#buttonDeleteClickHandler);
    this.#setDatepickers();
  }

  #datepickerFromHandler = ([date]) => {
    this.updateElement({
      dateFrom: date
    });
  };

  #datepickerToHandler = ([date]) => {
    this.updateElement({
      dateTo: date
    });
  };

  #setDatepickers() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        ...this.#configDatepicker,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#datepickerFromHandler
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        ...this.#configDatepicker,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#datepickerToHandler
      }
    );
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
