import AbstractSmartComponent from './abstract-smart-component.js';

const Icons = {
  TRIP: `trip`,
  TRANSPORT: `transport`,
  TRAIN: `train`,
  TAXI: `taxi`,
  SIGHTSEEING: `sightseeing`,
  SHIP: `ship`,
  RESTAURANT: `restaurant`,
  FLIGHT: `flight`,
  DRIVE: `drive`,
  CHECK: `check-in`,
  BUS: `bus`
};

const parseTime = (time) => {
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const setOptions = (items) => {
  let template = ``;

  for (let item of items) {
    const offerTitle = item.title;
    const offerPrice = item.price;
    const isChecked = item.active ? `checked` : ``;

    template += `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked}>
                  <label class="event__offer-label" for="event-offer-luggage-1">
                    <span class="event__offer-title">${offerTitle}</span>
                    &plus;
                    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
                  </label>
                </div>`;
  }

  return template;
};

const setPhotoes = (items) => {
  let template = ``;

  for (let item of items) {
    template += `<img class="event__photo" src="${item}" alt="Event photo"> `;
  }

  return template;
};

export default class PointEdit extends AbstractSmartComponent {
  constructor({id, type, city, photoes, description, isFavorite, startTime, endTime, price, options}) {
    super();
    this._id = id;
    this._type = type;
    this._city = city;
    this._photoes = photoes;
    this._description = description;
    this._isFavorite = isFavorite;
    this._startTime = startTime;
    this._endTime = endTime;
    this._price = price;
    this._options = options;
    this._addToFavoriteHandler = null;
    this._submitHandler = null;
    this._escapeHandler = null;
  }

  get _icon() {
    return Icons[this._type.toUpperCase()];
  }

  get _startTimeFormatted() {
    return parseTime(this._startTime);
  }

  get _endTimeFormatted() {
    return parseTime(this._endTime);
  }

  get _optionsParsed() {
    return setOptions(this._options);
  }

  get _photoesParsed() {
    return setPhotoes(this._photoes);
  }

  get _isFavoriteState() {
    return (this._isFavorite) ? `checked` : ``;
  }

  getTemplate() {
    return `<form class="event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${this._id}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${this._icon}.png" alt="${this._type}">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._id}" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${this._id}">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-${this._id}">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-${this._id}">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-${this._id}">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-${this._id}">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-${this._id}">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-${this._id}">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${this._id}">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${this._id}">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${this._id}">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-${this._id}">
                  ${this._type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-${this._id}" type="text" name="event-destination" value="${this._city}" list="destination-list-${this._id}">
                <datalist id="destination-list-${this._id}">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-${this._id}">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-${this._id}" type="text" name="event-start-time" value="${this._startTimeFormatted}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-${this._id}">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-${this._id}" type="text" name="event-end-time" value="${this._endTimeFormatted}">
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

            <section class="event__details">

              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${this._optionsParsed}
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
            </section>
          </form>`;
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

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setAddToFavoriteHandler(this._AddToFavoriteHandler);
  }
}
