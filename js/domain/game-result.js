import {Result} from "./answer-rank";

export default class GameResult {
  constructor({lives, stats}, rules, scoring) {
    this.lives = lives;
    this.rules = rules;
    this.stats = Array.from(
        {length: this.rules.questions},
        (_, i) => stats[i] || Result.UNKNOWN
    );
    this.scoring = scoring;
  }

  _getStatsLength(statsItemPredicate) {
    return this.stats.filter(statsItemPredicate).length;
  }

  getCorrectPoints() {
    return this.scoring.correct;
  }

  getCorrectCount() {
    return this._getStatsLength(
        (statsItem) => statsItem !== Result.WRONG && statsItem !== Result.UNKNOWN
    );
  }

  getCorrectTotal() {
    return this.getCorrectCount() * this.getCorrectPoints();
  }

  getQuickPoints() {
    return this.scoring.quick;
  }

  getQuickCount() {
    return this._getStatsLength((statsItem) => statsItem === Result.QUICK);
  }

  getQuickTotal() {
    return this.getQuickCount() * this.getQuickPoints();
  }

  getSlowPoints() {
    return this.scoring.slow;
  }

  getSlowCount() {
    return this._getStatsLength((statsItem) => statsItem === Result.SLOW);
  }

  getSlowTotal() {
    return this.getSlowCount() * this.getSlowPoints();
  }

  getLivesPoints() {
    return this.scoring.lives;
  }

  getLivesCount() {
    return this.lives;
  }

  getLivesTotal() {
    return this.getLivesCount() * this.getLivesPoints();
  }

  getFinalTotal() {
    return (
      this.getCorrectTotal() +
      this.getQuickTotal() +
      this.getLivesTotal() +
      this.getSlowTotal()
    );
  }
}
