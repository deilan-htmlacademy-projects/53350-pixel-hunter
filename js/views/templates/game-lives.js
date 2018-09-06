export function getGameLives(game) {
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
