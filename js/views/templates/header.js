import {getBackButton} from "./back-button";

export function getHeader(game, {showState} = {showState: false}) {
  return `<header class="header">
    ${getBackButton()}
    ${showState ? getState(game) : ``}
  </header>`;
}

function getState(game) {
  return getGameTimer(game) + ` ` + getGameLives(game);
}

function getGameTimer(game) {
  return `<div class="game__timer">${game.state.time}</div>`;
}

function getGameLives(game) {
  return `<div class="game__lives">
    ${getHearts(game)}
  </div>`;
}

function getHearts(game) {
  return Array.from({length: game.rules.lives}, (_, i) =>
    getHeart(i + 1 <= game.state.lives)
  ).join(` `);
}

function getHeart(flag) {
  const src = flag ? `img/heart__full.svg` : `img/heart__empty.svg`;
  const alt = flag ? `Life` : `Missed Life`;
  return `<img src="${src}" class="game__heart" alt="${alt}" width="31" height="27">`;
}
