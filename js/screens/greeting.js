import {GreetingView} from "../views/greeting";
import App from "../app";

export default class GreetingScreen {
  constructor(game) {
    this.game = game;
    this.view = new GreetingView(this.game);
    this.view.eventEmitter.on(`next`, () => App.showRules());
  }
}
