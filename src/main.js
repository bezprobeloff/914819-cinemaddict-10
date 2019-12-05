import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortFilmsTemplate} from './components/sort-films.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmsListExtraTemplate} from './components/films-list-extra';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createPopupFilmDetailsTemplate} from './components/popup-film-details.js';
import {generateFilmCards} from './mock/film-card.js';
import {generateRandomNumber} from './utils.js';

const FILM_CARD_COUNT = 12;
const SHOW_FILM_CARDS_ON_START = 5;
const SHOW_FILM_CARDS_BY_BUTTON = 5;
const filmCards = generateFilmCards(FILM_CARD_COUNT);
const headerSectionElement = document.querySelector(`.header`);
const mainSectionElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilms = () => {
  render(headerSectionElement, createProfileTemplate(generateRandomNumber(0, 30)), `beforeend`);
  render(mainSectionElement, createMainNavigationTemplate(), `beforeend`);
  render(mainSectionElement, createSortFilmsTemplate(), `beforeend`);
  render(mainSectionElement, createFilmsSectionTemplate(), `beforeend`);

  const filmsSection = document.querySelector(`.films`);
  render(filmsSection, createFilmsListTemplate(`All movies. Upcoming`), `beforeend`);
  const filmsListElement = filmsSection.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list > .films-list__container`);

  let showingFilmsCard = SHOW_FILM_CARDS_ON_START;
  filmCards.slice(0, showingFilmsCard).forEach((filmCard) =>
    render(filmsListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));
  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
  const filmsShowMoreButton = filmsSection.querySelector(`.films-list__show-more`);
  filmsShowMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCard;
    showingFilmsCard += SHOW_FILM_CARDS_BY_BUTTON;

    filmCards.slice(prevFilmsCount, showingFilmsCard).forEach((filmCard) =>
      render(filmsListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));

    if (showingFilmsCard >= filmCards.length) {
      filmsShowMoreButton.remove();
    }
  });


  const sumRate = filmCards.reduce((sum, card) => {
    return sum + parseFloat(card.filmRate);
  }, 0);

  if (sumRate) {
    render(filmsSection, createFilmsListExtraTemplate(`Top rated`), `beforeend`);
  }
  const sumComment = filmCards.reduce((sum, card) => {
    return sum + parseInt(card.commentsCount, 10);
  }, 0);

  if (sumComment) {
    render(filmsSection, createFilmsListExtraTemplate(`Most commented`), `beforeend`);
  }

  const filmsExtraList = filmsSection.querySelectorAll(`.films-list--extra`);
  for (const filmExtra of Array.from(filmsExtraList)) {
    if (filmExtra.querySelector(`.films-list__title`).textContent === `Top rated`) {
      const filmCardsTopRated = filmCards.slice().sort((a, b) => b.filmRate - a.filmRate).slice(0, 2);
      for (const filmRated of filmCardsTopRated) {
        render(filmExtra.querySelector(`.films-list__container`), createFilmCardTemplate(filmRated), `beforeend`);
      }
    }
  }
  for (const filmExtra of Array.from(filmsExtraList)) {
    if (filmExtra.querySelector(`.films-list__title`).textContent === `Most commented`) {
      const filmCardTopComments = filmCards.slice().sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2);
      for (const filmTopComment of filmCardTopComments) {
        render(filmExtra.querySelector(`.films-list__container`), createFilmCardTemplate(filmTopComment), `beforeend`);
      }
    }
  }

  const footerStats = document.querySelector(`.footer__statistics > p`);
  footerStats.textContent = `${filmCards.length} movies inside`;

  render(mainSectionElement, createPopupFilmDetailsTemplate(), `beforeend`);
};

renderFilms();
