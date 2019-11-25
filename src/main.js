import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortFilmsTemplate} from './components/sort-films.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmsListExtraTemplate} from './components/films-list-extra';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createPopupFilmDetailsTemplate} from './components/popup-film-details.js';

const headerSectionElement = document.querySelector(`.header`);
const mainSectionElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderRepeat = (container, template, place, count) => {
  new Array(count)
    .fill(``)
    .forEach(
        () => render(container, template, place)
    );
};

const renderFilms = () => {
  render(headerSectionElement, createProfileTemplate(), `beforeend`);
  render(mainSectionElement, createMainNavigationTemplate(), `beforeend`);
  render(mainSectionElement, createSortFilmsTemplate(), `beforeend`);
  render(mainSectionElement, createFilmsSectionTemplate(), `beforeend`);

  const filmsSection = document.querySelector(`.films`);
  render(filmsSection, createFilmsListTemplate(`All movies. Upcoming`), `beforeend`);
  const filmsListElement = filmsSection.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list > .films-list__container`);
  renderRepeat(filmsListContainerElement, createFilmCardTemplate(), `beforeend`, 5);
  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
  render(filmsSection, createFilmsListExtraTemplate(`Top rated`), `beforeend`);
  render(filmsSection, createFilmsListExtraTemplate(`Most commented`), `beforeend`);

  const filmsListContainerList = filmsSection.querySelectorAll(`.films-list--extra > .films-list__container`);
  [].map.call(filmsListContainerList, (item) => {
    renderRepeat(item, createFilmCardTemplate(), `beforeend`, 2);
  });

  render(mainSectionElement, createPopupFilmDetailsTemplate(), `beforeend`);
};

renderFilms();
