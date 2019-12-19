import {createElement} from '../utils.js';

const createFilmListExtraTemplate = (title) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container"></div>
    </section>
  `);
};

export default class FilmsListExtra {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      /*
      if ((getListCardsTopRated().length !== 0) && this._title === `Top rated`) {
        for (const filmCardExtra of getListCardsTopRated()) {
          this._element.querySelector(`.films-list__container`).append(filmCardExtra);
        }
      } else if ((getListCardsMostCommented().length !== 0) && this._title === `Most commented`) {
        for (const filmCardExtra of getListCardsMostCommented()) {
          this._element.querySelector(`.films-list__container`).append(filmCardExtra);
        }
      }
      */
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
