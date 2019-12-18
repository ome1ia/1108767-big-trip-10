export const getTotalSum = (tripList) => {
  const price = tripList.reduce((sum, day) => {
    const dayTotalSum = day.events.reduce((daySum, event) => {
      daySum += event.price;
      return daySum;
    }, 0);

    sum += dayTotalSum;

    return sum;
  }, 0);

  return price;
};
