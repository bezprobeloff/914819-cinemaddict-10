import {createFilmCardTemplate} from '../components/film-card.js';
import {generateFilmCards} from '../mock/filmData.js';
import {FILM_CARD_COUNT} from '../utils.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);

const getTopRate = () => {
  return filmCards.reduce((sum, card) => {
    return sum + parseFloat(card.filmRate);
  }, 0);
};

const getTopComment = () => {
  return filmCards.reduce((sum, card) => {
    return sum + parseFloat(card.commentsCount);
  }, 0);
};

const getFilmListExtraTemplate = (title, filmCardList) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">${filmCardList}</div>
    </section>
  `);
};

export const createFilmsListExtraTemplate = () => {
  let filmCardsListExtra = ``;
  if (getTopRate()) {
    let filmCardsExtra = ``;
    const filmCardsTopRated = filmCards.slice().sort((a, b) => b.filmRate - a.filmRate).slice(0, 2);

    for (const filmRated of filmCardsTopRated) {
      filmCardsExtra += createFilmCardTemplate(filmRated);
    }
    filmCardsListExtra += getFilmListExtraTemplate(`Top rated`, filmCardsExtra);
  }
  if (getTopComment()) {
    let filmCardsExtra = ``;
    const filmCardsTopComment = filmCards.slice().sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2);
    for (const filmTopComments of filmCardsTopComment) {
      filmCardsExtra += createFilmCardTemplate(filmTopComments);
    }
    filmCardsListExtra += getFilmListExtraTemplate(`Most commented`, filmCardsExtra);
  }
  return filmCardsListExtra;
};
