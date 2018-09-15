import {StatsView} from "../views/stats";
import App from "../app";

export default class StatsScreen {
  constructor(game, gameResults) {
    this.game = game;
    this.gameResults = gameResults;
    this.view = new StatsView(this.game, gameResults);

    this.view.eventEmitter.on(`reset`, () => {
      App.showIntro();
    });
  }
}
