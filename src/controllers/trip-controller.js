import EmptyList from '../components/empty-list.js'
import TripSort from '../components/trip-sort.js'
import TripList from '../components/trip-list.js';
import Day from '../components/day.js';
import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class TripController {
  constructor({tripData, container}) {
    this._tripData = tripData;
    this._container = container;
  }

  render() {
    if(this._tripData.length) {
      const tripSort = new TripSort();
      const tripList = new TripList();

      this._tripData.forEach((dayData, i) => {
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

        render(tripList.getElement(), day);
      });
    
      render(this._container, tripSort, `append`);
      render(this._container, tripList, `append`);    	
    } else {
      const emptyList = new EmptyList();
      render(this._container, emptyList, `append`);
    }
  }
}
