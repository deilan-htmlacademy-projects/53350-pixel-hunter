import {Screen} from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge1} from "../templates/game-1";
import {adjustLives} from "../../domain/answer";

export class Game1Screen extends Screen {
  constructor(game, challenge) {
    super(getGame(game, getGameChallenge1(challenge)));
    this.view
      .querySelector(`.game__content`)
      .addEventListener(`input`, (event) => {
        if (
          event.target.tagName !== `INPUT` ||
          !event.currentTarget.contains(event.target)
        ) {
          return;
        }
        const input = this._getInput();
        if (input) {
          const isCorrect = challenge.options[0].type === input.value;
          const answer = {
            isCorrect,
            time: 15
          };
          game.answers.push(answer);
          adjustLives(game, answer);
          this.next.fire();
        }
      });
  }

  _getInput() {
    return this.view.querySelector(`.game__option input[type=radio]:checked`);
  }
}
