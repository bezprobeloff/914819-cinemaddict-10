const FILM_CARD_COUNT = 22;
const SHOW_FILM_CARDS_ON_START = 5;
const SHOW_FILM_CARDS_BY_BUTTON = 5;

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

const getListCardsTopRated = (cards) => {
  let filmCardsListExtra = [];
  if (cards.length !== 0) {
    const filmCardsTopRated = cards.slice().sort((a, b) => b.filmRate - a.filmRate).slice(0, 2);

    for (const filmRated of filmCardsTopRated) {
      filmCardsListExtra.push(filmRated);
    }
  }
  return filmCardsListExtra;
};

const getListCardsMostCommented = (cards) => {
  let filmCardsListExtra = [];
  if (cards.length !== 0) {
    const filmCardsTopComment = cards.slice().sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2);
    for (const filmTopComments of filmCardsTopComment) {
      filmCardsListExtra.push(filmTopComments);
    }
  }
  return filmCardsListExtra;
};


export {
  RenderPosition,
  createElement,
  render,
  getListCardsTopRated,
  getListCardsMostCommented,
  FILM_CARD_COUNT,
  SHOW_FILM_CARDS_ON_START,
  SHOW_FILM_CARDS_BY_BUTTON
};
