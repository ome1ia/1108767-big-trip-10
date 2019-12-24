import AbstractComponent from './abstract-component.js';

export default class TripList extends AbstractComponent {

  constructor(tripList) {
    super();
    this._tripList = tripList;
  }

  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
