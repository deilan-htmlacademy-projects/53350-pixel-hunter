import {getAnswerRank} from "../score";
import {Result} from "./answer-rank";
import {scoring as defaultScoring} from "../domain/scoring";
import {rules as defaultRules} from "./rules";

export default class Game {
  static create(questions) {
    return new Game(defaultRules, questions, defaultScoring);
  }

  constructor(rules, questions, scoring) {
    this._playerName = ``;
    this.rules = rules;
    this.questions = questions;
    this.scoring = scoring;

    this.state = {
      lives: rules.lives,
      time: 0,
      questionIndex: 0
    };

    this.answers = [];

    this.result = {
      title: ``,
      stats: Array.from({length: this.rules.questions}, () => Result.UNKNOWN),
      correct: 0,
      quick: 0,
      lives: 0,
      slow: 0
    };
  }

  tick() {
    this.state.time++;
  }

  get playerName() {
    return this._playerName;
  }

  set playerName(value) {
    this._playerName = value;
  }

  resetTime() {
    this.state.time = 0;
  }

  die() {
    this.lives--;
  }

  isOver() {
    return (
      this.state.lives <= 0 || this.questions.length === this.answers.length
    );
  }

  setAnswer(answer) {
    const question = this.questions[this.state.questionIndex];
    if (!question) {
      throw new Error(`question does not exist`);
    }

    const result = {
      isCorrect: Game.isAnswerCorrect(answer, question),
      time: answer.time
    };

    this.answers.push(result);
    this.result.stats[this.state.questionIndex] = getAnswerRank(result);
    this.adjustLives(result);
    this.state.questionIndex++;
  }

  static isAnswerCorrect(answer, question) {
    return question.answers.every(
        (option, index) => answer.options[index] === option.type
    );
  }

  adjustLives(answer) {
    if (!answer.isCorrect) {
      this.state.lives -= 1;
    }
  }

  getGameResult() {
    this.result = {};
    this.result.stats = this.answers.map((answer) => ({
      result: getAnswerRank(answer)
    }));

    this.result.correct = this.result.stats.filter(
        (stat) => stat.result !== Result.WRONG
    ).length;

    this.result.quick = this.result.stats.filter(
        (stat) => stat.result === Result.FAST
    ).length;

    this.result.slow = this.result.stats.filter(
        (stat) => stat.result === Result.SLOW
    ).length;

    this.result.lives = this.state.lives;
    this.result.title = this.result.lives > 0 ? `Победа!` : `Поражение!`;
  }

  getGameScore() {
    this.score = {};
    this.score.correct = this.scoring.correct * this.result.correct;

    this.score.lives = this.scoring.lives * this.result.lives;

    this.score.quick = this.scoring.quick * this.result.quick;

    this.score.slow = this.scoring.slow * this.result.slow;

    this.score.total =
      this.score.correct +
      this.score.quick +
      this.score.slow +
      this.score.lives;
  }
}
