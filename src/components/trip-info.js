import AbstractComponent from './abstract-component.js';

const getTripTitle = (cities) => {
  let title = ``;

  if (cities.length > 3) {
    title = `${cities[0]} — … — ${cities[cities.length - 1]}`;
  } else {
    title = cities.reduce((text, item) => {
      text += `${item} &mdash; `;
      return text;
    }, ``);

    title = title.slice(0, -9); // откусим ` &mdash; ` с конца
  }

  return title;
};

const getPeriod = (days) => {
  let period = ``;

  if (days.length) {
    const Months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

    const startDate = days[0];
    const endDate = days[days.length - 1];
    const monthStart = Months[startDate.getMonth()];
    let monthEnd;
    const dayStart = startDate.getDate();
    let dayEnd;

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
  }

  return period;
};

const getDays = (tripList) => {
  const days = [];

  if (tripList.length) {
    for (let day of tripList) {
      days.push(day.date);
    }
  }

  return days;
};

const getCities = (tripList) => {
  const cities = [];

  if (tripList.length) {
    for (let day of tripList) {
      for (let event of day.events) {
        if (!cities.length || (event.city !== cities[cities.length - 1])) {
          cities.push(event.city);
        }
      }
    }
  }

  return cities;
};

export default class TripInfo extends AbstractComponent {
  constructor(tripList) {
    super();
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
}
