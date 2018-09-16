export const getStats = (stats) => {
  return `<ul class="stats">
    ${getResults(stats)}
  </ul>`;
};

const getResults = (stats) => {
  return stats.map((statsItem) => getResult(statsItem)).join(` `);
};

const getResult = (statsItem = `unknown`) => {
  return `<li class="stats__result stats__result--${statsItem}"></li>`;
};
