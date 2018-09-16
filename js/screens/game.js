import App from "../app";
import {createGameView} from "./game-view-factory";

const ONE_SECOND = 1000;

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
        options: [],
        time: this.game.state.time
      });
    }
  }
}
