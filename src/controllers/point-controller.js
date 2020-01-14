import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class PointController {
  constructor({container, data, offers, destinations, onDataChange, onViewChange}) {
    this._container = container;
    this._data = data;
    this._offers = offers;
    this._destinations = destinations;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._point = null;
    this._pointEdit = null;
  }

  _hideEditForm() {
    this._pointEdit.removeEscapeHandler();
    replaceTripForm(this._pointEdit, this._point);
  }

  render(data = this._data) {
    if (data !== this._data) {
      this._data = data;
    }

    const point = new Point(this._data);
    const pointEdit = new PointEdit({data: this._data, offers: this._offers, destinations: this._destinations});
    this._point = point;
    this._pointEdit = pointEdit;

    point.setEditHandler(() => {
      this._onViewChange();
      replaceTrip(point, pointEdit);
      pointEdit.setEscapeHandler((evt) => {
        if (evt.key === `Escape`) {
          this._hideEditForm();
        }
      });
    });

    pointEdit.setSubmitHandler((evt) => {
      evt.preventDefault();

      const newData = pointEdit.getNewData();
      this._onDataChange({point: this, newData});

      this._hideEditForm();
    });
    pointEdit.setAddToFavoriteHandler(() => {
      const newData = this._data;
      newData.isFavorite = !this._data.isFavorite;

      this._onDataChange({point: this, newPoint: newData});
    });
    pointEdit.setChangeTypeHandler();
    pointEdit.setChangeCityHandler();

    render(this._container.getPointsContainer(), point);
  }

  update(data) {
    this._data = data;

    this._pointEdit.rerender();
    this._point.updatePoint(this._data);
  }

  setDefaultView() {
    this._hideEditForm();
  }
}
