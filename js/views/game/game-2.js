import ScreenView from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge2} from "../templates/game-2";
import {adjustLives} from "../../domain/answer";

// Игровой экран с двумя изображениями
export class Game2Screen extends ScreenView {
  constructor(game, challenge) {
    super();
    this.game = game;
    this.challenge = challenge;
  }

  get _template() {
    return getGame(this.game, getGameChallenge2(this.challenge));
  }

  _bind(_element) {
    _element
      .querySelector(`.game__content`)
      .addEventListener(`input`, (event) => {
        if (
          event.target.tagName !== `INPUT` ||
          !event.currentTarget.contains(event.target)
        ) {
          return;
        }
        const choices = this._getChoices(_element, this.challenge);
        if (choices.length === this.challenge.options.length) {
          const answer = {
            isCorrect: choices.every((choice) => choice),
            time: 15
          };
          this.game.answers.push(answer);
          adjustLives(this.game, answer);
          this.nextEventEmitter.fire();
        }
      });
  }

  _getChoices(element, challenge) {
    const gameOptions = Array.from(element.querySelectorAll(`.game__option`));
    return gameOptions.reduce((acc, gameOption, index) => {
      const choice = gameOption.querySelector(`input[type=radio]:checked`);
      if (choice) {
        const isCorrect = challenge.options[index].type === choice.value;
        acc.push(isCorrect);
      }
      return acc;
    }, []);
  }
}
