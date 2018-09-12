import ScreenView from "./common/screen";
import {getResult} from "./templates/result";

// Общая статистика по всем игрокам
export class StatsView extends ScreenView {
  constructor(game) {
    super();
    this.game = game;
  }

  get _template() {
    return getResult(this.game);
  }
}
