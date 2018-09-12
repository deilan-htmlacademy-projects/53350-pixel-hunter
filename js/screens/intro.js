import {IntroView} from "../views/intro";
import App from "../app";

export default class IntroScreen {
  constructor(game) {
    this.game = game;
    this.view = new IntroView();
    this.view.eventEmitter.on(`next`, () => App.showGreeting());
  }
}
