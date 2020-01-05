import AbstractComponent from './abstract-component.js';
import {render} from '../utils/render.js';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender({id, type, city, photoes, description, isFavorite, startTime, endTime, price, options}) {
    const oldElement = this.getElement();
    this._element = null;
    const newElement = this.getElement();

    oldElement.replaceWith(newElement);
    this.recoveryListeners();
  }
}
