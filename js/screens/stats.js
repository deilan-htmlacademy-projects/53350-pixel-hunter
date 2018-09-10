import {StatsView} from "../views/stats";
import App from "../app";

export default class StatsScreen {
  constructor(game) {
    this.game = game;
    this.game.getGameResult();
    this.game.getGameScore();
    this.view = new StatsView(this.game);

    this.view.eventEmitter.on(`reset`, () => {
      App.showIntro();
    });
  }
}
