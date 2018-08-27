const CORRECTNESS_SCORE = Object.freeze({
  INCORRECT: 0,
  CORRECT: 100
});

const SPEED_SCORE = Object.freeze({
  SLOW: -50,
  AVERAGE: 0,
  QUICK: 50
});

const SPEED_TIME = Object.freeze({
  SLOW: 20,
  QUICK: 10
});

export function calculateScore(answers, livesCount) {
  verifyAnswers(answers);
  verifyLivesCount(livesCount);
  if (answers.length < 10) {
    return -1;
  }
  return calculateAnswerTotalScore(answers) + calculateLivesScore(livesCount);
}

function calculateAnswerTotalScore(answers) {
  return answers.reduce((score, answer) => {
    score += calculateAnswerScore(answer);
    return score;
  }, 0);
}

function calculateAnswerScore(answer) {
  return answer.isCorrect
    ? CORRECTNESS_SCORE.CORRECT + calculateAnswerSpeedScore(answer)
    : CORRECTNESS_SCORE.INCORRECT;
}

function calculateAnswerSpeedScore(answer) {
  if (answer.time < SPEED_TIME.QUICK) {
    return SPEED_SCORE.QUICK;
  }
  if (answer.time > SPEED_TIME.SLOW) {
    return SPEED_SCORE.SLOW;
  }
  return SPEED_SCORE.AVERAGE;
}

function calculateLivesScore(livesCount) {
  return livesCount * 50;
}

function verifyAnswers(answers) {
  if (
    !Array.isArray(answers) ||
    !answers.every((answer) => {
      const keys = Object.keys(answer);
      return keys.includes(`isCorrect`) && keys.includes(`time`);
    })
  ) {
    throw new Error(
        `answers must be an array of objects with props: 'isCorrect', 'time'`
    );
  }
}

function verifyLivesCount(livesCount) {
  if (!Number.isInteger(livesCount)) {
    throw new Error(`livesCount must be an integer number`);
  }
}
