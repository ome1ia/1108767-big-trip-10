import {createMenuTemplate} from './components/menu.js'
import {createFiltersTemplate} from './components/filters.js'
import {createTripInfoTemplate} from './components/trip-info.js'
import {createTripSortTemplate} from './components/trip-sort.js'
import {createTripListTemplate} from './components/trip-list.js'
import {createDayTemplate} from './components/day.js'
import {createEventTemplate} from './components/event.js'
import {createEventEditTemplate} from './components/event-edit.js'
import {getTotalSum} from './components/total-sum.js'
import {getTripList} from './mock/day.js'

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
const totalSumElement = siteHeaderElement.querySelector(`.trip-info__cost-value`);

const tripData = getTripList();

render(tripInfoElement, createTripInfoTemplate(tripData), `afterBegin`);
render(siteNavTitleElement, createMenuTemplate(), `afterEnd`);
render(siteFilterTitleElement, createFiltersTemplate(), `afterEnd`);
render(tripEventsElement, createTripSortTemplate());
render(tripEventsElement, createTripListTemplate(tripData));
totalSumElement.innerHTML = getTotalSum(tripData);

const firstDay = tripEventsElement.querySelector(`.trip-events__list`);
render(firstDay, createEventEditTemplate(), `afterBegin`);
