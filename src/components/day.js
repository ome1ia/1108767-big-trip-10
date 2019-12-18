import {createEventTemplate} from './event.js';

export const createDayTemplate = (day, index) => {
  const Months = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

  const formatDateTime = (date) => {
    const dateDay = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  const formatDate = (date) => {
    const dateDay = date.getDate();
    const dateMonth = Months[date.getMonth()];

    return `${dateMonth} ${dateDay}`;
  };

  const {date, events} = day;

  const dayIndex = index + 1;

  const dayDate = formatDate(date);
  const dayDateTime = formatDateTime(date);

  let eventsRender = ``;

  for (let i = 0; i < events.length; i++) {
    // events отсортированы в mock/events.js. Можно перенести сортировку сюда
    const event = createEventTemplate(events[i]);
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
