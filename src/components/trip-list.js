import {createDayTemplate} from './day.js';

export const createTripListTemplate = (tripList) => {
  let tripListRender = ``;

  for (let i = 0; i < tripList.length; i++) {
    let day = createDayTemplate(tripList[i], i);
    tripListRender += day;
  }

  return `<ul class="trip-days">${tripListRender}</ul>`;
};
