import FilmCardComponent from '../components/film-card.js';
import {generateFilmCards} from '../mock/filmData.js';
import {createElement, FILM_CARD_COUNT, SHOW_FILM_CARDS_ON_START} from '../utils.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmsCardsOnStart = filmCards.slice(0, SHOW_FILM_CARDS_ON_START).
  map((card) => {
    return new FilmCardComponent(card).getElement();
  });

const createFilmsListTemplate = (title) => {
  return (`
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">${title}</h2>
      <div class="films-list__container"></div>
    </section>
  `);
};

export default class FilmsList {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      for (const filmCard of filmsCardsOnStart) {
        this._element.querySelector(`.films-list__container`).append(filmCard);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
