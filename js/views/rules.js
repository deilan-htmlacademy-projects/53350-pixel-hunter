import ScreenView from "./common/screen";
import {getHeader} from "./templates/header";
import EventEmitter from "../utils/event-emitter";

// Правила игры
export class RulesView extends ScreenView {
  constructor(game) {
    super();
    this.game = game;
    this.eventEmitter = new EventEmitter();
  }

  get _template() {
    return `${getHeader()}
    <section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай ${
  this.game.rules.challenges
} раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится ${this.game.rules.time} секунд.</li>
        <li>Ошибиться можно не более ${this.game.rules.lives} раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
  }

  _bind(_element) {
    super._bind(_element);
    const nameInput = _element.querySelector(`.rules__input`);
    const submitBtn = _element.querySelector(`.rules__button`);
    const form = _element.querySelector(`.rules__form`);

    nameInput.addEventListener(`input`, (evt) => {
      submitBtn.disabled = !evt.target.value;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      this.eventEmitter.fire(`submit`, {
        name: nameInput.value.trim()
      });
    });
  }
}
