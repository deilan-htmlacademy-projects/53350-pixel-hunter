import App from "../app";
import {createGameView} from "./game-view-factory";

const FIVE_HUNDREDS_MS = 500;
const ONE_THOUSAND_MS = 1000;
const FIVE_SEC = 5;

export default class GameScreen {
  constructor(game) {
    this.game = game;
    this.view = createGameView(game);

    this.startTimer();

    this.view.eventEmitter.on(`answer`, (answer) => this.onAnswer(answer));

    this.view.eventEmitter.on(`reset`, () => {
      App.resetGame();
    });
  }

  onAnswer(answer) {
    this.stopTimer();
    this.game.setAnswer(answer);

    if (this.game.isOver()) {
      App.showStats();
    } else {
      App.showGame();
    }
  }

  startTimer() {
    this.tickInterval = setInterval(() => {
      this.game.tick();
      this.view.updateTime(this.game.state.time);
      this.checkTime();
    }, ONE_THOUSAND_MS);
    this.blinkTimeout = setTimeout(() => {
      this.blinkInterval = setInterval(() => this.view.blinkTime(), FIVE_HUNDREDS_MS);
    }, (this.game.rules.time - FIVE_SEC) * ONE_THOUSAND_MS);
  }

  stopTimer() {
    clearInterval(this.tickInterval);
    clearTimeout(this.blinkTimeout);
    clearInterval(this.blinkInterval);
    this.game.resetTime();
  }

  checkTime() {
    if (this.game.state.time >= this.game.rules.time) {
      this.onAnswer({
        options: [],
        time: this.game.state.time
      });
    }
  }
}
