import {getListCardsTopRated, getListCardsMostCommented, RenderPosition, render, remove, SHOW_FILM_CARDS_ON_START, SHOW_FILM_CARDS_BY_BUTTON} from '../utils/render.js';
import FilmCardComponent from '../components/film-card.js';
import PopupFilmDetailsComponent from '../components/popup-film-details.js';
import SortFilmsComponent, {SortType} from '../components/sort-films.js';
import FilmsSectionComponent from '../components/films-section.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsListEmptyComponent from '../components/films-list-empty.js';
import FilmsListExtraComponent from '../components/films-list-extra.js';

import ShowMoreButtonComponent from '../components/show-more-button.js';

const renderCard = (card, container, containerForPopup) => {
  const filmCardComponent = new FilmCardComponent(card);
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

  filmCardComponent.openPopupClickHandler(() => {
    render(containerForPopup, popupFilmDetailsComponent, RenderPosition.BEFOREEND);
    popupFilmDetailsComponent.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, removePopupFilmDetails);
    document.addEventListener(`keydown`, onEscKeyDown);
  });
};

const renderCards = (container, containerForPopup, cards) => {
  cards.forEach((card) => {
    renderCard(card, container, containerForPopup);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortFilmsComponent = new SortFilmsComponent();
    this._filmsSectionComponent = new FilmsSectionComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListExtraTopRatedComponent = new FilmsListExtraComponent(`Top rated`);
    this._filmsListExtraMostCommentedComponent = new FilmsListExtraComponent(`Most commented`);

  }

  render(filmCards) {
    const container = this._container;
    const filmsSection = this._filmsSectionComponent.getElement();
    let showingFilmsCard = SHOW_FILM_CARDS_ON_START;

    const renderShowMoreButton = () => {
      if (showingFilmsCard >= filmCards.length) {
        return;
      }

      render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingFilmsCard;
        showingFilmsCard = showingFilmsCard + SHOW_FILM_CARDS_BY_BUTTON;

        renderCards(container, filmCards.slice(prevTasksCount, showingFilmsCard));

        if (showingFilmsCard >= filmCards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    render(container, this._sortFilmsComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsSectionComponent, RenderPosition.BEFOREEND);

    if (filmCards.length !== 0) {
      const filmListComponent = this._filmsListComponent;
      const showMoreButtonComponent = this._showMoreButtonComponent;
      const filmsListExtraTopRatedComponent = this._filmsListExtraTopRatedComponent;
      const filmsListExtraMostCommentedComponent = this._filmsListExtraMostCommentedComponent;
      const listCardTopRated = getListCardsTopRated(filmCards);
      const listCardMostComment = getListCardsMostCommented(filmCards);

      const showMoreCards = () => {
        const prevFilmsCount = showingFilmsCard;
        showingFilmsCard += SHOW_FILM_CARDS_BY_BUTTON;

        filmCards.slice(prevFilmsCount, showingFilmsCard).forEach((filmCard) =>
          renderCard(filmCard, filmListComponent.getElement().querySelector(`.films-list__container`), container));

        if (showingFilmsCard >= filmCards.length) {
          showMoreButtonComponent.getElement().remove();
          showMoreButtonComponent.removeElement();
        }
      };

      render(filmsSection, filmListComponent, RenderPosition.BEFOREEND);
      filmCards.slice(0, showingFilmsCard).map((card) => {
        renderCard(card, filmListComponent.getElement().querySelector(`.films-list__container`), container);
      });
      const filmsListElement = filmsSection.querySelector(`.films-list`);

      render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);
      render(filmsSection, filmsListExtraTopRatedComponent, RenderPosition.BEFOREEND);

      listCardTopRated.slice().map((card) => {
        renderCard(card, filmsListExtraTopRatedComponent.getElement().querySelector(`.films-list__container`), container);
      });
      render(filmsSection, filmsListExtraMostCommentedComponent, RenderPosition.BEFOREEND);

      listCardMostComment.slice().map((card) => {
        renderCard(card, filmsListExtraMostCommentedComponent.getElement().querySelector(`.films-list__container`), container);
      });

      showMoreButtonComponent.setClickHandler(showMoreCards);
    } else {
      render(filmsSection, new FilmsListEmptyComponent(), RenderPosition.BEFOREEND);
    }
  }
}
