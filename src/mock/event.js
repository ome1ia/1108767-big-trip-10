import {getRandom} from '../utils/random.js';

const getEventType = () => {
  const eventTypes = [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
    `check`,
    `sightseeing`,
    `restaurant`];

  return eventTypes[getRandom(eventTypes.length - 1)];
};

const getCity = () => {
  const cities = [`Amsterdam`, `Barselona`, `Madrid`, `Rome`];

  return cities[getRandom(cities.length - 1)];
};

const getPhotoes = () => {
  const photoesSize = getRandom(6);
  let photoes = [];

  for (let i = 0; i < photoesSize; i++) {
    photoes.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }

  return photoes;
};

const getDescription = () => {
  const lipsum = `Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit. 
    Cras aliquet varius magna, non porta ligula feugiat eget. 
    Fusce tristique felis at fermentum pharetra. 
    Aliquam id orci ut lectus varius viverra. 
    Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
    Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
    Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, 
    eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis 
    suscipit in sed felis. Aliquam erat volutpat. 
    Nunc fermentum tortor ac porta dapibus. 
    In rutrum ac purus sit amet tempus.`.split(`. `);

  let descriptionSize = getRandom(1, 3);
  let description = ``;

  for (let i = 0; i < descriptionSize; i++) {
    description += lipsum[getRandom(lipsum.length - 1)];
  }

  return description;
};

const getDate = (date) => {
  let time = date.getTime();
  let day = new Date(time);
  let timeDiff = getRandom(12 * 60 * 60 * 1000); // пусть разница будет в пределах 24 часов
  let startTime = new Date(time - timeDiff);
  let endTime = new Date(time + timeDiff);

  return {
    day,
    startTime,
    endTime
  };
};

const getPrice = () => {
  return getRandom(200);
};

const getOptions = () => {
  const optonDescription = [
    `Order Uber`,
    `Add luggage`,
    `Switch to comfort`,
    `Rent a car`,
    `Add breakfast`,
    `Book tickets`,
    `Lunch in city`
  ];

  let optionsSize = getRandom(2);
  let options = [];

  for (let i = 0; i < optionsSize; i++) {
    options.push({
      type: `option`, // а какой тип может быть? В ТЗ написано "дополнительные опции — это структура данных с типом, названием и ценой."
      title: optonDescription[getRandom(optonDescription.length - 1)],
      price: getRandom(200)
    });
  }

  return options;
};

const getEvent = (date) => {
  let {day, startTime, endTime} = getDate(date);

  return {
    type: getEventType(),
    city: getCity(),
    photoes: getPhotoes(),
    description: getDescription(),
    day,
    startTime,
    endTime,
    price: getPrice(),
    options: getOptions()
  };
};

const getEventsList = (size, date) => {
  let eventList = [];

  for (let i = 0; i < size; i++) {
    let event = getEvent(date);
    eventList.push(event);
  }

  eventList.sort((a, b) => {
    return a.startTime - b.startTime;
  });

  return eventList;
};

export {getEvent, getEventsList};
