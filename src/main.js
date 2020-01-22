import Points from './models/points.js'
import Menu from './components/menu.js'
import Filters from './components/filters.js'
import TripController from './controllers/trip-controller.js'
import {getEventsList} from './mock/event.js'
import {offers} from './mock/offer.js'
import {getDestination} from './mock/destination.js'
import {render} from './utils/render.js'

const siteHeaderElement = document.querySelector(`.trip-main`);
const tripInfoElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);
const siteNavTitleElement = siteHeaderElement.querySelector(`.js-trip-main__nav-title`);
const siteFilterTitleElement = siteHeaderElement.querySelector(`.js-trip-main__filter-title`);
const tripEventsElement = document.querySelector(`.trip-events`);
const totalSumElement = siteHeaderElement.querySelector(`.trip-info__cost-value`);

const tripData = getEventsList();
const pointsModel = new Points(tripData);
const destinations = getDestination();

const menu = new Menu();
render(siteNavTitleElement, menu, `after`);

const filters = new Filters();
render(siteFilterTitleElement, filters, `after`)

const tripController = new TripController({ pointsModel, 
                                            offers, 
                                            destinations, 
                                            container: tripEventsElement, 
                                            sumContainer: totalSumElement,
                                            titleContainer: tripInfoElement
                                          });
tripController.render();
