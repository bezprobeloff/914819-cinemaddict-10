import {generateRandomNumber} from '../utils/common.js';

const FilmTitles = [`Fight club`, `Inception`, `Shameless`, `Nice guy`,
  `IT crowd`, `Lost`, `Back to the future`];

const Posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`];

const Paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const SentensesList = Paragraph.match(/.*./g);

const Names = [`Anthony`, `Mann`, `Anne`, `Wigton`, `Heinz`, `Herald`, `Richard`, `Weil`,
  `Erich`, `von Stroheim`, `Mary`, `Dan`, `Duryea`];

const Countries = [`USA`, `Russia`, `Mexico`];

const FilmsGenres = [`Drama`, `Film-Noir`, `Mystery`];

const generateName = () => {
  return Names[generateRandomNumber(0, Names.length - 1)] + ` ` + Names[generateRandomNumber(0, Names.length - 1)];
};

const generateNameList = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateName)
    .join(`, `);
};

const generateDescription = () => {
  let countSensense = generateRandomNumber(1, 3);
  let newDesctiption = ``;
  while (countSensense) {
    newDesctiption += SentensesList[generateRandomNumber(1, SentensesList.length)];
    countSensense--;
  }
  return newDesctiption;
};

const getNewArrayGenres = () => {
  return FilmsGenres.slice(0, generateRandomNumber(1, FilmsGenres.length));
};

const generateFilmCard = () => {
  return {
    title: FilmTitles[generateRandomNumber(0, FilmTitles.length)],
    poster: Posters[generateRandomNumber(0, Posters.length)],
    description: generateDescription(),
    filmRate: (Math.random() * 10).toFixed(1),
    year: generateRandomNumber(1900, 2020),
    duration: generateRandomNumber(0, 4) + `h` + generateRandomNumber(0, 59) + `m`,
    genre: FilmsGenres[generateRandomNumber(0, FilmsGenres.length)],
    commentsCount: generateRandomNumber(0, 2020)
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

const filmDetails = () => {
  return {
    poster: Posters[generateRandomNumber(0, Posters.length)],
    title: FilmTitles[generateRandomNumber(0, FilmTitles.length)],
    originalTitle: FilmTitles[generateRandomNumber(0, FilmTitles.length)],
    rate: (Math.random() * 10).toFixed(1),
    director: generateName(Names),
    writers: generateNameList(3),
    actors: generateNameList(5),
    releaseDate: generateRandomNumber(1900, 2020),
    duration: generateRandomNumber(0, 4) + `h` + generateRandomNumber(0, 59) + `m`,
    country: Countries[generateRandomNumber(0, Countries.length)],
    genres: getNewArrayGenres(),
    description: generateDescription(),
    age: generateRandomNumber(0, 18)
  };
};


export {generateFilmCard, generateFilmCards, filmDetails};

