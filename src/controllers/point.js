import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';
import moment from 'moment';

export default class PointController {
  constructor({container, data, offers, destinations, onDataChange, onViewChange, action = null}) {
    this._container = container;
    this._data = data;
    this._offers = offers;
    this._destinations = destinations;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._point = null;
    this._pointEdit = null;
    this._action = action;
  }

  _hideEditForm() {
    this._pointEdit.removeEscapeHandler();
    replaceTripForm(this._pointEdit, this._point);
  }

  _parseForm(formData) {
    const dateFrom = formData.get(`event-start-time`);
    const dateTo = formData.get(`event-end-time`);
    const parsedData = {id: this._data.id};
    parsedData[`type`] = formData.get(`event-type`);
    parsedData[`destination`] = formData.get(`event-destination`);
    parsedData[`is_favorite`] = (formData.get(`event-favorite`) === `on`) ? true : false;
    parsedData[`date_from`] = moment(dateFrom, `DD/MM/YYYY h:m`).toISOString();
    parsedData[`date_to`] = moment(dateTo, `DD/MM/YYYY h:m`).toISOString();
    parsedData[`base_price`] = formData.get(`event-price`);
    parsedData[`offers`] = [];

    for (let [name, value] of formData) {
      if (~name.indexOf(`event-offer`)) {
        parsedData.offers.push({title: value});
      }
    }

    if (parsedData.offers.length) {
      const availableOffers = this._offers.filter((offers) => {
        return offers.type === parsedData.type;
      })[0];

      for (let checkedOffer of parsedData.offers) {
        const price = availableOffers.offers.filter((offer) => {
          return offer.title === checkedOffer.title;
        })[0].price;

        checkedOffer.price = price;
      }
    }

    return parsedData;
  }

  render(data = this._data) {
    if (data !== this._data) {
      this._data = data;
    }

    const pointData = this._data ? this._data : {id: 1, type: `taxi`, destination: ``, is_favorite: false, date_from: moment().toISOString(), date_to: moment().toISOString(), base_price: 0, offers: []};

    const point = new Point(pointData);
    const pointEdit = new PointEdit({data: pointData, offers: this._offers, destinations: this._destinations});

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

      const newData = this._parseForm(pointEdit.getData());
      this._onDataChange({point: this, newData, oldData: this._data});
      this._hideEditForm();
    });
    pointEdit.setAddToFavoriteHandler(() => {
      const newData = this._data;
      newData[`is_favorite`] = !this._data.is_favorite;

      this._onDataChange({point: this, newData, oldData: this._data});
    });
    pointEdit.setRemoveHandler((evt) => {
      evt.preventDefault();

      this._onDataChange({point: this, newData: null, oldData: this._data});
    });
    pointEdit.setChangeTypeHandler();
    pointEdit.setChangeCityHandler();
    pointEdit.setFlatpickrDateFromHandler();
    pointEdit.setFlatpickrDateToHandler();

    if (this._action === `addPoint`) {
      render(this._container.getElement(), pointEdit, `before`);
    } else {
      render(this._container.getPointsContainer(), point);
    }
  }

  update(data) {
    this._data = data;
    this._point.updatePoint(this._data);
  }

  setDefaultView() {
    this._hideEditForm();
  }
}
