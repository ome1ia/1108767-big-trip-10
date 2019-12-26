import AbstractComponent from './abstract-component.js';

const Months = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

const formatDateTime = (date) => {
  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  return `${dateYear}-${dateMonth}-${dateDay}`;
};

const formatDate = (date) => {
  const dateDay = date.getDate();
  const dateMonth = Months[date.getMonth()];

  return `${dateMonth} ${dateDay}`;
};

export default class Day extends AbstractComponent {

  constructor(day, index = null) {
    super();
    this._day = day;
    this._index = index;
    this._date = day.date;
  }

  get _dayIndex() {
    return (this._date) ? this._index + 1 : ``;
  }



  get _dayDate() {
    return (this._date) ? formatDate(this._date) : ``;
  }

  get _dayDateTime() {
    return (this._date) ? formatDateTime(this._date) : ``;
  }

  getPointsContainer() {
    return this.getElement().querySelector(`.trip-events__list`);
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${this._dayIndex}</span>
                <time class="day__date" datetime="${this._dayDateTime}">${this._dayDate}</time>
              </div>

              <ul class="trip-events__list"></ul>
            </li>`;
  }
}
