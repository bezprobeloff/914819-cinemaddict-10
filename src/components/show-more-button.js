import AbstractComponent from './abstract-component.js';

const createShowMoreButtonTemplate = () => {
  return (`
    <button class="films-list__show-more">Show more</button>
  `);
};

export default class Profile extends AbstractComponent {

  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
