const render = (container, element, place = `append`) => {
  const domElement = element.getElement();

  switch (place) {
    case `after`:
      container.after(domElement);
      break;

    case `prepend`:
      container.prepend(domElement);
      break;

    case `before`:
      container.before(domElement);
      break;

    case `replace`:
      container.replaceWith(domElement);
      break;

    case `append`:
      container.append(domElement);
      break;
  }
};

const replace = (oldElement, newElement) => {
  oldElement.getElement().replaceWith(newElement.getElement());
};

const replaceTripForm = (form, trip) => {
  const formWrapper = form.getElement().parentElement;
  formWrapper.replaceWith(trip.getElement());
};

const replaceTrip = (trip, form) => {
  const formWrapper = document.createElement(`li`);
  formWrapper.append(form.getElement());

  trip.getElement().replaceWith(formWrapper);
};

const remove = (element) => {
  element.getElement().remove();
  element.removeElement();
};

export {render, replace, replaceTripForm, replaceTrip, remove};
