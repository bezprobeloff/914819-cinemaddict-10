import {generateRandomNumber} from '../utils/common.js';

export const getStatMenu = () => {
  return {
    watchList: generateRandomNumber(0, 15),
    history: generateRandomNumber(0, 15),
    favorites: generateRandomNumber(0, 15)
  };
};
