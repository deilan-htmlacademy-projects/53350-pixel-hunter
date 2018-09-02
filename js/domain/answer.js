export function adjustLives(game, answer) {
  if (!answer.isCorrect) {
    game.state.lives -= 1;
  }
}
