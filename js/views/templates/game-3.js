export const getGameQuestion3 = (question) => {
  return `<p class="game__task">${question.question}</p>
  <form class="game__content game__content--triple">
    ${question.answers.map((option) => getOption(option)).join(` `)}
  </form>`;
};

const getOption = (option) => {
  return `<div class="game__option">
    <img src="${option.image.url}"
      alt="${option.image.description}"
      width="${option.image.width}"
      height="${option.image.height}">
  </div>`;
};
