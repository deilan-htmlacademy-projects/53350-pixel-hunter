import {getHeader} from "./header";
import {getStats} from "./stats-current";

// Общая статистика по всем игрокам
export function getResult(game) {
  return `${getHeader(game)}
  <section class="result">
    <h2 class="result__title">${game.result.title}</h2>
    ${getResultTable(game)}
  </section>`;
}

function getResultTable(game) {
  return `<table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        ${getStats(game)}
      </td>
      <td class="result__points">× ${game.result.pointsCorrect}</td>
      <td class="result__total">${game.result.totalCorrect}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${game.result.quick} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× ${game.result.pointsQuick}</td>
      <td class="result__total">${game.result.totalQuick}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${game.result.lives} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× ${game.result.pointsLives}</td>
      <td class="result__total">${game.result.totalLives}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${game.result.slow} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× ${game.result.pointsSlow}</td>
      <td class="result__total">-${game.result.totalSlow}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${game.result.total}</td>
    </tr>
  </table>`;
}
