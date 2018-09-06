import ScreenView from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge1} from "../templates/game-1";
import {adjustLives} from "../../domain/answer";

// Игровой экран с одним изображением
export class Game1Screen extends ScreenView {
  constructor(game, challenge) {
    super();
    this.game = game;
    this.challenge = challenge;
  }

  get _template() {
    return getGame(this.game, getGameChallenge1(this.challenge));
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
        const isCorrect = this.challenge.options[0].type === event.target.value;
        const answer = {
          isCorrect,
          time: 15
        };
        this.game.answers.push(answer);
        adjustLives(this.game, answer);
        this.nextEventEmitter.fire();
      });
  }
}
