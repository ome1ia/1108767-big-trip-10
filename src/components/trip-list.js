import AbstractComponent from './abstract-component.js';
import Day from './day.js';
import {render} from '../utils/render.js';

export default class TripList extends AbstractComponent {

  constructor(tripList) {
    super();
    this._tripList = tripList;
  }

  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }

  renderTrips() {
    for (let i = 0; i < this._tripList.length; i++) {
      const day = new Day(this._tripList[i], i);
      const dayElement = day.getElement();
      day.renderTrips();

      render(this._element, dayElement);
    }
  }
}
