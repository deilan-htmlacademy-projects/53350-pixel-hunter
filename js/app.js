import IntroScreen from "./screens/intro";
import {render} from "./utils/dom/render";
import GreetingScreen from "./screens/greeting";
import StatsScreen from "./screens/stats";
import RulesScreen from "./screens/rules";
import GameScreen from "./screens/game";
import Game from "./domain/game";

export default class App {
  static init(containerElement) {
    this.containerElement = containerElement;
  }

  static showIntro() {
    this.game = Game.create();
    this._renderScreen(new IntroScreen());
  }

  static showGreeting() {
    this._renderScreen(new GreetingScreen(this.game));
  }

  static showRules() {
    this._renderScreen(new RulesScreen(this.game));
  }

  static showGame(challengeId = 1) {
    this._renderScreen(new GameScreen(this.game, challengeId));
  }

  static showStats() {
    this._renderScreen(new StatsScreen(this.game));
  }

  static _renderScreen(screen) {
    render(this.containerElement, screen.view.element);
  }
}
