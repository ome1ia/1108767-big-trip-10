import EmptyList from '../components/empty-list.js';
import Sort from '../components/sort.js';
import TripList from '../components/trip-list.js';
import Day from '../components/day.js';
import TotalSum from '../components/total-sum.js';
import TripTitle from '../components/trip-title.js';
import PointController from './point.js';
import {render} from '../utils/render.js';
import moment from 'moment';

export default class TripController {
  constructor({pointsModel, offers, destinations, sumContainer, titleContainer, container, addPoint}) {
    this._pointsModel = pointsModel;
    this._offers = offers;
    this._destinations = destinations;
    this._sumContainer = sumContainer;
    this._titleContainer = titleContainer;
    this._container = container;
    this._addPointElement = addPoint;
    this._newPoint = null;

    this._emptyList = null;
    this._tripList = null;
    this._sort = null;
    this._sortType = `event`;
    this._totalSum = null;
    this._title = null;
    this._points = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

    this._addPointElement.addEventListener(`click`, () => {
      const pointContainer = this._pointsModel.getPoints().length ? this._tripList.getElement() : this._emptyList.getElement();
      const point = new PointController({container: pointContainer, offers: this._offers, destinations: this._destinations, onDataChange: this._onDataChange, onViewChange: this._onViewChange, action: `addPoint`});
      this._newPoint = point;
      point.render();
    });
  }

  _getSort() {
    if (!this._sort) {
      const sort = new Sort(this._sortType);
      this._sort = sort;

      this._sort.setSortHandler((evt) => {
        const input = evt.target;
        const value = input.getAttribute(`data-sort`);

        if (this._sortType !== value) {
          this._sortType = value;
          this._sort.removeElement();
          this._getTripList().removeElement();
          this._sort = null;
          this._tripList = null;
          this.render();
        }
      });
    }

    return this._sort;
  }

  _getDays() {
    const days = [];
    const pointGroups = {};

    this._pointsModel.getPoints().forEach((point) => {
      const day = point.date_from.match(/[\d-]*/g)[0];

      pointGroups[day] = pointGroups[day] || [];
      pointGroups[day].push(point);
    });

    const daysSorted = Object.keys(pointGroups).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    for (let day of daysSorted) {
      days.push({
        date: new Date(day),
        points: pointGroups[day]
      });
    }

    return days;
  }

  _getTripList() {
    if (!this._tripList) {
      this._tripList = new TripList();
    }
    return this._tripList;
  }

  _renderTripList(days) {
    const points = new Set();

    days.forEach((dayData, i) => {
      const day = new Day(dayData, i);

      dayData.points.forEach((pointData) => {
        const point = new PointController({container: day, data: pointData, offers: this._offers, destinations: this._destinations, onDataChange: this._onDataChange, onViewChange: this._onViewChange});
        point.render();
        points.add(point);
      });

      render(this._getTripList().getElement(), day);
    });

    this._points = points;

    render(this._container, this._getSort(), `append`);
    render(this._container, this._getTripList(), `append`);
  }

  _sortByTime() {
    const points = this._pointsModel.getPoints().sort((first, second) => {
      const firstDuration = moment(first.date_to).diff(moment(first.date_from));
      const secondDuration = moment(second.date_to).diff(moment(second.date_from));
      return secondDuration - firstDuration;
    });

    const trip = [{
      day: null,
      points
    }];

    this._renderTripList(trip);
  }

  _sortByPrice() {
    const points = this._pointsModel.getPoints().sort((first, second) => {
      return second.base_price - first.base_price;
    });

    const trip = [{
      day: null,
      points
    }];

    this._renderTripList(trip);
  }

  _sortByDefault() {
    this._renderTripList(this._getDays());
  }

  _onDataChange({point, newData, oldData}) {

    if (!newData) {
      const updates = new Set([`updateDate`, `updateTitle`, `updateSum`]);
      this._pointsModel.removePoint(oldData.id);
      this._points.delete(point);
      this._update(updates);

    } else if (!oldData) {
      const updates = new Set([`updateDate`, `updateTitle`, `updateSum`]);
      this._pointsModel.addPoint(newData);
      this._points.add(point);
      this._update(updates);

    } else {
      const updates = new Set();

      if (moment(oldData.date_from).dayOfYear() !== moment(newData.date_from).dayOfYear()) {
        updates.add(`updateDate`);
        updates.add(`updateTitle`);
      }

      if ((parseFloat(newData.base_price) !== parseFloat(oldData.base_price)) || this._compareOffersSum(newData.offers, oldData.offers)) {
        updates.add(`updateSum`);
      }

      if (newData.destination !== oldData.destination) {
        updates.add(`updateTitle`);
      }

      const newPoint = this._pointsModel.updatePoint(newData.id, newData);
      point.update(newPoint);

      if (updates.size) {
        this._update(updates);
      }
    }
  }

  _onViewChange() {
    for (let point of this._points) {
      point.setDefaultView();
    }
    if (this._newPoint) {
      this._newPoint.remove();
      this._newPoint = null;
    }
  }

  _onFilterChange() {
    this._update();
  }

  _update(updates) {
    if (updates && updates.has(`updateSum`)) {
      this._totalSum.removeElement();
      this._totalSum = null;
    }

    if (updates && updates.has(`updateTitle`)) {
      this._title.removeElement();
      this._title = null;
    }

    if (this._sort) {
      this._sort.removeElement();
      this._sort = null;
    }

    if (this._tripList) {
      this._tripList.removeElement();
      this._tripList = null;
    }

    if (this._emptyList) {
      this._emptyList.removeElement();
      this._emptyList = null;
    }

    this.render();
  }

  render() {
    if (this._totalSum === null) {
      this._totalSum = new TotalSum(this._pointsModel.getPoints());

      while (this._sumContainer.firstChild) {
        this._sumContainer.removeChild(this._sumContainer.firstChild);
      }

      render(this._sumContainer, this._totalSum);
    }

    if (this._title === null) {
      this._title = new TripTitle(this._getDays());
      render(this._titleContainer, this._title, `prepend`);
    }

    if (!this._pointsModel.getPoints().length) {

      const emptyList = new EmptyList();
      this._emptyList = emptyList;
      render(this._container, emptyList, `append`);

    } else {

      switch (this._sortType) {
        case `time`:
          this._sortByTime();
          break;

        case `price`:
          this._sortByPrice();
          break;

        default:
          this._sortByDefault();
          break;
      }

    }
  }

  _compareOffersSum(newOffers = [], oldOffers) {
    const newSum = newOffers.reduce((sum, offer) => {
      sum += parseFloat(offer.price);
      return sum;
    }, 0);

    const oldSum = oldOffers.reduce((sum, offer) => {
      sum += parseFloat(offer.price);
      return sum;
    }, 0);

    return newSum !== oldSum;
  }
}
