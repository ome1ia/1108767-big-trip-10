import TripList from '../components/trip-list.js';
import Day from '../components/day.js';
import Event from '../components/event.js';
import EventEdit from '../components/event-edit.js';
import {render, replaceTripForm, replaceTrip} from '../utils/render.js';

export default class TripController {
  constructor({tripData, container}) {
    this._tripData = tripData;
    this._container = container;
  }

  render() {
    const tripList = new TripList();

    this._tripData.forEach((dayData, i) => {
      const day = new Day(dayData, i);

      dayData.events.forEach((eventData) => {
        const event = new Event(eventData);
        const eventEdit = new EventEdit(eventData);

        event.setEditHandler(() => {
          replaceTrip(event, eventEdit);
        });

        eventEdit.setSubmitHandler(() => {
          replaceTripForm(eventEdit, event);
        });

        render(day.getEventsContainer(), event);
      });

      render(tripList.getElement(), day);
    });

    render(this._container, tripList, `append`);
  }
}
