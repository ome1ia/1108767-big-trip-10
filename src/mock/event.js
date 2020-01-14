import {getRandom} from '../utils/random.js';
import {offers as allOffers} from './offer.js';

const getPointType = () => {
  const PointTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

  return PointTypes[getRandom(PointTypes.length - 1)];
};

const getDestination = () => {
  const Cities = [`Amsterdam`, `Barselona`, `Madrid`, `Rome`];

  return Cities[getRandom(Cities.length - 1)];
};

const getDate = (date) => {
  let time = date.getTime();
  time += getRandom(10) * 24 * 60 * 60 * 1000;
  const timeDiff = getRandom(12 * 60 * 60 * 1000); // пусть разница будет в пределах 24 часов
  const dateFrom = new Date(time - timeDiff).toISOString();
  const dateTo = new Date(time + timeDiff).toISOString();

  return {
    dateFrom,
    dateTo
  };
};

const getPrice = () => {
  return getRandom(200);
};

const getOffers = (type) => {
  const availableOffers = allOffers.filter((offer) => {
    return offer.type === type;
  });

  const offersSize = getRandom(1);

  const pointOffers = [];

  for (let i = 0; i < offersSize; i++) {
    const offer = availableOffers[0].offers[getRandom(1)];
    pointOffers.push(offer);
  }

  return pointOffers;
};

const getEvent = (date) => {
  const {dateFrom, dateTo} = getDate(date);
  const destination = getDestination();
  const isFavorite = !!getRandom(1);
  const type = getPointType();
  const offers = getOffers(type);

  return {
    id: getRandom(1000),
    basePrice: getPrice(),
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  };
};

const getEventsList = () => {
  const eventList = [];
  const size = getRandom(20);
  const date = new Date();

  for (let i = 0; i < size; i++) {
    const event = getEvent(date);
    eventList.push(event);
  }

  eventList.sort((a, b) => {
    return a.startTime - b.startTime;
  });

  return eventList;
};

export {getEvent, getEventsList};
