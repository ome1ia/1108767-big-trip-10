import AbstractComponent from './abstract-component.js';

export default class TripTitle extends AbstractComponent {
  constructor(tripList) {
    super();
    this._tripList = tripList;
  }

  get _tripTitle() {
    const cities = [];
    let title = ``;

    if (this._tripList.length) {
      for (let day of this._tripList) {
        for (let point of day.points) {
          if (!cities.length || (point.destination !== cities[cities.length - 1])) {
            cities.push(point.destination);
          }
        }
      }
    }

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
  }

  get _tripPeriod() {
    const days = [];
    let period = ``;

    if (this._tripList.length) {
      for (let day of this._tripList) {
        days.push(day.date);
      }
    }

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
  }

  getTemplate() {
    return `<div class="trip-info__main">
              <h1 class="trip-info__title">${this._tripTitle}</h1>

              <p class="trip-info__dates">${this._tripPeriod}</p>
            </div>`;
  }
}
