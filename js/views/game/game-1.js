import ScreenView from "../common/screen";
import {getGame} from "../templates/game";
import {getGameQuestion1} from "../templates/game-1";
import EventEmitter from "../../utils/event-emitter";

// Игровой экран с одним изображением
export class Game1View extends ScreenView {
  constructor(game, question) {
    super();
    this.game = game;
    this.question = question;
    this.eventEmitter = new EventEmitter();
  }

  get _template() {
    return getGame(this.game, getGameQuestion1(this.question));
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
          options: [event.target.value],
          time: this.game.state.time
        };

        this.eventEmitter.fire(`answer`, answer);
      });
  }
}
