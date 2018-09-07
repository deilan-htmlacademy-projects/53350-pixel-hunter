import ScreenView from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge2} from "../templates/game-2";
import EventEmitter from "../../utils/event-emitter";

// Игровой экран с двумя изображениями
export class Game2View extends ScreenView {
  constructor(game, challenge) {
    super();
    this.game = game;
    this.challenge = challenge;
    this.answerEventEmitter = new EventEmitter();
  }

  get _template() {
    return getGame(this.game, getGameChallenge2(this.challenge));
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
        if (inputs.length !== this.challenge.options.length) {
          return;
        }
        const answer = {
          id: this.challenge.id,
          options: inputs.map((input) => input.value),
          time: 15
        };
        this.answerEventEmitter.fire(answer);
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
