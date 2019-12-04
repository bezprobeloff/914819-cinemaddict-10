const generateRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

export {generateRandomNumber};
