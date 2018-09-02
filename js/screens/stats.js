import {Screen} from "./common/screen";
import {getResult} from "./templates/result";
import {getGameResult} from "../domain/game-result";
import {getGameScore} from "../domain/game-score";

export class StatsScreen extends Screen {
  constructor(game) {
    game.result = getGameResult(game);
    game.score = getGameScore(game);
    super(getResult(game));
  }
}
