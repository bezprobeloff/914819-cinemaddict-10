import {RenderPosition, render, FILM_CARD_COUNT} from './utils/render.js';
import ProfileComponent from './components/profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import PageController from './controllers/page.js';
import {generateFilmCards} from './mock/filmData.js';

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const headerSectionElement = document.querySelector(`.header`);
const mainSectionElement = document.querySelector(`.main`);

render(headerSectionElement, new ProfileComponent(), RenderPosition.BEFOREEND);
render(mainSectionElement, new MainNavigationComponent(), RenderPosition.BEFOREEND);
const pageController = new PageController(mainSectionElement);
pageController.render(filmCards);

const footerStats = document.querySelector(`.footer__statistics > p`);
footerStats.textContent = `${filmCards.length} movies inside`;
