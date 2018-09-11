import {getAnswerRank} from "../score";
import {ANSWER_RANK} from "./answer-rank";

import {getAllChallenges} from "../data/challenges";
import {SCORING} from "../data/scoring";
import {RULES} from "../data/rules";

export default class Game {
  static create() {
    return new Game(RULES, getAllChallenges(), SCORING);
  }

  constructor(rules, challenges, scoring) {
    this._playerName = ``;
    this.rules = rules;
    this.challenges = challenges;
    this.scoring = scoring;

    this.state = {
      lives: rules.lives,
      time: 0
    };

    this.answers = [];

    this.result = {
      title: ``,
      stats: [],
      correctness: 0,
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
      this.state.lives <= 0 || this.challenges.length === this.answers.length
    );
  }

  setAnswer(answer) {
    const challenge = this.challenges.find((c) => c.id === answer.id);
    if (!challenge) {
      throw new Error(`challenge does not exist`);
    }

    const result = {
      isCorrect: Game.isAnswerCorrect(answer, challenge),
      time: answer.time
    };

    this.answers.push(result);
    this.adjustLives(result);
  }

  static isAnswerCorrect(answer, challenge) {
    return challenge.options.every(
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

    this.result.correctness = this.result.stats.filter(
        (stat) => stat.result !== ANSWER_RANK.WRONG
    ).length;

    this.result.quick = this.result.stats.filter(
        (stat) => stat.result === ANSWER_RANK.QUICK
    ).length;

    this.result.slow = this.result.stats.filter(
        (stat) => stat.result === ANSWER_RANK.SLOW
    ).length;

    this.result.lives = this.state.lives;
    this.result.title = this.result.lives > 0 ? `Победа!` : `Поражение!`;
  }

  getGameScore() {
    this.score = {};
    this.score.correctness = this.scoring.correctness * this.result.correctness;

    this.score.lives = this.scoring.lives * this.result.lives;

    this.score.quick = this.scoring.quick * this.result.quick;

    this.score.slow = this.scoring.slow * this.result.slow;

    this.score.total =
      this.score.correctness +
      this.score.quick +
      this.score.slow +
      this.score.lives;
  }
}
