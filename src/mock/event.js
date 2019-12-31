import {getRandom} from '../utils/random.js';

const getEventType = () => {
  const EventTypes = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check`,
    `Sightseeing`,
    `Restaurant`];

  return EventTypes[getRandom(EventTypes.length - 1)];
};

const getCity = () => {
  const Cities = [`Amsterdam`, `Barselona`, `Madrid`, `Rome`];

  return Cities[getRandom(Cities.length - 1)];
};

const getPhotoes = () => {
  const photoesSize = getRandom(6);
  const photoes = [];

  for (let i = 0; i < photoesSize; i++) {
    photoes.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }

  return photoes;
};

const getDescription = () => {
  const Lipsum = `Lorem ipsum dolor sit amet, 
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

  const descriptionSize = getRandom(1, 3);
  let description = ``;

  for (let i = 0; i < descriptionSize; i++) {
    description += Lipsum[getRandom(Lipsum.length - 1)];
  }

  return description;
};

const getDate = (date) => {
  const time = date.getTime();
  const day = new Date(time);
  const timeDiff = getRandom(12 * 60 * 60 * 1000); // пусть разница будет в пределах 24 часов
  const startTime = new Date(time - timeDiff);
  const endTime = new Date(time + timeDiff);

  return {
    day,
    startTime,
    endTime
  };
};

const getPrice = () => {
  return getRandom(200);
};

const getOptions = (optionType) => {
  const OptonDescription = [
    `Order Uber`,
    `Add luggage`,
    `Switch to comfort`,
    `Rent a car`,
    `Add breakfast`,
    `Book tickets`,
    `Lunch in city`
  ];

  const optionsSize = getRandom(2);
  const options = [];

  for (let i = 0; i < optionsSize; i++) {
    options.push({
      type: optionType,
      active: true,
      title: OptonDescription[getRandom(OptonDescription.length - 1)],
      price: getRandom(200)
    });
  }

  return options;
};

const getEvent = (date) => {
  const id = getRandom(1000);
  const {day, startTime, endTime} = getDate(date);
  const type = getEventType();
  const city = getCity();
  const title = `${type} ${city}`;
  const isFavorite = !!getRandom(1);

  return {
    id,
    type,
    city,
    photoes: getPhotoes(),
    title,
    description: getDescription(),
    isFavorite,
    day,
    startTime,
    endTime,
    price: getPrice(),
    options: getOptions(type)
  };
};

const getEventsList = (size, date) => {
  const eventList = [];

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
