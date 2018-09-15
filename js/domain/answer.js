import {Result} from "./answer-rank";
import {SpeedTime} from "./speed-time";

export default class Answer {
  constructor(isCorrect, time) {
    this.isCorrect = isCorrect;
    this.time = time;
  }

  getResultType() {
    if (!this.isCorrect) {
      return Result.WRONG;
    }

    if (this.time < SpeedTime.QUICK) {
      return Result.QUICK;
    }

    if (this.time > SpeedTime.SLOW) {
      return Result.SLOW;
    }

    return Result.CORRECT;
  }
}
