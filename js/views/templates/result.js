import {getHeader} from "./header";
import {getStats} from "./stats";

export const getResult = (game, gameResults) => {
  return `${getHeader(game)}
  <section class="result">
    <h2 class="result__title">
      ${game.isWin() ? `Победа!` : `Поражение!`}
    </h2>
    ${getResultTables(gameResults)}
  </section>`;
};

const getResultTables = (gameResults) => {
  return gameResults
    .map((gameResult, index) => getResultTable(gameResult, index))
    .join(` `);
};

const getResultTable = (gameResult, index) => {
  return `<table class="result__table">
    ${getGeneral(gameResult, index)}
    ${getSpeed(gameResult)}
    ${getLives(gameResult)}
    ${getSlow(gameResult)}
    ${getTotal(gameResult)}
  </table>`;
};

const getGeneral = (gameResult, index) => {
  return `<tr>
    <td class="result__number">${index + 1}.</td>
    <td colspan="2">
      ${getStats(gameResult.stats)}
    </td>
    <td class="result__points">× ${gameResult.getCorrectPoints()}</td>
    <td class="result__total">
      ${gameResult.isWin() ? gameResult.getCorrectTotal() : `Fail`}
    </td>
  </tr>`;
};

const getSpeed = (gameResult) => {
  return `<tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">
      ${gameResult.getQuickCount()}
      <span class="stats__result stats__result--fast"></span>
    </td>
    <td class="result__points">× ${gameResult.getQuickPoints()}</td>
    <td class="result__total">${gameResult.getQuickTotal()}</td>
  </tr>`;
};

const getLives = (gameResult) => {
  return `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">
      ${gameResult.getLivesCount()}
      <span class="stats__result stats__result--alive"></span>
    </td>
    <td class="result__points">× ${gameResult.getLivesPoints()}</td>
    <td class="result__total">${gameResult.getLivesTotal()}</td>
  </tr>`;
};

const getSlow = (gameResult) => {
  return `<tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">
      ${gameResult.getSlowCount()}
      <span class="stats__result stats__result--slow"></span>
    </td>
    <td class="result__points">× ${gameResult.getSlowPoints()}</td>
    <td class="result__total">${gameResult.getSlowTotal()}</td>
  </tr>`;
};

const getTotal = (gameResult) => {
  return `<tr>
    <td colspan="5" class="result__total result__total--final">
    ${gameResult.getFinalTotal()}
    </td>
  </tr>`;
};
