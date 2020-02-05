import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';

const Movements = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
const Places = new Set([`check-in`, `sightseeing`, `restaurant`]);

export default class Point extends AbstractSmartComponent {
  constructor({base_price: basePrice, date_from: dateFrom, date_to: dateTo, destination, offers, type}) {
    super();
    this._type = type;
    this._destination = destination;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._basePrice = basePrice;
    this._offers = offers;
    this._editHandler = null;
  }

  get _title() {
    let title;

    if (Movements.has(this._type)) {
      title = `${this._type[0].toUpperCase()}${this._type.slice(1)} to ${this._destination}`;
    } else if (Places.has(this._type)) {
      title = `${this._type[0].toUpperCase()}${this._type.slice(1)} in ${this._destination}`;
    } else {
      title = this._destination;
    }

    return title;
  }

  get _dateFromFormatted() {
    return moment(this._dateFrom).format(`HH:mm`);
  }

  get _dateToFormatted() {
    return moment(this._dateTo).format(`HH:mm`);
  }

  get _timeDiff() {
    const dateTo = moment(this._dateTo);
    const dateFrom = moment(this._dateFrom);
    const timeDiff = moment.duration(dateTo - dateFrom);
    let template;

    if (timeDiff.days()) {
      template = `${this._castTimeFormat(timeDiff.days())}D ${this._castTimeFormat(timeDiff.hours())}H ${this._castTimeFormat(timeDiff.minutes())}M`;
    } else if (timeDiff.hours()) {
      template = `${this._castTimeFormat(timeDiff.hours())}H ${this._castTimeFormat(timeDiff.minutes())}M`;
    } else {
      template = `${this._castTimeFormat(timeDiff.minutes())}M`;
    }

    return template;
  }

  get _offersParsed() {
    let template = ``;
    const offersSize = Math.min(this._offers.length, 3);

    if (offersSize) {
      for (let i = 0; i < offersSize; i++) {
        const offerTitle = this._offers[i].title;
        const offerPrice = this._offers[i].price;

        template += `<li class="event__offer">
                <span class="event__offer-title">${offerTitle}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
               </li>`;
      }

      template = `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${template}
            </ul>`;
    }

    return template;
  }

  get _price() {
    return this._basePrice;
  }

  updatePoint({base_price: basePrice, date_from: dateFrom, date_to: dateTo, destination, offers, type}) {
    this._type = type;
    this._destination = destination;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._basePrice = basePrice;
    this._offers = offers;

    this.rerender();
  }

  getTemplate() {
    return `<div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="${this._type}">
            </div>
            <h3 class="event__title">${this._title}</h3>

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${this._dateFrom}">${this._dateFromFormatted}</time>
                &mdash;
                <time class="event__end-time" datetime="${this._dateTo}">${this._dateToFormatted}</time>
              </p>
              <p class="event__duration">${this._timeDiff}</p>
            </div>

            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${this._price}</span>
            </p>

            ${this._offersParsed}

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>`;
  }

  setEditHandler(handler) {
    this._editHandler = handler;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setEditHandler(this._editHandler);
  }

  _castTimeFormat(value) {
    return value < 10 ? `0${value}` : String(value);
  }
}
