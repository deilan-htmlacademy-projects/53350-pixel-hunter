import {Result} from "./answer-rank";
import {scoring as defaultScoring} from "../domain/scoring";
import {rules as defaultRules} from "./rules";
import Answer from "./answer";

export default class Game {
  constructor(rules, questions, scoring) {
    this.rules = rules;
    this.questions = questions;
    this.scoring = scoring;

    this.reset();
  }

  get playerName() {
    return this._playerName || ``;
  }

  set playerName(value) {
    this._playerName = value;
  }

  tick() {
    this.state.time += 1000;
  }

  reset() {
    this.state = {
      lives: this.rules.lives,
      time: 0,
      questionIndex: 0
    };

    this.answers = [];

    this.stats = Array.from(
        {length: this.rules.questions},
        () => Result.UNKNOWN
    );
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
    this.stats[this.state.questionIndex] = result.getResultType();
    this._adjustLives(result);
    this.state.questionIndex++;
  }

  _adjustLives(answer) {
    if (!answer.isCorrect) {
      this.state.lives -= 1;
    }
  }

  static create(questions) {
    return new Game(defaultRules, questions, defaultScoring);
  }

  static isAnswerCorrect(answer, question) {
    return question.answers.every(
        (option, index) => answer.options[index] === option.type
    );
  }
}
