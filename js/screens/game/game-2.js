import {Screen} from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge2} from "../templates/game-2";

export class Game2Screen extends Screen {
  constructor(game, challenge) {
    super(getGame(game, getGameChallenge2(challenge)));
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
      if (this.isEveryOptionChecked()) {
        this.next.fire();
      }
    });
  }

  isEveryOptionChecked() {
    const gameOptions = Array.from(this.view.querySelectorAll(`.game__option`));
    return gameOptions.every((gameOption) => {
      return gameOption.querySelector(`input[type=radio]:checked`);
    });
  }
}
