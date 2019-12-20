import {getRandom} from '../utils/random.js';
import {getEventsList} from './event.js';

const getDate = () => {
  let day;
  let time = new Date().getTime();
  const dateDiff = getRandom(10) * 24 * 60 * 60 * 1000;

  time += dateDiff;
  day = new Date(time);

  return day;
};

const getDay = () => {
  const size = getRandom(8, 2);
  const date = getDate();

  return {
    date,
    events: getEventsList(size, date)
  };
};

const getTripList = () => {
  const triplist = [];
  const size = getRandom(3, 1);

  for (let i = 0; i < size; i++) {
    const day = getDay();
    triplist.push(day);
  }

  triplist.sort((a, b) => {
    return a.date - b.date;
  });

  return triplist;
};

export {getDay, getTripList};
