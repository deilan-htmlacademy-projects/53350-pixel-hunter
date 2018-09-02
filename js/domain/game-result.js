import {getAnswerRank} from "../score";
import {ANSWER_RANK} from "./answer-rank";

export function getGameResult(game) {
  const result = {};
  result.stats = game.answers.map((answer) => ({
    result: getAnswerRank(answer)
  }));
  result.correctness = result.stats.filter(
      (stat) => stat.result === ANSWER_RANK.CORRECT
  ).length;
  result.quick = result.stats.filter(
      (stat) => stat.result === ANSWER_RANK.QUICK
  ).length;
  result.slow = result.stats.filter(
      (stat) => stat.result === ANSWER_RANK.SLOW
  ).length;
  result.lives = game.state.lives;
  result.title = result.lives > 0
    ? `Победа!`
    : `Поражение!`;
  return result;
}
