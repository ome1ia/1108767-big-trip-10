import {createMenuTemplate} from './components/menu.js'
import {createFiltersTemplate} from './components/filters.js'
import {createTripInfoTemplate} from './components/trip-info.js'
import {createTripSortTemplate} from './components/trip-sort.js'
import {createTripListTemplate} from './components/trip-list.js'
import {createTripDayTemplate} from './components/trip-day.js'
import {createEventTemplate} from './components/event.js'
import {createEventEditTemplate} from './components/event-edit.js'


const render = (container, template, place = `beforeEnd`, wrapper = false, wrapperAttributes = '') => {
  if(wrapper) {
    container.insertAdjacentHTML(place, `<${wrapper} ${wrapperAttributes}>${template}</{$wrapper}>`);
  } else {
    container.insertAdjacentHTML(place, template);
  }
};

const siteHeaderElement = document.querySelector(`.trip-main`);
const tripInfoElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteNavTitleElement = siteHeaderElement.querySelector(`.js-trip-main__nav-title`);
const siteFilterTitleElement = siteHeaderElement.querySelector(`.js-trip-main__filter-title`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripInfoElement, createTripInfoTemplate(), `afterBegin`);
render(siteNavTitleElement, createMenuTemplate(), `afterEnd`);
render(siteFilterTitleElement, createFiltersTemplate(), `afterEnd`);
render(tripEventsElement, createTripSortTemplate());
render(tripEventsElement, createTripListTemplate());

const tripListElement = tripEventsElement.querySelector(`.trip-days`);

render(tripListElement, createTripDayTemplate());

const tripDayEventsElement = tripEventsElement.querySelector(`.trip-events__list`);
const eventsCount = 3;

render(tripDayEventsElement, createEventEditTemplate(), `beforeEnd`, `li`, `class="trip-events__item"`);

for (let i = 0; i < eventsCount; i++) {
  render(tripDayEventsElement, createEventTemplate(), `beforeEnd`, `li`, `class="trip-events__item"`);
}
