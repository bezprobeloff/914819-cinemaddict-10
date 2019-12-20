import {getStatMenu} from '../mock/menu.js';
import AbstractComponent from './abstract-component.js';

const {watchList, history, favorites} = getStatMenu();
const createMainNavigationTemplate = () => {
  return (`
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
  `);
};

export default class MainNavigation extends AbstractComponent {

  getTemplate() {
    return createMainNavigationTemplate();
  }
}
