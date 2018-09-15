import App from "../app";
import {Game1View} from "../views/game/game-1";
import {QuestionType} from "../domain/question-type";
import {Game2View} from "../views/game/game-2";
import {Game3View} from "../views/game/game-3";

const ONE_SECOND = 1000;

const CHALLENGE_GAME_SCREEN_MAP = {
  [QuestionType.TINDER_LIKE]: Game1View,
  [QuestionType.TWO_OF_TWO]: Game2View,
  [QuestionType.ONE_OF_THREE]: Game3View
};

export default class GameScreen {
  constructor(game, questionId) {
    this.game = game;
    this.questionId = questionId;

    const question = this.game.questions[this.questionId - 1];

    this.view = new CHALLENGE_GAME_SCREEN_MAP[question.type](
        this.game,
        question
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
      App.showGame(this.questionId + 1);
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
