import AbstractSmartComponent from './abstract-smart-component.js';

export default class Sort extends AbstractSmartComponent {
  constructor(sortType) {
    super();
    this._sortType = sortType;
  }

  get _dayTitle() {
    return (this._sortType === `event`) ? `Day` : ``;
  }

  get _isSortByEvents() {
    return (this._sortType === `event`) ? `checked` : ``;
  }

  get _isSortByPrice() {
    return (this._sortType === `price`) ? `checked` : ``;
  }

  get _isSortByTime() {
    return (this._sortType === `time`) ? `checked` : ``;
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">${this._dayTitle}</span>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sort="event" ${this._isSortByEvents}>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort="time" ${this._isSortByTime}>
              <label class="trip-sort__btn" for="sort-time">
                Time
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
              </label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort="price"  ${this._isSortByPrice}>
              <label class="trip-sort__btn" for="sort-price">
                Price
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
              </label>
            </div>

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`;
  }

  setSortHandler(handler) {
    const inputs = this.getElement().querySelectorAll(`input[type="radio`);

    Array.from(inputs).forEach((input) => {
      input.addEventListener(`change`, handler);
    });
  }
}
