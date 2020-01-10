import AbstractComponent from './abstract-component.js';

const Movements = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
const Places = new Set([`check-in`, `sightseeing`, `restaurant`]);

const parseTime = (time) => {
  const timeParsed = /T\d{2}:\d{2}/.exec(time.toString());
  return timeParsed[0].slice(1);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const parseTimeDiff = (diff) => {
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursDiff = diff - (days * 1000 * 60 * 60 * 24);
  let hours = Math.floor(hoursDiff / (1000 * 60 * 60));
  const minutesDiff = hoursDiff - (hours * 1000 * 60 * 60);
  let minutes = Math.floor(minutesDiff / (1000 * 60));

  if (days) {
    days = `${castTimeFormat(days)}D `;
  } else {
    days = ``;
  }

  hours = `${castTimeFormat(hours)}H `;
  minutes = `${castTimeFormat(minutes)}M`;

  return `${days}${hours}${minutes}`;
};

const setOffers = (offers) => {
  let template = ``;
  const offersSize = Math.min(offers.length, 3);

  if (offersSize) {
    for (let i = 0; i < offersSize; i++) {
      const offerTitle = offers[i].title;
      const offerPrice = offers[i].price;

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
};

export default class Point extends AbstractComponent {
  constructor({base_price: basePrice, date_from: dateFrom, date_to: dateTo, destination, offers, type}) {
    super();
    this._type = type;
    this._destination = destination;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._basePrice = basePrice;
    this._offers = offers;
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
    return parseTime(this._dateFrom);
  }

  get _dateToFormatted() {
    return parseTime(this._dateTo);
  }

  get _timeDiff() {
    return parseTimeDiff(new Date(this._dateTo) - new Date(this._dateFrom));
  }

  get _offersParsed() {
    return setOffers(this._offers);
  }

  get _price() {
    return this._basePrice;
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
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
