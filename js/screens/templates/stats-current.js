export function getStats(game) {
  return `<ul class="stats">
    ${getResults(game)}
  </ul>`;
}

function getResults(game) {
  return Array.from({length: game.rules.challenges}, (_, i) =>
    getResult(game.result.stats[i])
  ).join(` `);
}

function getResult(stat) {
  const result = stat && stat.result || `unknown`;
  return `<li class="stats__result stats__result--${result}"></li>`;
}
