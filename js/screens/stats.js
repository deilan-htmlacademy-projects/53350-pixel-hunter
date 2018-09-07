import {StatsView} from "../views/stats";

export default class StatsScreen {
  constructor(game) {
    this.game = game;
    this.game.getGameResult();
    this.game.getGameScore();
    this.view = new StatsView(this.game);
  }
}
