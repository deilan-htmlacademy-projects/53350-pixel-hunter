import {IntroScreen} from "./screens/intro";
import {GreetingScreen} from "./screens/greeting";
import {RulesScreen} from "./screens/rules";
import {Game1Screen} from "./screens/game-1";
import {Game2Screen} from "./screens/game-2";
import {Game3Screen} from "./screens/game-3";
import {StatsScreen} from "./screens/stats";

import {Slider} from "./slider";
import {createPaginator} from "./utils/dom/paginator";
import {createKeydownHandler} from "./utils/dom/keyboard";

const INITIAL_SLIDE = 0;

const KEY_CODES = Object.freeze({
  ARROW_LEFT: `ArrowLeft`,
  ARROW_RIGHT: `ArrowRight`
});

const screens = [
  new IntroScreen(),
  new GreetingScreen(),
  new RulesScreen(),
  new Game1Screen(),
  new Game2Screen(),
  new Game3Screen(),
  new StatsScreen()
];

const mainEl = document.querySelector(`#main`);

const slider = new Slider(mainEl, screens);
const prevHandler = slider.prev.bind(slider);
const nextHandler = slider.next.bind(slider);

const paginator = createPaginator({prevHandler, nextHandler});
document.body.appendChild(paginator);

const keydownHandler = createKeydownHandler({
  [KEY_CODES.ARROW_LEFT]: prevHandler,
  [KEY_CODES.ARROW_RIGHT]: nextHandler
});
document.addEventListener(`keydown`, keydownHandler);

slider.select(INITIAL_SLIDE);
