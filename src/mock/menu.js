import {generateRandomNumber} from '../utils.js';

export const getStatMenu = () => {
  return {
    watchlist: generateRandomNumber(0, 15),
    history: generateRandomNumber(0, 15),
    favorites: generateRandomNumber(0, 15)
  };
};
