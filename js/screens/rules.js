import App from "../app";
import {RulesView} from "../views/rules";

export default class RulesScreen {
  constructor(game) {
    this.game = game;
    this.view = new RulesView(this.game);

    this.view.eventEmitter.on(`submit`, ({name}) => {
      this.game.name = name;
      App.showGame();
    });

    this.view.eventEmitter.on(`reset`, () => {
      App.showIntro();
    });
  }
}
