import {getEvent} from '../mock/event.js';

export const createEventTemplate = () => {
  let {type, description, startTime, endTime, price, options} = getEvent();

  const icons = {
    'trip': `trip`,
    'transport': `transport`,
    'train': `train`,
    'taxi': `taxi`,
    'sightseeing': `sightseeing`,
    'ship': `ship`,
    'restaurant': `restaurant`,
    'flight': `flight`,
    'drive': `drive`,
    'check': `check-in`,
    'bus': `bus`
  };

  let icon = icons[type.toLowerCase()];

  const parseTime = (time) => {
    return /\d{2}:\d{2}/.exec(time.toString());
  };

  const castTimeFormat = (value) => {
    return value < 10 ? `0${value}` : String(value);
  };

  const parseTimeDiff = (diff) => {
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hoursDiff = diff - (days * 1000 * 60 * 60 * 24);
    let hours = Math.floor(hoursDiff / (1000 * 60 * 60));
    let minutesDiff = hoursDiff - (hours * 1000 * 60 * 60);
    let minutes = Math.floor(minutesDiff / (1000 * 60));

    if (days) {
      days = `${castTimeFormat(days)}D `;
    } else {
      days = ``;
    }

    hours = `${castTimeFormat(hours)}H `;
    minutes = `${castTimeFormat(minutes)}M`;

    return `${days}${hours}${minutes}`;
  };

  console.log(startTime);
  console.log(endTime);

  let startTimeFormatted = parseTime(startTime);
  let endTimeFormatted = parseTime(endTime);
  let timeDiff = parseTimeDiff(endTime - startTime);

  const setOptions = (items) => {
    let template = ``;

    for (let i = 0; i < items.length; i++) {
      let offerTitle = items[i].title;
      let offerPrice = items[i].price;

      template += `<li class="event__offer">
                <span class="event__offer-title">${offerTitle}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
               </li>`;
    }

    if (items.length) {
      template = `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${template}
            </ul>`;
    }

    return template;
  };

  let optionsParsed = setOptions(options);

  return `<div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="${type}">
            </div>
            <h3 class="event__title">${description}</h3>

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${startTime}">${startTimeFormatted}</time>
                &mdash;
                <time class="event__end-time" datetime="${endTime}">${endTimeFormatted}</time>
              </p>
              <p class="event__duration">${timeDiff}</p>
            </div>

            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${price}</span>
            </p>

            ${optionsParsed}

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>`;
};
