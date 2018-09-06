import ScreenView from "./common/screen";
import {getResult} from "./templates/result";
import {getGameResult} from "../domain/game-result";
import {getGameScore} from "../domain/game-score";

// Общая статистика по всем игрокам
export class StatsScreen extends ScreenView {
  constructor(game) {
    super();
    game.result = getGameResult(game);
    game.score = getGameScore(game);
    this.game = game;
  }

  get _template() {
    return getResult(this.game);
  }
}
