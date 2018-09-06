import {IntroView} from "./views/intro";
import {GreetingScreen} from "./views/greeting";
import {RulesScreen} from "./views/rules";
import {Game1Screen} from "./views/game/game-1";
import {Game2Screen} from "./views/game/game-2";
import {Game3Screen} from "./views/game/game-3";
import {StatsScreen} from "./views/stats";

import {Slider} from "./slider";
import {createPaginator} from "./utils/dom/paginator";
import {createKeydownHandler} from "./utils/dom/keyboard";
import {CHALLENGE_TYPES, getAllChallenges} from "./data/challenges";
import {scoring} from "./data/scoring";

const CHALLENGE_GAME_SCREEN_MAP = {
  [CHALLENGE_TYPES.FIRST]: Game1Screen,
  [CHALLENGE_TYPES.SECOND]: Game2Screen,
  [CHALLENGE_TYPES.THIRD]: Game3Screen
};

const INITIAL_GAME = {
  state: {
    lives: 3,
    time: 0
  },
  challenges: getAllChallenges(),
  answers: [],
  result: {
    title: ``,
    stats: [],
    correctness: 0,
    quick: 0,
    lives: 0,
    slow: 0
  },
  score: {
    correctness: 0,
    quick: 0,
    lives: 0,
    slow: 0,
    total: 0
  },
  scoring,
  rules: {
    challenges: 10,
    lives: 3,
    time: 30
  }
};

const INITIAL_SLIDE = 0;

const KEY_CODES = Object.freeze({
  ARROW_LEFT: `ArrowLeft`,
  ARROW_RIGHT: `ArrowRight`
});

const gameScreens = getAllChallenges().map((challenge) => {
  return (game) => new CHALLENGE_GAME_SCREEN_MAP[challenge.type](game, challenge);
});

const screens = [
  (game) => new IntroView(game),
  (game) => new GreetingScreen(game),
  (game) => new RulesScreen(game),
  ...gameScreens,
  (game) => new StatsScreen(game)
];

const mainEl = document.querySelector(`#main`);

const slider = new Slider(mainEl, screens, INITIAL_GAME);
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
