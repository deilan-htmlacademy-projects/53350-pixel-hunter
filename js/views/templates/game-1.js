export function getGameQuestion1(question) {
  return `<p class="game__task">${question.question}</p>
  <form class="game__content game__content--wide">
    ${getOption(question.answers[0].image, 0)}
  </form>`;
}

function getOption(image, index) {
  return `<div class="game__option">
    <img src="${image.url}"
      alt="${image.description}"
      width="${image.width}"
      height="${image.height}">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
      <span>Рисунок</span>
    </label>
  </div>`;
}
