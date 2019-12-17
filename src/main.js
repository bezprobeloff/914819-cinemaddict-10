import {RenderPosition, render, FILM_CARD_COUNT, SHOW_FILM_CARDS_ON_START, SHOW_FILM_CARDS_BY_BUTTON} from './utils.js';
import ProfileComponent from './components/profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import SortFilmsComponent from './components/sort-films.js';
import FilmsSectionComponent from './components/films-section.js';
import FilmsListComponent from './components/films-list.js';
import FilmsListExtraComponent from './components/films-list-extra';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import PopupFilmDetails from './components/popup-film-details.js';
import {generateFilmCards} from './mock/filmData.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const headerSectionElement = document.querySelector(`.header`);
const mainSectionElement = document.querySelector(`.main`);

const renderFilms = () => {
  let showingFilmsCard = SHOW_FILM_CARDS_ON_START;
  render(headerSectionElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);


  render(mainSectionElement, new MainNavigationComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainSectionElement, new SortFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainSectionElement, new FilmsSectionComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsSection = document.querySelector(`.films`);
  render(filmsSection, new FilmsListComponent(`All movies. Upcoming`).getElement(), RenderPosition.BEFOREEND);
  const filmsListElement = filmsSection.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list > .films-list__container`);

  render(filmsListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
  const filmsShowMoreButton = filmsSection.querySelector(`.films-list__show-more`);
  render(filmsSection, new FilmsListExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
  render(filmsSection, new FilmsListExtraComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);

  const showMoreCards = () => {
    const prevFilmsCount = showingFilmsCard;
    showingFilmsCard += SHOW_FILM_CARDS_BY_BUTTON;

    filmCards.slice(prevFilmsCount, showingFilmsCard).forEach((filmCard) =>
      render(filmsListContainerElement, new FilmCardComponent(filmCard).getElement(), RenderPosition.BEFOREEND));

    if (showingFilmsCard >= filmCards.length) {
      filmsShowMoreButton.remove();
    }
  };

  filmsShowMoreButton.addEventListener(`click`, showMoreCards);

  const footerStats = document.querySelector(`.footer__statistics > p`);
  footerStats.textContent = `${filmCards.length} movies inside`;

  /*
  render(mainSectionElement, new PopupFilmDetailsComponent(), RenderPosition.BEFOREEND);
  */
};

renderFilms();
