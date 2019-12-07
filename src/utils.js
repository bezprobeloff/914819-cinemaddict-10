const FILM_CARD_COUNT = 12;
const SHOW_FILM_CARDS_ON_START = 5;
const SHOW_FILM_CARDS_BY_BUTTON = 5;
const generateRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

export {generateRandomNumber, FILM_CARD_COUNT, SHOW_FILM_CARDS_ON_START, SHOW_FILM_CARDS_BY_BUTTON};
