import {getBackButton} from "./back-button";

export const getHeader = (game, {showState} = {showState: false}) => {
  return `<header class="header">
    ${getBackButton()}
    ${showState ? getState(game) : ``}
  </header>`;
};

const getState = (game) => {
  return getGameTimer(game) + ` ` + getGameLives(game);
};

const getGameTimer = (game) => {
  return `<div class="game__timer">${game.state.time}</div>`;
};

const getGameLives = (game) => {
  return `<div class="game__lives">
    ${getHearts(game)}
  </div>`;
};

const getHearts = (game) => {
  return Array.from({length: game.rules.lives}, (_, i) =>
    getHeart(i + 1 <= game.state.lives)
  ).join(` `);
};

const getHeart = (flag) => {
  const src = flag ? `img/heart__full.svg` : `img/heart__empty.svg`;
  const alt = flag ? `Life` : `Missed Life`;
  return `<img src="${src}" class="game__heart" alt="${alt}" width="31" height="27">`;
};
