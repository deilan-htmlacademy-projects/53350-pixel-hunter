export function getStats(stats) {
  return `<ul class="stats">
    ${getResults(stats)}
  </ul>`;
}

function getResults(stats) {
  return stats.map((statsItem) => getResult(statsItem)).join(` `);
}

function getResult(statsItem = `unknown`) {
  return `<li class="stats__result stats__result--${statsItem}"></li>`;
}
