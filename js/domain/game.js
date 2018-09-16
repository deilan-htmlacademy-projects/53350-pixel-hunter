import {Result} from "./answer-rank";
import {scoring as defaultScoring} from "../domain/scoring";
import {rules as defaultRules} from "./rules";
import Answer from "./answer";

export default class Game {
  static create(questions) {
    return new Game(defaultRules, questions, defaultScoring);
  }

  constructor(rules, questions, scoring) {
    this.playerName = ``;
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

  isOver() {
    return (
      this.state.lives < 0 || this.questions.length === this.answers.length
    );
  }

  isWin() {
    return (
      this.state.lives >= 0 && this.questions.length === this.answers.length
    );
  }

  setAnswer(answer) {
    const question = this.questions[this.state.questionIndex];
    if (!question) {
      throw new Error(`question does not exist`);
    }

    const result = new Answer(
        Game.isAnswerCorrect(answer, question),
        answer.time
    );

    this.answers.push(result);
    this.result.stats[this.state.questionIndex] = result.getResultType();
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
}
