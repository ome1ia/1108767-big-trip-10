import {getRandom} from '../utils/random.js';

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

const getPhotoes = () => {
  const photoesSize = getRandom(6);
  const photoes = [];

  for (let i = 0; i < photoesSize; i++) {
    const photo = {
      description: getDescription()
    };

    photo.src = `http://picsum.photos/300/150?r=${Math.random()}`;

    photoes.push(photo);
  }

  return photoes;
};

const getDestination = () => {
  return [
    {
      description: getDescription(),
      name: `Amsterdam`,
      pictures: getPhotoes()
    },
    {
      description: getDescription(),
      name: `Barselona`,
      pictures: getPhotoes()
    },
    {
      description: getDescription(),
      name: `Madrid`,
      pictures: getPhotoes()
    },
    {
      description: getDescription(),
      name: `Rome`,
      pictures: getPhotoes()
    },
  ];
};

export {getDestination};
