import intro from './templates/intro';
import greeting from './templates/greeting';
import rules from './templates/rules';
import game1 from './templates/game-1';
import game2 from './templates/game-2';
import game3 from './templates/game-3';
import stats from './templates/stats';
import modalError from './templates/modal-error';
import modalConfirm from './templates/modal-confirm';

import {Slider} from './slider';
import {createPaginator} from './utils/dom/paginator';
import {createKeydownHandler} from './utils/dom/keyboard';

const INITIAL_SLIDE = 0;

const KEY_CODES = Object.freeze({
  ARROW_LEFT: `ArrowLeft`,
  ARROW_RIGHT: `ArrowRight`
});

const templateEls = [
  intro,
  greeting,
  rules,
  game1,
  game2,
  game3,
  stats,
  modalError,
  modalConfirm
];

const mainEl = document.querySelector(`#main`);

const slider = new Slider(mainEl, templateEls);
const prevHandler = slider.prev.bind(slider);
const nextHandler = slider.next.bind(slider);

const paginator = createPaginator(prevHandler, nextHandler);
const keydownHandler = createKeydownHandler({
  [KEY_CODES.ARROW_LEFT]: prevHandler,
  [KEY_CODES.ARROW_RIGHT]: nextHandler,
});
document.body.appendChild(paginator);
document.addEventListener(`keydown`, keydownHandler);

slider.select(INITIAL_SLIDE);
