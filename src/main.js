import {getListCardsTopRated, getListCardsMostCommented, RenderPosition, render, FILM_CARD_COUNT, SHOW_FILM_CARDS_ON_START, SHOW_FILM_CARDS_BY_BUTTON} from './utils/render.js';
import ProfileComponent from './components/profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import SortFilmsComponent from './components/sort-films.js';
import FilmsSectionComponent from './components/films-section.js';
import FilmsListComponent from './components/films-list.js';
import FilmsListNullComponent from './components/films-list-empty.js';
import FilmsListExtraComponent from './components/films-list-extra.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import PopupFilmDetailsComponent from './components/popup-film-details.js';
import {generateFilmCards} from './mock/filmData.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const headerSectionElement = document.querySelector(`.header`);
const mainSectionElement = document.querySelector(`.main`);
const renderCard = (card, container) => {
  const filmCardComponent = new FilmCardComponent(card).getElement();
  const popupFilmDetailsComponent = new PopupFilmDetailsComponent();
  render(container, filmCardComponent, RenderPosition.BEFOREEND);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopupFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const removePopupFilmDetails = () => {
    popupFilmDetailsComponent.getElement().remove();
    popupFilmDetailsComponent.removeElement();
  };

  filmCardComponent.querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    render(mainSectionElement, popupFilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    popupFilmDetailsComponent.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, removePopupFilmDetails);
    document.addEventListener(`keydown`, onEscKeyDown);
  });
};

const renderFilms = () => {
  let showingFilmsCard = SHOW_FILM_CARDS_ON_START;
  render(headerSectionElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainSectionElement, new MainNavigationComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainSectionElement, new SortFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainSectionElement, new FilmsSectionComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsSection = document.querySelector(`.films`);

  if (filmCards.length !== 0) {
    const filmListComponent = new FilmsListComponent().getElement();
    render(filmsSection, filmListComponent, RenderPosition.BEFOREEND);
    filmCards.slice(0, showingFilmsCard).map((card) => {
      renderCard(card, filmListComponent.querySelector(`.films-list__container`));
    });
    const filmsListElement = filmsSection.querySelector(`.films-list`);
    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmsListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
    const filmsListExtraTopRatedComponent = new FilmsListExtraComponent(`Top rated`);
    render(filmsSection, filmsListExtraTopRatedComponent.getElement(), RenderPosition.BEFOREEND);
    const listCardTopRated = getListCardsTopRated(filmCards);
    listCardTopRated.slice().map((card) => {
      renderCard(card, filmsListExtraTopRatedComponent.getElement().querySelector(`.films-list__container`));
    });
    const filmsListExtraMostCommentedComponent = new FilmsListExtraComponent(`Most commented`);
    render(filmsSection, filmsListExtraMostCommentedComponent.getElement(), RenderPosition.BEFOREEND);
    const listCardMostComment = getListCardsMostCommented(filmCards);
    listCardMostComment.slice().map((card) => {
      renderCard(card, filmsListExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`));
    });

    const showMoreCards = () => {
      const prevFilmsCount = showingFilmsCard;
      showingFilmsCard += SHOW_FILM_CARDS_BY_BUTTON;

      filmCards.slice(prevFilmsCount, showingFilmsCard).forEach((filmCard) =>
        renderCard(filmCard, filmListComponent.querySelector(`.films-list__container`)));

      if (showingFilmsCard >= filmCards.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    };

    showMoreButtonComponent.getElement().addEventListener(`click`, showMoreCards);
  } else {
    render(filmsSection, new FilmsListNullComponent().getElement(), RenderPosition.BEFOREEND);
  }


  const footerStats = document.querySelector(`.footer__statistics > p`);
  footerStats.textContent = `${filmCards.length} movies inside`;
};

renderFilms();
