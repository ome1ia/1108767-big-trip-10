export const getRandom = (max, min = 0) => {

  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);

};
