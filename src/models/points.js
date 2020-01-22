export default class Points {
  constructor(points) {
    this._points = points;
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
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
}
