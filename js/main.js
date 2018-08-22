"use strict";

const INITIAL_SLIDE = 0;

const KEY_CODES = Object.freeze({
  ARROW_LEFT: `ArrowLeft`,
  ARROW_RIGHT: `ArrowRight`
});

const TEMPLATES_IDS = [
  `intro`,
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`,
  `modal-error`,
  `modal-confirm`
];

const mainEl = document.querySelector(`#main`);
const templateEls = window.getTemplates(TEMPLATES_IDS);

const slider = new window.Slider(mainEl, templateEls);
const prevHandler = slider.prev.bind(slider);
const nextHandler = slider.next.bind(slider);

const paginator = window.createPaginator(prevHandler, nextHandler);
const keydownHandler = window.createKeydownHandler({
  [KEY_CODES.ARROW_LEFT]: prevHandler,
  [KEY_CODES.ARROW_RIGHT]: nextHandler,
});
document.body.appendChild(paginator);
document.addEventListener(`keydown`, keydownHandler);

slider.select(INITIAL_SLIDE);
