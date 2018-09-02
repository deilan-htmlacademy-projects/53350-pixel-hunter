import {Screen} from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge2} from "../templates/game-2";
import {adjustLives} from "../../domain/answer";

export class Game2Screen extends Screen {
  constructor(game, challenge) {
    super(getGame(game, getGameChallenge2(challenge)));
    this.view
      .querySelector(`.game__content`)
      .addEventListener(`input`, (event) => {
        if (
          event.target.tagName !== `INPUT` ||
          !event.currentTarget.contains(event.target)
        ) {
          return;
        }
        const choices = this._getChoices(challenge);
        if (choices.length === challenge.options.length) {
          const answer = {
            isCorrect: choices.every((choice) => choice),
            time: 15
          };
          game.answers.push(answer);
          adjustLives(game, answer);
          this.next.fire();
        }
      });
  }

  _getChoices(challenge) {
    const gameOptions = Array.from(this.view.querySelectorAll(`.game__option`));
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
