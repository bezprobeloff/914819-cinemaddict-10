import {generateRandomNumber} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
const countFilm = generateRandomNumber(0, 30);

const getProfileRate = (count) => {
  if (count > 0 && count <= 10) {
    return `novice`;
  } else if (count > 10 && count <= 20) {
    return `fan`;
  } else if (count > 20) {
    return `movie buff`;
  }
  return ``;
};

const createProfileTemplate = () => {
  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${getProfileRate(countFilm)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);
};

export default class Profile extends AbstractComponent {

  getTemplate() {
    return createProfileTemplate();
  }
}
