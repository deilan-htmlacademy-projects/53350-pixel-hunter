import IntroScreen from "./screens/intro";
import {render} from "./utils/dom/render";
import GreetingScreen from "./screens/greeting";
import StatsScreen from "./screens/stats";
import RulesScreen from "./screens/rules";
import GameScreen from "./screens/game";
import Game from "./domain/game";
import QuestionsRepository from "./data/questions-repository";
import {ErrorScreen} from "./screens/modal-error";

export default class App {
  static init(containerElement) {
    this.containerElement = containerElement;
  }

  static showIntro() {
    QuestionsRepository.getAll()
      .then((questions) => {
        this.game = Game.create(questions);
        this._renderScreen(new IntroScreen());
      })
      .catch((error) => this.showError(error));
  }

  static showGreeting() {
    this._renderScreen(new GreetingScreen(this.game));
  }

  static showRules() {
    this._renderScreen(new RulesScreen(this.game));
  }

  static showGame(questionId = 1) {
    this._renderScreen(new GameScreen(this.game, questionId));
  }

  static showStats() {
    this._renderScreen(new StatsScreen(this.game));
  }

  static showError(error) {
    this._renderScreen(new ErrorScreen(error));
  }

  static _renderScreen(screen) {
    render(this.containerElement, screen.view.element);
  }
}
