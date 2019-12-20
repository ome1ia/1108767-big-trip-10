export const render = (container, element, place = `append`, wrapper = false) => {
  let template;

  if (wrapper) {
    template = document.createElement(wrapper);
    template.append(element);
  } else {
    template = element;
  }

  switch (place) {
    case `after`:
      container.after(template);
      break;

    case `prepend`:
      container.prepend(template);
      break;

    case `before`:
      container.before(template);
      break;

    case `replace`:
      container.replaceWith(template);
      break;

    case `append`:
      container.append(template);
      break;

    default:
      container.append(template);
      break;
  }
};
