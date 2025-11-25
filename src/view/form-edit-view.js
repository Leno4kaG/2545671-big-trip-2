import { createElement } from '../render.js';
import { POINTS_TYPES, DATE_FORMAT, CITIES } from '../consts.js';
import { humanizeDueDate, transformString } from '../utils.js';

function createTypeItemTemplate(id, pointType, checkedType) {
  const isCheckedType = checkedType === pointType ? 'checked' : '';

  return `<div class="event__type-item">
      <input id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${isCheckedType}>
      <label class="event__type-label  event__type-label--${pointType}}" for="event-type-${pointType}-${id}">${transformString(pointType)}</label>
    </div>`;
}

function createOffersTemplate(offers, checkedOffersId) {
  const { id, title, price } = offers;

  const isCheckedOffers = checkedOffersId.includes(id) ? 'checked' : '';

  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id} ${isCheckedOffers}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}

function createOfferListTemplate(offers, checkedOffersId) {
  return offers.length > 0 ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => createOffersTemplate(offer, checkedOffersId)).join('')}
        </div>
      </section>`
    : '';
}

function createPhotosTemplate(pictures) {
  return pictures.length > 0 ?
    `<div class="event__photos-tape">
      ${pictures.map(({ src, description }) => `<img class="event__photo" src=${src} alt=${description}`)}>
    </div>`
    : '';
}

function createDescriptionTemplate(description) {
  return description.length > 0 ? `<p class="event__destination-description">${description}</p>` : '';
}

function createFormEditTemplate(point, offers, destination) {

  const { id, basePrice, dateFrom, dateTo, offers: checkedOffersId, type } = point;
  const { name, description, pictures } = destination;

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
                      ${CITIES.map((city) => `<option value='${city}'></option>`).join('')}
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
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOfferListTemplate(offers.offers, checkedOffersId)}
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${createDescriptionTemplate(description)}
                <div class="event__photos-container">
                   ${createPhotosTemplate(pictures)}
                </div>
                </section>
                </section >
            </form >
          </li > `;
}

export default class FormEditView {
  constructor({ point, offers, destination }) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createFormEditTemplate(this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
