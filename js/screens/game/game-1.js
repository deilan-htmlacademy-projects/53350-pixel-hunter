import {Screen} from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge1} from "../templates/game-1";

export class Game1Screen extends Screen {
  constructor(game, challenge) {
    super(getGame(game, getGameChallenge1(challenge)));
    const gameElem = this.view.querySelector(`.game__content`);
    if (!gameElem) {
      throw new Error(`.game__content does not exist`);
    }
    gameElem.addEventListener(`input`, (event) => {
      if (
        event.target.tagName !== `INPUT` ||
        !event.currentTarget.contains(event.target)
      ) {
        return;
      }
      if (this.isOptionChecked()) {
        this.next.fire();
      }
    });
  }

  isOptionChecked() {
    return !!this.view.querySelector(`.game__option input[type=radio]:checked`);
  }
}
