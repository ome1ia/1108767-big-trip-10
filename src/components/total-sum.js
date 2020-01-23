import AbstractComponent from './abstract-component.js';

export default class getTotalSum extends AbstractComponent {

  constructor(pointsList) {
    super();
    this._pointsList = pointsList;
  }

  getTemplate() {
    return `<span>${this.getPrice()}</span>`;
  }

  getPrice() {
    const price = this._pointsList.reduce((sum, point) => {
      sum += (+point.base_price);

      sum += point.offers.reduce((pointSum, offer) => {
        pointSum += (+offer.price);
        return pointSum;
      }, 0);

      return sum;
    }, 0);

    return price;
  }
}
