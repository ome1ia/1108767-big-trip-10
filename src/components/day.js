import {createElement} from '../utils/create-element.js';
import {render} from '../utils/render.js';
import Event from './event.js';
import EventEdit from './event-edit.js';

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

export default class Day {

  constructor(day, index) {
    this._element = null;
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const eventsContainer = this._element.querySelector(`.trip-events__list`);

      for (let eventData of this._events) {
        const eventElement = new Event(eventData).getElement();
        const eventEditElement = new EventEdit(eventData).getElement();

        const eventStartEdit = eventElement.querySelector(`.event__rollup-btn`);
        eventStartEdit.addEventListener(`click`, () => {
          render(eventElement, eventEditElement, `replace`);
        });

        eventEditElement.addEventListener(`submit`, () => {
          render(eventEditElement, eventElement, `replace`);
        });

        render(eventsContainer, eventElement);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
