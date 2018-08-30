import {Screen} from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge3} from "../templates/game-3";

export class Game3Screen extends Screen {
  constructor(game, challenge) {
    super(getGame(game, getGameChallenge3(challenge)));
    const gameElem = this.view.querySelector(`.game__content`);
    if (!gameElem) {
      throw new Error(`.game__content does not exist`);
    }
    gameElem.addEventListener(`click`, (event) => {
      const gameOptionElem = event.target.closest(`.game__option`);
      if (!gameOptionElem) {
        return;
      }
      this.next.fire();
    });
  }
}
