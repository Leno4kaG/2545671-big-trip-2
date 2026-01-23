import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { POINTS_TYPES, DATE_FORMAT } from '../consts.js';
import { humanizeDueDate } from '../utils/date.js';
import { capitalize, getOffersByType, getDestinationsById } from '../utils/common.js';

import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

function createTypeItemTemplate(id, pointType, checkedType) {
  const isCheckedType = checkedType === pointType ? 'checked' : '';

  return `<div class="event__type-item">
      <input id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${isCheckedType}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${id}">${capitalize(pointType)}</label>
    </div>`;
}

function createOffersTemplate(offers, checkedOffersId = []) {
  const { id, title, price } = offers;

  const isCheckedOffers = checkedOffersId.map(String).includes(String(id)) ? 'checked' : '';
  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" data-id="${id}" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage-${id}" ${isCheckedOffers}>
      <label class="event__offer-label" for="event-offer-luggage-${id}">
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}

function createOfferListTemplate(offers = [], checkedOffersId = []) {
  if (!Array.isArray(offers) || offers.length === 0) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => createOffersTemplate(offer, checkedOffersId)).join('')}
        </div>
      </section>`;
}

function createPhotosTemplate(pictures) {
  return pictures.length > 0 ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${he.encode(description)}">`).join('')}
      </div>
    </div>`
    : '';
}

function createSectionDestinationTemplate(destination) {
  if (!destination || (!destination.description && destination.pictures.length === 0)) {
    return '';
  }
  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${he.encode(destination.description)}</p>
      ${createPhotosTemplate(destination.pictures)}
    </section>`
  );
}

function createFormEditTemplate(point, offers, destinations) {

  const { id, basePrice, dateFrom, dateTo, offers: checkedOffersId, destination, type, isSaving, isDeleting } = point;

  const foundOffersByType = getOffersByType(offers, type);
  const offersForType = (foundOffersByType && Array.isArray(foundOffersByType.offers)) ? foundOffersByType.offers : [];

  const foundDestinationById = getDestinationsById(destinations, destination) || null;
  const name = foundDestinationById ? foundDestinationById.name : '';

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
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
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
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}  pattern="[0-9]+" required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOfferListTemplate(offersForType, checkedOffersId)}
                 ${createSectionDestinationTemplate(foundDestinationById)}
                </section>
            </form>
          </li> `;
}

export default class FormEditView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];

  #handleEditClick = () => { };
  #handleFormSubmit = () => { };
  #handleDeleteButtonClick = () => { };

  #datepickerFrom = null;
  #datepickerTo = null;

  #configDatepicker = {
    enableTime: true,
    'time_24hr': true,
    dateFormat: DATE_FORMAT.DATE_PICKER
  };

  constructor({ point, offers, destinations, onEditButtonClick, onFormSubmit, onButtonDeleteClick }) {
    super();

    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteButtonClick = onButtonDeleteClick;

    this._setState(FormEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#offers, this.#destinations);
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
    this.updateElement(FormEditView.parsePointToState(point));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #clickEditButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  _restoreHandlers() {

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickEditButtonHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typesChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#buttonDeleteClickHandler);
    this.#setDatepickers();
  }

  #typesChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      destination: newDestination.id
    });
  };

  #offersChangeHandler = (evt) => {
    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, evt.target.dataset.id]
      });
    }
  };

  #priceChangeHandler = (evt) => {
    if (evt.target.checkValidity()) {
      const value = evt.target.value;
      const numeric = value === '' ? '' : Number(value);
      this._setState({ basePrice: numeric });
    } else {
      evt.target.value = String(this._state.basePrice);
    }
  };

  #buttonDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteButtonClick(this._state);
  };

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
    return {
      ...point,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
