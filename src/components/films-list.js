import {createFilmCardTemplate} from '../components/film-card.js';
import {generateFilmCards} from '../mock/filmData.js';
import {FILM_CARD_COUNT, SHOW_FILM_CARDS_ON_START} from '../utils.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmCardOnStart = filmCards.slice(0, SHOW_FILM_CARDS_ON_START).
  reduce((sum, filmCard) => {
    return (sum += createFilmCardTemplate(filmCard));
  }, ``);

export const createFilmsListTemplate = (title) => {
  return (`
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">${title}</h2>
      <div class="films-list__container">${filmCardOnStart}</div>
    </section>
  `);
};
