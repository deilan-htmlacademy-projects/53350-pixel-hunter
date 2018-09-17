import IntroScreen from "./screens/intro";
import {render} from "./utils/dom/render";
import GreetingScreen from "./screens/greeting";
import StatsScreen from "./screens/stats";
import RulesScreen from "./screens/rules";
import GameScreen from "./screens/game";
import Game from "./domain/game";
import QuestionsRepository from "./data/questions-repository";
import {ErrorScreen} from "./screens/modal-error";
import StatsRepository from "./data/stats-repository";
import {config} from "./config";
import GameResult from "./domain/game-result";

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

  static showGame() {
    this._renderScreen(new GameScreen(this.game));
  }

  static resetGame() {
    this.game.reset();
    this.showGreeting();
  }

  static showStats() {
    const postData = {
      stats: this.game.stats,
      lives: this.game.state.lives
    };
    StatsRepository.postResult(config.appId, this.game.playerName, postData)
      .then(() =>
        StatsRepository.getResults(config.appId, this.game.playerName)
      )
      .then((res) => {
        const gameResults = res.map(
            (x) => new GameResult(x, this.game.rules, this.game.scoring)
        );
        this._renderScreen(new StatsScreen(this.game, gameResults));
      })
      .catch((error) => this.showError(error));
  }

  static showError(error) {
    this._renderScreen(new ErrorScreen(error));
  }

  static _renderScreen(screen) {
    render(this.containerElement, screen.view.element);
  }
}
