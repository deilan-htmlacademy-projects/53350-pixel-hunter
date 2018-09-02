import {Screen} from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge3} from "../templates/game-3";
import {IMAGE_TYPES} from "../../data/challenges";
import {adjustLives} from "../../domain/answer";

export class Game3Screen extends Screen {
  constructor(game, challenge) {
    super(getGame(game, getGameChallenge3(challenge)));
    this.view
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
        game.answers.push(answer);
        adjustLives(game, answer);
        this.next.fire();
      });
  }
}
