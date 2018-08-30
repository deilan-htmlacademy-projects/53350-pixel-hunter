import {Screen} from "./common/screen";
import {getResult} from "./templates/result";

export class StatsScreen extends Screen {
  constructor(game) {
    super(getResult(game));
  }
}
