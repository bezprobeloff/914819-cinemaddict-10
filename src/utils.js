const FILM_CARD_COUNT = 12;
const SHOW_FILM_CARDS_ON_START = 5;
const SHOW_FILM_CARDS_BY_BUTTON = 5;
const generateRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


export {
  generateRandomNumber,
  RenderPosition,
  createElement,
  render,
  FILM_CARD_COUNT,
  SHOW_FILM_CARDS_ON_START,
  SHOW_FILM_CARDS_BY_BUTTON
};
