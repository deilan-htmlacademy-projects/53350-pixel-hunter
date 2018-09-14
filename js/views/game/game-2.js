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
          id: this.question.id,
          options: inputs.map((input) => input.value),
          time: this.game.state.time
        };

        this.eventEmitter.fire(`answer`, answer);
      });
  }

  _getCheckedInputs() {
    return Array.from(this.element.querySelectorAll(`.game__option`)).reduce(
        (inputs, gameOption) => {
          const input = gameOption.querySelector(`input[type=radio]:checked`);

          if (input) {
            inputs.push(input);
          }

          return inputs;
        },
        []
    );
  }
}
