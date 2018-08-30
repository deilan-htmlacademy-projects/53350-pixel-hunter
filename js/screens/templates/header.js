import {getBackButton} from "./back-button";
import {getGameLives} from "./game-lives";

export function getHeader(game, {showState} = {}) {
  return `<header class="header">
    ${getBackButton()}
    ${showState ? getGameTimer(game) + ` ` + getGameLives(game) : ``}
  </header>`;
}

export function getGameTimer(game) {
  return `<div class="game__timer">${game.state.time}</div>`;
}
