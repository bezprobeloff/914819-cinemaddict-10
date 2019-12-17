import FilmCardComponent from '../components/film-card.js';
import {generateFilmCards} from '../mock/filmData.js';
import {createElement, FILM_CARD_COUNT} from '../utils.js';

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

const getFilmListExtraTemplate = (title) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>
  `);
};

const getListCardsTopRated = () => {
  let filmCardsListExtra = [];
  if (getTopRate()) {
    const filmCardsTopRated = filmCards.slice().sort((a, b) => b.filmRate - a.filmRate).slice(0, 2);

    for (const filmRated of filmCardsTopRated) {
      filmCardsListExtra.push(new FilmCardComponent(filmRated).getElement());
    }
  }
  return filmCardsListExtra;
};

const getListCardsMostCommented = () => {
  let filmCardsListExtra = [];
  if (getTopComment()) {
    const filmCardsTopComment = filmCards.slice().sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2);
    for (const filmTopComments of filmCardsTopComment) {
      filmCardsListExtra.push(new FilmCardComponent(filmTopComments).getElement());
    }
  }
  return filmCardsListExtra;
};

export default class FilmsListExtra {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return getFilmListExtraTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      if ((getListCardsTopRated().length !== 0) && this._title === `Top rated`) {
        for (const filmCardExtra of getListCardsTopRated()) {
          this._element.querySelector(`.films-list__container`).append(filmCardExtra);
        }
      } else if ((getListCardsMostCommented().length !== 0) && this._title === `Most commented`) {
        for (const filmCardExtra of getListCardsMostCommented()) {
          this._element.querySelector(`.films-list__container`).append(filmCardExtra);
        }
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
