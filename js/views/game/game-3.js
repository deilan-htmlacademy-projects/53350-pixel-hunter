import {getGame} from "../templates/game";
import {getGameChallenge3} from "../templates/game-3";
import {IMAGE_TYPES} from "../../data/challenges";
import {adjustLives} from "../../domain/answer";
import ScreenView from "../common/screen";

// Игровой экран с тремя изображениями
export class Game3Screen extends ScreenView {
  constructor(game, challenge) {
    super();
    this.game = game;
    this.challenge = challenge;
  }

  get _template() {
    return getGame(this.game, getGameChallenge3(this.challenge));
  }

  _bind(_element) {
    _element
      .querySelector(`.game__content`)
      .addEventListener(`click`, (event) => {
        const target = event.target.closest(`.game__option`);
        if (!target) {
          return;
        }
        const answer = {
          isCorrect: target.dataset.type === IMAGE_TYPES.PAINTING,
          time: 15
        };
        this.game.answers.push(answer);
        adjustLives(this.game, answer);
        this.nextEventEmitter.fire();
      });
  }
}
