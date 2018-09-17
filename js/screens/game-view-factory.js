import {Game1View} from "../views/game/game-1";
import {QuestionType} from "../domain/question-type";
import {Game2View} from "../views/game/game-2";
import {Game3View} from "../views/game/game-3";

const CHALLENGE_GAME_SCREEN_MAP = {
  [QuestionType.TINDER_LIKE]: Game1View,
  [QuestionType.TWO_OF_TWO]: Game2View,
  [QuestionType.ONE_OF_THREE]: Game3View
};

export const createGameView = (game) => {
  const question = game.questions[game.state.questionIndex];
  return new CHALLENGE_GAME_SCREEN_MAP[question.type](game, question);
};
