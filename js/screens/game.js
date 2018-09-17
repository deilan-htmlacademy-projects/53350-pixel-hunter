import App from "../app";
import {createGameView} from "./game-view-factory";

const SECONDS = Object.freeze({
  HALF: 500,
  ONE: 1000,
  FIVE: 5000
});

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
      this.view.updateTime(this.game.state.time / SECONDS.ONE);
      this.checkTime();
    }, SECONDS.ONE);
    const blinkTime = this.game.rules.time - SECONDS.FIVE;
    this.blinkTimeout = setTimeout(() => {
      this.blinkInterval = setInterval(() => this.view.blinkTime(), SECONDS.HALF);
    }, blinkTime);
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
