// Игровой экран с тремя изображениями
export function getGameChallenge3(challenge) {
  return `<p class="game__task">${challenge.task}</p>
  <form class="game__content game__content--triple">
    ${challenge.options.map((option) => getOption(option)).join(` `)}
  </form>`;
}

function getOption(option) {
  return `<div class="game__option">
    <img src="${option.imageUrl}"
      alt="${option.title}"
      width="${option.width}"
      height="${option.height}">
  </div>`;
}
