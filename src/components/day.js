import {createEventTemplate} from './event.js';

export const createDayTemplate = (day, index) => {
  const Months = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

  const formatDateTime = (date) => {
    let dateDay = date.getDate();
    let dateMonth = date.getMonth();
    let dateYear = date.getFullYear();

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  const formatDate = (date) => {
    let dateDay = date.getDate();
    let dateMonth = Months[date.getMonth()];

    return `${dateMonth} ${dateDay}`;
  };

  let {date, events} = day;

  let dayIndex = index + 1;

  let dayDate = formatDate(date);
  let dayDateTime = formatDateTime(date);

  let eventsRender = ``;

  for (let i = 0; i < events.length; i++) {
    // events отсортированы в mock/events.js. Можно перенести сортировку сюда
    let event = createEventTemplate(events[i]);
    eventsRender += event;
  }

  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayIndex}</span>
                <time class="day__date" datetime="${dayDateTime}">${dayDate}</time>
              </div>

              <ul class="trip-events__list">
              ${eventsRender}
              </ul>
            </li>`;
};
