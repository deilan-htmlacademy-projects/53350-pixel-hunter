export const getGameQuestion2 = (question) => {
  return `<p class="game__task">${question.question}</p>
  <form class="game__content">
    ${question.answers.map((option, index) => getOption(option.image, index)).join(` `)}
  </form>`;
};

const getOption = (image, index) => {
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
};
