// Игровой экран с двумя изображениями
export function getGameChallenge2(challenge) {
  return `<p class="game__task">${challenge.task}</p>
  <form class="game__content">
    ${challenge.options.map((option, index) => getOption(option, index)).join(` `)}
  </form>`;
}

function getOption(option, index) {
  return `<div class="game__option">
    <img src="${option.imageUrl}"
      alt="${option.title}"
      width="${option.width}"
      height="${option.height}">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
}
