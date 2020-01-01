import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class PointController {
  constructor({container, data, onDataChange}) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
  }

  render(data = this._data) {
    if (data !== this._data) {
      this._data = data;
    }

    const point = new Point(this._data);
    const pointEdit = new PointEdit(this._data);
    const hideEditForm = () => {
      pointEdit.removeEscapeHandler();
      replaceTripForm(pointEdit, point);
    };

    point.setEditHandler(() => {
      replaceTrip(point, pointEdit);
      pointEdit.setEscapeHandler(hideEditForm);
    });

    pointEdit.setSubmitHandler(hideEditForm);
    pointEdit.setAddToFavoriteHandler(() => {
      const newData = this._data;
      newData.isFavorite = !this._data.isFavorite;

      this._onDataChange({point: this, newPoint: newData});
    });

    render(this._container.getPointsContainer(), point);
  }
}
