import ScreenView from "./common/screen";
import {getResult} from "./templates/result";

// Общая статистика по всем игрокам
export class StatsView extends ScreenView {
  constructor(game, gameResults) {
    super();
    this.game = game;
    this.gameResults = gameResults;
  }

  get _template() {
    return getResult(this.game, this.gameResults);
  }
}
