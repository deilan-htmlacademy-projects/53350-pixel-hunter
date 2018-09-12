import ScreenView from "../common/screen";
import {getGame} from "../templates/game";
import {getGameChallenge1} from "../templates/game-1";
import EventEmitter from "../../utils/event-emitter";

// Игровой экран с одним изображением
export class Game1View extends ScreenView {
  constructor(game, challenge) {
    super();
    this.game = game;
    this.challenge = challenge;
    this.eventEmitter = new EventEmitter();
  }

  get _template() {
    return getGame(this.game, getGameChallenge1(this.challenge));
  }

  _bind(_element) {
    super._bind(_element);

    _element
      .querySelector(`.game__content`)
      .addEventListener(`input`, (event) => {
        if (event.target.tagName !== `INPUT`) {
          return;
        }

        const answer = {
          id: this.challenge.id,
          options: [event.target.value],
          time: this.game.state.time
        };

        this.eventEmitter.fire(`answer`, answer);
      });
  }
}
