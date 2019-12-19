import {createElement} from '../utils/create-element.js';

const getTripTitle = (arr) => {
  let title;

  if (arr.length > 3) {
    title = `${arr[0]} — … — ${arr[arr.length - 1]}`;
  } else {
    title = arr.reduce((text, item) => {
      text += `${item} &mdash; `;
      return text;
    }, ``);

    title = title.slice(0, -9); // откусим ` &mdash; ` с конца
  }

  return title ? title : ``;
};

const getPeriod = (arr) => {
  const Months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

  const startDate = arr[0];
  const endDate = arr[arr.length - 1];
  const monthStart = Months[startDate.getMonth()];
  let monthEnd;
  const dayStart = startDate.getDate();
  let dayEnd;
  let period;

  if (startDate === endDate) {
    period = `${monthStart} ${dayStart}`;
  } else if (startDate.getMonth() === endDate.getMonth()) {
    dayEnd = endDate.getDate();
    period = `${monthStart} ${dayStart}&nbsp;&mdash;&nbsp;${dayEnd}`;
  } else {
    dayEnd = endDate.getDate();
    monthEnd = Months[endDate.getMonth()];
    period = `${monthStart} ${dayStart}&nbsp;&mdash;&nbsp;${monthEnd} ${dayEnd}`;
  }

  return period;
};

const getDays = (tripList) => {
  const days = [];

  for (let day of tripList) {
    days.push(day.date);
  }

  return days;
};

const getCities = (tripList) => {
  const cities = [];

  for (let day of tripList) {
    for (let event of day.events) {
      if (!cities.length || (event.city !== cities[cities.length - 1])) {
        cities.push(event.city);
      }
    }
  }

  return cities;
};

export default class TripInfo {
  constructor(tripList) {
    this._element = null;
    this._tripList = tripList;
  }

  get _tripTitle() {
    return getTripTitle(getCities(this._tripList));
  }
  get _tripPeriod() {
    return getPeriod(getDays(this._tripList));
  }

  getTemplate() {
    return `<div class="trip-info__main">
              <h1 class="trip-info__title">${this._tripTitle}</h1>

              <p class="trip-info__dates">${this._tripPeriod}</p>
            </div>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
