import {IntroScreen} from "./screens/intro";
import {GreetingScreen} from "./screens/greeting";
import {RulesScreen} from "./screens/rules";
import {Game2Screen} from "./screens/game/game-2";
import {Game1Screen} from "./screens/game/game-1";
import {Game3Screen} from "./screens/game/game-3";
import {StatsScreen} from "./screens/stats";

import {Slider} from "./slider";
import {createPaginator} from "./utils/dom/paginator";
import {createKeydownHandler} from "./utils/dom/keyboard";
import {CHALLENGE_TYPES, getAllChallenges} from "./data/challenges";

const CHALLENGE_GAME_SCREEN_MAP = {
  [CHALLENGE_TYPES.FIRST]: Game1Screen,
  [CHALLENGE_TYPES.SECOND]: Game2Screen,
  [CHALLENGE_TYPES.THIRD]: Game3Screen
};

const INITIAL_GAME = Object.freeze({
  state: {
    lives: 3,
    time: 0
  },
  challenges: getAllChallenges(),
  result: {
    title: `Победа!`,
    stats: []
  },
  rules: {
    challenges: 10,
    lives: 3,
    time: 30
  }
});

const INITIAL_SLIDE = 0;

const KEY_CODES = Object.freeze({
  ARROW_LEFT: `ArrowLeft`,
  ARROW_RIGHT: `ArrowRight`
});

const gameScreens = INITIAL_GAME.challenges.map((challenge) => {
  return new CHALLENGE_GAME_SCREEN_MAP[challenge.type](INITIAL_GAME, challenge);
});

const screens = [
  new IntroScreen(INITIAL_GAME),
  new GreetingScreen(INITIAL_GAME),
  new RulesScreen(INITIAL_GAME),
  ...gameScreens,
  new StatsScreen(INITIAL_GAME)
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
