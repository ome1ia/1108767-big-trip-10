import {getRandom} from '../utils/random.js';
import {getEventsList} from './event.js';

const getDate = () => {
  let day;
  let time = new Date().getTime();
  let dateDiff = getRandom(10) * 24 * 60 * 60 * 1000;

  time += dateDiff;
  day = new Date(time);

  return day;
};

const getDay = () => {
  let size = getRandom(8, 2);
  let date = getDate();

  return {
    date,
    events: getEventsList(size, date)
  };
};

const getTripList = () => {
  let triplist = [];
  let size = getRandom(3, 1);

  for (let i = 0; i < size; i++) {
    let day = getDay();
    triplist.push(day);
  }

  triplist.sort((a, b) => {
    return a.date - b.date;
  });

  return triplist;
};

export {getDay, getTripList};
