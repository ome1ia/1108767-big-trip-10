import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class PointController {
  constructor({container, data, offers, destinations, onDataChange}) {
    this._container = container;
    this._data = data;
    this._offers = offers;
    this._destinations = destinations;
    this._onDataChange = onDataChange;
  }

  render(data = this._data) {
    if (data !== this._data) {
      this._data = data;
    }

    const point = new Point(this._data);
    const pointEdit = new PointEdit({data: this._data, offers: this._offers, destinations: this._destinations});
    const hideEditForm = () => {
      pointEdit.removeEscapeHandler();
      replaceTripForm(pointEdit, point);
    };

    point.setEditHandler(() => {
      replaceTrip(point, pointEdit);
      pointEdit.setEscapeHandler((evt) => {
        if (evt.key === `Escape`) {
          hideEditForm();
        }
      });
    });

    pointEdit.setSubmitHandler(hideEditForm);
    pointEdit.setAddToFavoriteHandler(() => {
      const newData = this._data;
      newData.isFavorite = !this._data.isFavorite;

      this._onDataChange({point: this, newPoint: newData});
    });
    pointEdit.setChangeTypeHandler();

    render(this._container.getPointsContainer(), point);
  }
}
