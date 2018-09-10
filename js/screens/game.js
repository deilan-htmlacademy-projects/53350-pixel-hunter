import App from "../app";
import {Game1View} from "../views/game/game-1";
import {CHALLENGE_TYPES} from "../data/challenges";
import {Game2View} from "../views/game/game-2";
import {Game3View} from "../views/game/game-3";

const CHALLENGE_GAME_SCREEN_MAP = {
  [CHALLENGE_TYPES.FIRST]: Game1View,
  [CHALLENGE_TYPES.SECOND]: Game2View,
  [CHALLENGE_TYPES.THIRD]: Game3View
};

export default class GameScreen {
  constructor(game, challengeId) {
    this.game = game;
    const challenge = this.game.challenges[challengeId - 1];

    this.view = new CHALLENGE_GAME_SCREEN_MAP[challenge.type](
        this.game,
        challenge
    );

    this.view.answerEventEmitter.on((answer) => {
      this.game.setAnswer(answer);

      if (this.game.isOver()) {
        App.showStats();
      } else {
        App.showGame(challengeId + 1);
      }
    });

    this.view.resetEventEmitter.on(() => {
      App.showIntro();
    });
  }
}
