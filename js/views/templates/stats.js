import {getAnswerRank} from "../../score";

export function getStats(game) {
  return `<ul class="stats">
    ${getResults(game)}
  </ul>`;
}

function getResults(game) {
  return Array.from({length: game.rules.challenges}, (_, i) =>
    getResult(game.answers[i])
  ).join(` `);
}

function getResult(answer) {
  const result = (answer && getAnswerRank(answer)) || `unknown`;
  return `<li class="stats__result stats__result--${result}"></li>`;
}
