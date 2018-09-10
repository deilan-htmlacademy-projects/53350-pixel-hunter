import IntroScreen from "./screens/intro";
import {render} from "./utils/dom/render";
import GreetingScreen from "./screens/greeting";
import StatsScreen from "./screens/stats";
import RulesScreen from "./screens/rules";
import GameScreen from "./screens/game";

export default class App {
  static init(container, game) {
    this.container = container;
    this.game = game;
  }

  static showIntro() {
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
    render(this.container, screen.view.element);
  }
}
