import App from "../app";
import {Game1View} from "../views/game/game-1";
import {CHALLENGE_TYPES} from "../data/challenges";
import {Game2View} from "../views/game/game-2";
import {Game3View} from "../views/game/game-3";

const ONE_SECOND = 1000;

const CHALLENGE_GAME_SCREEN_MAP = {
  [CHALLENGE_TYPES.FIRST]: Game1View,
  [CHALLENGE_TYPES.SECOND]: Game2View,
  [CHALLENGE_TYPES.THIRD]: Game3View
};

export default class GameScreen {
  constructor(game, challengeId) {
    this.game = game;
    this.challengeId = challengeId;

    const challenge = this.game.challenges[this.challengeId - 1];

    this.view = new CHALLENGE_GAME_SCREEN_MAP[challenge.type](
        this.game,
        challenge
    );

    this.startTimer();

    this.view.eventEmitter.on(`answer`, (answer) => this.onAnswer(answer));

    this.view.eventEmitter.on(`reset`, () => {
      App.showIntro();
    });
  }

  onAnswer(answer) {
    this.stopTimer();
    this.game.setAnswer(answer);

    if (this.game.isOver()) {
      App.showStats();
    } else {
      App.showGame(this.challengeId + 1);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.game.tick();
      this.view.updateTime(this.game.state.time);
      this.checkTime();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.game.resetTime();
  }

  checkTime() {
    if (this.game.state.time >= this.game.rules.time) {
      this.onAnswer({
        id: this.challengeId,
        options: [],
        time: this.game.state.time
      });
    }
  }
}
