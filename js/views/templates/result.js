import {getHeader} from "./header";
import {getStats} from "./stats";

export function getResult(game) {
  return `${getHeader(game)}
  <section class="result">
    <h2 class="result__title">${game.result.title}</h2>
    ${getResultTable(game)}
  </section>`;
}

function getResultTable(game) {
  return `<table class="result__table">
    ${getGeneral(game)}
    ${getSpeed(game)}
    ${getLives(game)}
    ${getSlow(game)}
    ${getTotal(game)}
  </table>`;
}

function getGeneral(game) {
  return `<tr>
    <td class="result__number">1.</td>
    <td colspan="2">
      ${getStats(game)}
    </td>
    <td class="result__points">× ${game.scoring.correctness}</td>
    <td class="result__total">${game.score.correctness}</td>
  </tr>`;
}

function getSpeed(game) {
  return `<tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${game.result.quick} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× ${game.scoring.quick}</td>
    <td class="result__total">${game.score.quick}</td>
  </tr>`;
}

function getLives(game) {
  return `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${game.result.lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× ${game.scoring.lives}</td>
    <td class="result__total">${game.score.lives}</td>
  </tr>`;
}

function getSlow(game) {
  return `<tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${game.result.slow} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× ${game.scoring.slow}</td>
    <td class="result__total">-${game.score.slow}</td>
  </tr>`;
}

function getTotal(game) {
  return `<tr>
    <td colspan="5" class="result__total result__total--final">${game.score.total}</td>
  </tr>`;
}
