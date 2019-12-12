export const createTripInfoTemplate = (tripList) => {
  const getTripTitle = (arr) => {
    let title;

    if (arr.length > 3) {
      title = `${arr[0]} — … — ${arr[arr.length - 1]}`;
    } else {
      title = arr.reduce((text, item) => {
        return text += `${item} &mdash; `;
      }, ``);

      title = title.slice(0, -9); // откусим ` &mdash; ` с конца
    }

    return title ? title : ``;
  };

  const getPeriod = (arr) => {
    const Months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

    let startDate = arr[0];
    let endDate = arr[arr.length - 1];
    let monthStart = Months[startDate.getMonth()];
    let monthEnd;
    let dayStart = startDate.getDate();
    let dayEnd;
    let period;

    if (startDate === endDate) {
      period = `${monthStart} ${dayStart}`;
    } else if (startDate.getMonth() === endDate.getMonth()) {
      dayEnd = endDate.getDate();
      period = `${monthStart} ${dayStart}&nbsp;&mdash;&nbsp;${dayEnd}`;
    } else {
      dayEnd = endDate.getDate();
      monthEnd = Months[endDate.getMonth()];
      period = `${monthStart} ${dayStart}&nbsp;&mdash;&nbsp;${monthEnd} ${dayEnd}`;
    }

    return period;
  };

  let cities = [];
  let days = [];
  let tripTitle;
  let tripPeriod;

  for (let day of tripList) {
    days.push(day.date);
    for (let event of day.events) {
      if (!cities.length || (event.city !== cities[cities.length - 1])) {
        cities.push(event.city);
      }
    }
  }

  tripTitle = getTripTitle(cities);
  tripPeriod = getPeriod(days);

  return `<div class="trip-info__main">
              <h1 class="trip-info__title">${tripTitle}</h1>

              <p class="trip-info__dates">${tripPeriod}</p>
            </div>`;
};
