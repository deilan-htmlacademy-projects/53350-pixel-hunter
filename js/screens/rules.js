import App from "../app";
import {RulesView} from "../views/rules";

export default class RulesScreen {
  constructor(game) {
    this.game = game;
    this.view = new RulesView(this.game);
    this.view.nameInputEventEmitter.on((name) => {
      this.game.name = name;
    });
    this.view.nextEventEmitter.on(() => {
      App.showGame();
    });
    this.view.resetEventEmitter.on(() => {
      App.showIntro();
    });
  }
}
