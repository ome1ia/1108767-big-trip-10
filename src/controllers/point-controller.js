import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class PointController {
  constructor({container, data}) {
    this._container = container;
    this._data = data;
  }

  render() {
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
      
      this.onDataChange({point: this, newData: newData});
    });

    render(this._container.getPointsContainer(), point);
  }

  onDataChange() {

  }
}
