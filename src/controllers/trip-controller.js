import EmptyList from '../components/empty-list.js';
import Sort from '../components/sort.js';
import TripList from '../components/trip-list.js';
import Day from '../components/day.js';
import PointController from './point-controller.js';
import {render} from '../utils/render.js';

export default class TripController {
  constructor({tripData, container}) {
    this._tripData = tripData;
    this._container = container;
    this._tripList = null;
    this._sort = null;
    this._sortType = `event`;
    this._onDataChange = this._onDataChange.bind(this);
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

  _getPoints() {
    return this._tripData.reduce((pointsList, {events}) => {
      return pointsList.concat(events);
    }, []);
  }

  _getTripList() {
    if (!this._tripList) {
      this._tripList = new TripList();
    }
    return this._tripList;
  }

  _renderTripList(days) {
    days.forEach((dayData, i) => {
      const day = new Day(dayData, i);

      dayData.events.forEach((pointData) => {
        const point = new PointController({container: day, data: pointData, onDataChange: this._onDataChange});
        point.render();
      });

      render(this._getTripList().getElement(), day);
    });

    render(this._container, this._getSort(), `append`);
    render(this._container, this._getTripList(), `append`);
  }

  _sortByTime() {
    const pointsData = this._getPoints().sort((first, second) => {
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
    const pointsData = this._getPoints().sort((first, second) => {
      return second.price - first.price;
    });

    const tripData = [{
      day: null,
      events: pointsData
    }];

    this._renderTripList(tripData);
  }

  _sortByDefault() {
    this._renderTripList(this._tripData);
  }

  _onDataChange({point, newPoint}) {
    for (let day of this._tripData) {
      // eslinter ругается "Unexpected labeled statement         no-labels"
      // а мне нужно выйти из 2х циклов подряд
      let isBreaked = false;

      if (isBreaked) {
        break;
      }

      for (let oldPoint of day.events) {
        if (oldPoint.id === newPoint.id) {
          oldPoint = newPoint;
          isBreaked = true;
          break;
        }
      }
    }

    point.render(newPoint);
  }

  render() {
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
