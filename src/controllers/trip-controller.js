import EmptyList from '../components/empty-list.js'
import Sort from '../components/sort.js'
import TripList from '../components/trip-list.js';
import Day from '../components/day.js';
import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class TripController {
  constructor({tripData, container}) {
    this._tripData = tripData;
    this._container = container;
    this._tripList = null;
    this._sort = null;
    this._sortType = `event`;
  }

  _getEvents() {
  	return this._tripData.reduce((eventsList, {date, events}) => {
      return eventsList.concat(events);
    }, []);
  }

  _getDataByTime() {
    const eventsSorted = this._getEvents().sort((first, second) => {
      const firstDuration = first.endTime - first.startTime;
      const secondDuration = second.endTime - second.startTime;
      return secondDuration - firstDuration;
    });

    return [{
      day: null,
      events: eventsSorted
    }];
  }

  _getDataByPrice() {
    const eventsSorted = this._getEvents().sort((first, second) => {
      return second.price - first.price;
    });

    return [{
      day: null,
      events: eventsSorted
    }];
  }

  _getSort() {
  	if(!this._sort) {
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

  _getTripList() {
    if (!this._tripList) {
      this._tripList = new TripList();
    }
    return this._tripList;
  }

  _renderTripList(renderData) {
  	renderData.forEach((dayData, i) => {
      const day = new Day(dayData, i);

      dayData.events.forEach((eventData) => {
        const point = new Point(eventData);
        const pointEdit = new PointEdit(eventData);
        const hideEditForm = () => {
          pointEdit.removeEscapeHandler();
          replaceTripForm(pointEdit, point);
        };

        point.setEditHandler(() => {
          replaceTrip(point, pointEdit);
          pointEdit.setEscapeHandler(hideEditForm);
        });

        pointEdit.setSubmitHandler(hideEditForm);

        render(day.getPointsContainer(), point);
      });

      render(this._getTripList().getElement(), day);
    });
    
    render(this._container, this._getSort(), `append`);
    render(this._container, this._getTripList(), `append`);
  }

  render() {
    if (!this._tripData.length) {
      const emptyList = new EmptyList();
      render(this._container, emptyList, `append`);
    } else {
      let renderData;

      switch (this._sortType) {
        case `time`:
        renderData = this._getDataByTime();
        break;

        case `price`:
        renderData = this._getDataByPrice();
        break;

        default:
        renderData = this._tripData;
        break;
      }

      this._renderTripList(renderData);	
    }
  }
}
