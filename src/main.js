import Menu from './components/menu.js'
import Filters from './components/filters.js'
import TripInfo from './components/trip-info.js'
import TripSort from './components/trip-sort.js'
import TripList from './components/trip-list.js'
import {getTotalSum} from './components/total-sum.js'
import {getTripList} from './mock/day.js'
import {render} from './utils/render.js'

const siteHeaderElement = document.querySelector(`.trip-main`);
const tripInfoElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteNavTitleElement = siteHeaderElement.querySelector(`.js-trip-main__nav-title`);
const siteFilterTitleElement = siteHeaderElement.querySelector(`.js-trip-main__filter-title`);
const tripEventsElement = document.querySelector(`.trip-events`);
const totalSumElement = siteHeaderElement.querySelector(`.trip-info__cost-value`);

const tripData = getTripList();

const info = new TripInfo(tripData);
render(tripInfoElement, info, `prepend`);

const menu = new Menu();
render(siteNavTitleElement, menu, `after`);

const filters = new Filters();
render(siteFilterTitleElement, filters, `after`)

const tripSort = new TripSort();
render(tripEventsElement, tripSort, `append`);

const tripList = new TripList(tripData);
tripList.renderTrips();
render(tripEventsElement, tripList, `append`);

totalSumElement.innerHTML = getTotalSum(tripData);
