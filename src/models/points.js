import moment from 'moment';

export default class Points {
  constructor(points) {
    this._points = points;
    this._activeFilter = `everything`;

    this._filterChangeHandlers = [];
  }

  getPoints() {
    const now = moment();

    return this._points.filter((point) => {
      switch (this._activeFilter) {
        case `future`:
          return moment(point[`date_from`]).isAfter(now);
        case `past`:
          return moment(point[`date_to`]).isBefore(now);
        default:
          return true;
      }
    });
  }

  getPointsAll() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
  }

  addPoint(point) {
    this._points.push(point);
  }

  updatePoint(id, newData) {
    let updatedPoint;

    for (let point of this._points) {
      if (point.id === newData.id) {
        point = Object.assign(point, newData);
        updatedPoint = point;
        break;
      }
    }

    return updatedPoint;
  }

  removePoint(id) {
    this._points = this._points.filter((point) => {
      return point.id !== id;
    });
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
