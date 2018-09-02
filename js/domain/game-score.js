export function getGameScore(game) {
  const score = {};
  score.correctness = game.scoring.correctness * game.result.correctness;

  score.lives = game.scoring.lives * game.result.lives;

  score.quick = game.scoring.quick * game.result.quick;

  score.slow = game.scoring.slow * game.result.slow;

  score.total = score.correctness + score.quick + score.slow + score.lives;
  return score;
}
