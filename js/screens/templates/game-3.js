// Игровой экран с тремя изображениями
export function getGameChallenge3(challenge) {
  return `<p class="game__task">${challenge.task}</p>
  <form class="game__content game__content--triple">
    ${challenge.options.map((option) => getOption(option)).join(` `)}
  </form>`;
}

function getOption(option) {
  return `<div class="game__option" data-type="${option.type}">
    <img src="${option.image.url}"
      alt="${option.image.description}"
      width="${option.image.width}"
      height="${option.image.height}">
  </div>`;
}
