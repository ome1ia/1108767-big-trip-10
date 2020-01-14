import EmptyList from '../components/empty-list.js';
import Sort from '../components/sort.js';
import TripList from '../components/trip-list.js';
import Day from '../components/day.js';
import TotalSum from '../components/total-sum.js';
import TripTitle from '../components/trip-title.js';
import PointController from './point-controller.js';
import {render} from '../utils/render.js';

export default class TripController {
  constructor({tripData, offers, destinations, sumContainer, titleContainer, container}) {
    this._tripData = tripData;
    this._offers = offers;
    this._destinations = destinations;
    this._sumContainer = sumContainer;
    this._titleContainer = titleContainer;
    this._container = container;
    this._tripList = null;
    this._sort = null;
    this._sortType = `event`;
    this._totalSum = null;
    this._title = null;
    this._points = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _getSort() {
    if (!this._sort) {
      const sort = new Sort(this._sortType);

      sort.setSortHandler((evt) => {
        const input = evt.target;
        const value = input.getAttribute(`data-sort`);

        if (this._sortType !== value) {
          this._sortType = value;
          this._getSort().removeElement();
          this._getTripList().removeElement();
          this._sort = null;
          this._tripList = null;
          this.render();
        }
      });

      this._sort = sort;
    }

    return this._sort;
  }

  _getDays() {
    const days = [];
    const pointGroups = {};

    this._tripData.forEach((point) => {
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
    const points = [];

    days.forEach((dayData, i) => {
      const day = new Day(dayData, i);

      dayData.points.forEach((pointData) => {
        const point = new PointController({container: day, data: pointData, offers: this._offers, destinations: this._destinations, onDataChange: this._onDataChange, onViewChange: this._onViewChange});
        point.render();
        points.push(point);
      });

      render(this._getTripList().getElement(), day);
    });

    this._points = points;

    render(this._container, this._getSort(), `append`);
    render(this._container, this._getTripList(), `append`);
  }

  _sortByTime() {
    const pointsData = this._tripData().sort((first, second) => {
      const firstDuration = first.endTime - first.startTime;
      const secondDuration = second.endTime - second.startTime;
      return secondDuration - firstDuration;
    });

    const tripData = [{
      day: null,
      events: pointsData
    }];

    this._renderTripList(tripData);
  }

  _sortByPrice() {
    const pointsData = this._tripData().sort((first, second) => {
      return second.price - first.price;
    });

    const tripData = [{
      day: null,
      events: pointsData
    }];

    this._renderTripList(tripData);
  }

  _sortByDefault() {
    this._renderTripList(this._getDays());
  }

  _onDataChange({point, newData}) {
    for (let oldPoint of this._tripData) {
      if (oldPoint.id === newData.id) {
        const newPoint = Object.assign(oldPoint, newData);
        oldPoint = newPoint;
        point.update(newPoint);
        break;
      }
    }
  }

  _onViewChange() {
    for (let point of this._points) {
      point.setDefaultView();
    }
  }

  render() {
    if (this._totalSum === null) {
      this._totalSum = new TotalSum(this._tripData);

      while (this._sumContainer.firstChild) {
        this._sumContainer.removeChild(this._sumContainer.firstChild);
      }

      render(this._sumContainer, this._totalSum);
    }

    if (this._title === null) {
      const title = new TripTitle(this._getDays());
      render(this._titleContainer, title, `prepend`);
    }

    if (!this._tripData.length) {
      const emptyList = new EmptyList();
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
}
