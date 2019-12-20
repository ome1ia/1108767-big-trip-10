import AbstractComponent from './abstract-component.js';
import Event from './event.js';
import EventEdit from './event-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

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

  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
    this._date = day.date;
    this._events = day.events;
  }

  get _dayIndex() {
    return this._index + 1;
  }

  get _dayDate() {
    return formatDate(this._date);
  }

  get _dayDateTime() {
    return formatDateTime(this._date);
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

  renderTrips() {
    const eventsContainer = this.getElement().querySelector(`.trip-events__list`);

    for (let eventData of this._events) {
      const event = new Event(eventData);
      const eventEdit = new EventEdit(eventData);

      const eventStartEdit = event.getElement().querySelector(`.event__rollup-btn`);
      eventStartEdit.addEventListener(`click`, () => {
        replaceTrip(event, eventEdit);
      });

      const eventEditElement = eventEdit.getElement()
      eventEditElement.addEventListener(`submit`, () => {
        replaceTripForm(eventEdit, event);
      });

      render(eventsContainer, event);
    }
  }
}
