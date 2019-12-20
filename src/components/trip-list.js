import {createElement} from '../utils/create-element.js';
import {render} from '../utils/render.js';
import Day from './day.js';

export default class TripList {

  constructor(tripList) {
    this._element = null;
    this._tripList = tripList;
  }

  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  renderTrips() {
    for (let i = 0; i < this._tripList.length; i++) {
      const day = new Day(this._tripList[i], i);
      const dayElement = day.getElement();

      render(this._element, dayElement);
    }
  }
}
