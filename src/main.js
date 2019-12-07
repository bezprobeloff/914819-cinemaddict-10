import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortFilmsTemplate} from './components/sort-films.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmsListExtraTemplate} from './components/films-list-extra';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createPopupFilmDetailsTemplate} from './components/popup-film-details.js';
import {FILM_CARD_COUNT, SHOW_FILM_CARDS_ON_START, SHOW_FILM_CARDS_BY_BUTTON} from './utils.js';
import {generateFilmCards} from './mock/filmData.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const headerSectionElement = document.querySelector(`.header`);
const mainSectionElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilms = () => {
  let showingFilmsCard = SHOW_FILM_CARDS_ON_START;
  render(headerSectionElement, createProfileTemplate(), `beforeend`);
  render(mainSectionElement, createMainNavigationTemplate(), `beforeend`);
  render(mainSectionElement, createSortFilmsTemplate(), `beforeend`);
  render(mainSectionElement, createFilmsSectionTemplate(), `beforeend`);

  const filmsSection = document.querySelector(`.films`);
  render(filmsSection, createFilmsListTemplate(`All movies. Upcoming`), `beforeend`);
  const filmsListElement = filmsSection.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list > .films-list__container`);

  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
  const filmsShowMoreButton = filmsSection.querySelector(`.films-list__show-more`);
  render(filmsSection, createFilmsListExtraTemplate(), `beforeend`);

  const showMoreCards = () => {
    const prevFilmsCount = showingFilmsCard;
    showingFilmsCard += SHOW_FILM_CARDS_BY_BUTTON;

    filmCards.slice(prevFilmsCount, showingFilmsCard).forEach((filmCard) =>
      render(filmsListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));

    if (showingFilmsCard >= filmCards.length) {
      filmsShowMoreButton.remove();
    }
  };

  filmsShowMoreButton.addEventListener(`click`, showMoreCards);

  const footerStats = document.querySelector(`.footer__statistics > p`);
  footerStats.textContent = `${filmCards.length} movies inside`;
  render(mainSectionElement, createPopupFilmDetailsTemplate(), `beforeend`);
};

renderFilms();
