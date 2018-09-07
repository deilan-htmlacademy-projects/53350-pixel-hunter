
import {getAllChallenges} from "./data/challenges";
import {scoring} from "./data/scoring";
import Game from "./domain/game";
import {rules} from "./data/rules";
import App from "./app";

const challenges = getAllChallenges();

const game = new Game(rules, challenges, scoring);

const mainEl = document.querySelector(`#main`);
App.init(mainEl, game);
App.showIntro();
