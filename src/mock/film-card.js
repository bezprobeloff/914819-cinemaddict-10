const FilmTitles = [`Бойцовский клуб`, `Начало`, `Бесстыжие`, `Славные парни`,
  `IT crowd`, `Остаться в живых`, `Назад в будущее`];

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
const FilmsGenres = [`Музыка`, `Трэш`, `Угар`, `Говно`];

const generateRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

const generateDescription = (textList) => {
  let countSensense = generateRandomNumber(1, 3);
  let newDesctiption = ``;
  while (countSensense) {
    newDesctiption += textList[generateRandomNumber(1, textList.length)];
    countSensense--;
  }
  return newDesctiption;
};

const generateFilmCard = () => {
  return {
    title: FilmTitles[generateRandomNumber(0, FilmTitles.length)],
    poster: Posters[generateRandomNumber(0, Posters.length)],
    description: generateDescription(SentensesList),
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

export {generateFilmCard, generateFilmCards};
