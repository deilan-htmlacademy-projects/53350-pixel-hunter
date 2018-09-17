import ScreenView from "../common/screen";
import {getGame} from "../templates/game";
import {getGameQuestion2} from "../templates/game-2";
import EventEmitter from "../../utils/event-emitter";

// Игровой экран с двумя изображениями
export class Game2View extends ScreenView {
  constructor(game, question) {
    super();
    this.game = game;
    this.question = question;
    this.eventEmitter = new EventEmitter();
  }

  get _template() {
    return getGame(this.game, getGameQuestion2(this.question));
  }

  _getCheckedInputs() {
    const gameOptions = Array.from(this.element.querySelectorAll(`.game__option`));
    return Game2View._getCheckedInputs(gameOptions);
  }

  _bind(_element) {
    super._bind(_element);

    _element
      .querySelector(`.game__content`)
      .addEventListener(`input`, (event) => {
        if (event.target.tagName !== `INPUT`) {
          return;
        }

        const inputs = this._getCheckedInputs();

        if (inputs.length !== this.question.answers.length) {
          return;
        }

        const answer = {
          options: inputs.map((input) => input.value),
          time: this.game.state.time
        };

        this.eventEmitter.fire(`answer`, answer);
      });
  }

  static _getCheckedInputs(gameOptionElements) {
    const getCheckedInputs = (checkedInputs, gameOptionElement) => {
      const checkedInput = gameOptionElement.querySelector(`input[type=radio]:checked`);

      if (checkedInput) {
        return [...checkedInputs, checkedInput];
      }

      return checkedInputs;
    };
    return gameOptionElements.reduce(getCheckedInputs, []);
  }
}
