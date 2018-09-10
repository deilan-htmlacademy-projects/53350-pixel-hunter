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
    this._name = ``;
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

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
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
      isCorrect: challenge.options.reduce((isCorrect, c, index) => {
        return isCorrect && answer.options[index] === c.type;
      }, true),
      time: answer.time
    };

    this.answers.push(result);
    this.adjustLives(result);
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
        (stat) => stat.result === ANSWER_RANK.CORRECT
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
