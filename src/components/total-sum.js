export const getTotalSum = (tripList) => {
  let price = tripList.reduce((sum, day) => {
    let dayTotalSum = day.events.reduce((daySum, event) => {
      daySum += event.price;
      return daySum;
    }, 0);

    sum += dayTotalSum;

    return sum;
  }, 0);

  return price;
};
