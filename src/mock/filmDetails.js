import {generateRandomNumber} from '../utils.js';
import {generateDescription} from './film-card.js';
const FilmTitles = [`Бойцовский клуб`, `Начало`, `Бесстыжие`, `Славные парни`,
  `IT crowd`, `Остаться в живых`, `Назад в будущее`];

const Posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`];

const names = [`Anthony`, `Mann`, `Anne`, `Wigton`, `Heinz`, `Herald`, `Richard`, `Weil`,
  `Erich`, `von Stroheim`, `Mary`, `Dan`, `Duryea`];

const countries = [`USA`, `RUSSIA`, `MEXICO`];

const FilmsGenres = [`Музыка`, `Трэш`, `Угар`, `Говно`];

const generateName = () => {
  return names[generateRandomNumber(0, names.length - 1)] + ` ` + names[generateRandomNumber(0, names.length - 1)];
};

const generateNameList = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateName)
    .join(`, `);
};

export const filmDetails = () => {
  return {
    poster: Posters[generateRandomNumber(0, Posters.length)],
    title: FilmTitles[generateRandomNumber(0, FilmTitles.length)],
    originalTitle: FilmTitles[generateRandomNumber(0, FilmTitles.length)],
    rate: (Math.random() * 10).toFixed(1),
    director: generateName(names),
    writers: generateNameList(3),
    actors: generateNameList(5),
    releaseDate: generateRandomNumber(1900, 2020),
    duration: generateRandomNumber(0, 4) + `h` + generateRandomNumber(0, 59) + `m`,
    country: countries[generateRandomNumber(0, countries.length)],
    genres: FilmsGenres[generateRandomNumber(0, FilmsGenres.length)],
    description: generateDescription(),
    age: generateRandomNumber(0, 18)
  };
};


