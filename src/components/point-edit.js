import AbstractSmartComponent from './abstract-smart-component.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';
import {createElement} from '../utils/create-element.js';

const Movements = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
const Places = new Set([`check-in`, `sightseeing`, `restaurant`]);

export default class PointEdit extends AbstractSmartComponent {
  constructor({data, offers, destinations, action}) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._destination = data.destination;
    this._isFavorite = data.is_favorite;
    this._dateFrom = data.date_from;
    this._dateTo = data.date_to;
    this._basePrice = data.base_price;
    this._activeOffers = data.offers;
    this._offers = offers;
    this._destinations = destinations;
    this._action = action;
    this._flatpickr = null;
    this._addToFavoriteHandler = null;
    this._submitHandler = null;
    this._escapeHandler = null;
    this._removeHandler = null;
  }

  get _title() {
    let title;

    if (Movements.has(this._type)) {
      title = `${this._type[0].toUpperCase()}${this._type.slice(1)} to`;
    } else if (Places.has(this._type)) {
      title = `${this._type[0].toUpperCase()}${this._type.slice(1)} in`;
    } else {
      title = ``;
    }

    return title;
  }

  get _icon() {
    return this._type ? this._type : this._offers[0].type;
  }

  get _addPointClass() {
    return this._action === `addPoint` ? `trip-events__item` : ``;
  }

  get _dateFromFormatted() {
    return this._parseTime(this._dateFrom);
  }

  get _dateToFormatted() {
    return this._parseTime(this._dateTo);
  }

  get _cities() {
    const cities = new Set();

    for (let city of this._destinations) {
      cities.add(city.name);
    }

    return cities;
  }

  get _citiesAvailable() {
    let template = ``;

    for (let city of this._destinations) {
      template += `<option value="${city.name}"></option>`;
    }

    return template;
  }

  get _description() {
    if (this._destination) {
      const description = this._destinations.filter((destination) => {
        return destination.name === this._destination;
      })[0].description;

      return description;
    } else {
      return ``;
    }
  }

  get _offersParsed() {
    let template = ``;

    if (this._type) {
      const availableOffers = this._offers.filter((offer) => {
        return offer.type === this._type;
      })[0].offers;

      const checkedOffers = new Set();

      this._activeOffers.forEach((offer) => {
        checkedOffers.add(offer.title);
      });

      for (let i = 0; i < availableOffers.length; i++) {
        const offerTitle = availableOffers[i].title;
        const offerPrice = availableOffers[i].price;
        const isChecked = checkedOffers.has(offerTitle) ? `checked` : ``;

        template += `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="event-offer-${i}" value="${offerTitle}" ${isChecked}>
                      <label class="event__offer-label" for="event-offer-${i}">
                        <span class="event__offer-title">${offerTitle}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
                      </label>
                    </div>`;
      }
    }

    return template;
  }

  get _photoesParsed() {
    if (this._destination) {
      const photoes = this._destinations.filter((destination) => {
        return destination.name.toLowerCase() === this._destination.toLowerCase();
      })[0].pictures;

      let template = ``;

      for (let photo of photoes) {
        template += `<img class="event__photo" src="${photo.src}" alt="${photo.description}"> `;
      }

      return template;
    } else {
      return ``;
    }
  }

  get _isFavoriteState() {
    return (this._isFavorite) ? `checked` : ``;
  }

  get _price() {
    return this._basePrice;
  }

  get _typeList() {
    let template = `<fieldset class="event__type-group">
                      <legend class="visually-hidden">Transfer</legend>`;

    for (let type of Movements) {
      template += this._setType(type);
    }

    template += `</fieldset>

                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Activity</legend>`;

    for (let type of Places) {
      template += this._setType(type);
    }

    template += `</fieldset>`;

    return template;
  }

  get _eventDetails() {
    if (this._type && this._destination) {
      return `<section class="event__details">

              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${this._offersParsed}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${this._description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${this._photoesParsed}
                  </div>
                </div>
              </section>
            </section>`;
    } else {
      return ``;
    }
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  getTemplate() {
    return `<form class="${this._addPointClass} event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${this._id}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${this._icon}.png" alt="${this._icon}">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._id}" type="checkbox">

                <div class="event__type-list">
                  ${this._typeList}
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-${this._id}">
                  ${this._title}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-${this._id}" type="text" name="event-destination" value="${this._destination}" list="destination-list-${this._id}">
                <datalist id="destination-list-${this._id}">
                  ${this._citiesAvailable}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-${this._id}">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-${this._id}" type="text" name="event-start-time" value="${this._dateFromFormatted}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-${this._id}">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-${this._id}" type="text" name="event-end-time" value="${this._dateToFormatted}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-${this._id}">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-${this._id}" type="text" name="event-price" value="${this._price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>

              <input id="event-favorite-${this._id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavoriteState}>
              <label class="event__favorite-btn" for="event-favorite-${this._id}">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>

            ${this._eventDetails}
          </form>`;
  }

  rerender(data) {
    this._removeFlatpickr();

    if (data) {
      this._type = data.type;
      this._destination = data.destination;
      this._isFavorite = data.is_favorite;
      this._dateFrom = data.date_from;
      this._dateTo = data.date_to;
      this._basePrice = data.base_price;
      this._activeOffers = data.offers;
    }

    super.rerender();
  }

  removeElement() {
    document.removeEventListener(`keydown`, this._escapeHandler);
    super.removeElement();
  }

  _rerenderDate(input, template) {
    const newInput = createElement(template);
    input.replaceWith(newInput);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setAddToFavoriteHandler(this._addToFavoriteHandler);
    this.setChangeTypeHandler();
    this.setChangeCityHandler();
    this.setFlatpickrDateFromHandler();
    this.setFlatpickrDateToHandler();
  }

  setRemoveHandler(handler) {
    this.removeHandler = handler;
    this.getElement().querySelectorAll(`.event__reset-btn`)[0].addEventListener(`click`, handler);
  }

  setAddToFavoriteHandler(handler) {
    this._addToFavoriteHandler = handler;
    this.getElement().elements[`event-favorite`].addEventListener(`change`, handler);
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().addEventListener(`submit`, handler);
  }

  setEscapeHandler(handler) {
    this._escapeHandler = handler;
    document.addEventListener(`keydown`, this._escapeHandler);
  }

  removeEscapeHandler() {
    document.removeEventListener(`keydown`, this._escapeHandler);
    this._escapeHandler = null;
  }

  setChangeTypeHandler() {
    [...this.getElement().elements[`event-type`]].forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        this._type = evt.target.getAttribute(`value`);
        this.rerender();
      });
    });
  }

  setChangeCityHandler() {
    this.getElement().elements[`event-destination`].addEventListener(`input`, (evt) => {
      const newCity = evt.target.value;

      if (this._cities.has(newCity)) {
        this._destination = newCity;
        this.rerender();
      }
      // TODO подумать над обработкой ошибок
    });
  }

  setFlatpickrDateFromHandler() {
    this.getElement().elements[`event-start-time`].addEventListener(`focus`, () => {
      const input = this.getElement().elements[`event-start-time`];
      this._applyFlatpickr({
        element: input,
        date: this._dateFrom,
        closeHandler: (dates, date) => {
          const newDate = moment(date, `DD/MM/YYYY h:m`).toISOString();
          this._dateFrom = newDate;
          const updatedTemplate = `<input class="event__input  event__input--time" id="event-start-time-${this._id}" type="text" name="event-start-time" value="${this._dateFromFormatted}">`;
          this._flatpickr.set(`defaultDate`, newDate);
          this._rerenderDate(input, updatedTemplate);
          this.setFlatpickrDateFromHandler();
        },
      });
    });
  }

  setFlatpickrDateToHandler() {
    this.getElement().elements[`event-end-time`].addEventListener(`focus`, () => {
      const input = this.getElement().elements[`event-end-time`];
      this._applyFlatpickr({
        element: input,
        date: this._dateTo,
        closeHandler: (dates, date) => {
          const newDate = moment(date, `DD/MM/YYYY h:m`).toISOString();
          this._dateTo = newDate;
          const updatedTemplate = `<input class="event__input  event__input--time" id="event-end-time-${this._id}" type="text" name="event-end-time" value="${this._dateToFormatted}">`;
          this._flatpickr.set(`defaultDate`, newDate);
          this._rerenderDate(input, updatedTemplate);
          this.setFlatpickrDateToHandler();
        },
        startDate: this._dateFrom,
      });
    });
  }

  _applyFlatpickr({element, date, closeHandler, changeHandler, startDate = null}) {
    this._removeFlatpickr();

    this._flatpickr = flatpickr(element, {
      defaultDate: date,
      enableTime: true,
      dateFormat: `d/m/Y H:i`,
      onClose: closeHandler,
      onChange: changeHandler
    });

    if (startDate) {
      this._flatpickr.set(`minDate`, startDate);
    }

    this._flatpickr.open();
  }

  _removeFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
  }

  _parseTime(time) {
    return moment(time).format(`DD/MM/YYYY HH:mm`);
  }

  _setType(type) {
    const title = type[0].toUpperCase() + type.slice(1);
    const isChecked = (type === this._type) ? `checked` : ``;

    return `<div class="event__type-item">
              <input id="event-type-${type}-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${this._id}">${title}</label>
            </div>`;
  }
}
