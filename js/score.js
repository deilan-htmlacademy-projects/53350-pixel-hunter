import {Result} from "./domain/answer-rank";

const correctScore = Object.freeze({
  CORRECT: 100,
  INCORRECT: 0
});

const SUB_MIN_ANSWERS_SCORE = -1;
const MIN_ANSWERS_COUNT = 10;
const LIVE_SCORE = 50;

const SpeedScore = Object.freeze({
  SLOW: -50,
  AVERAGE: 0,
  QUICK: 50
});

const SpeedTime = Object.freeze({
  SLOW: 20,
  QUICK: 10
});

export function getAnswerRank(answer) {
  if (!answer.isCorrect) {
    return Result.WRONG;
  }

  if (answer.time < SpeedTime.QUICK) {
    return Result.QUICK;
  }

  if (answer.time > SpeedTime.SLOW) {
    return Result.SLOW;
  }

  return Result.CORRECT;
}

export function calculateScore(answers, livesCount) {
  verifyAnswers(answers);
  verifyLivesCount(livesCount);

  if (answers.length < MIN_ANSWERS_COUNT) {
    return SUB_MIN_ANSWERS_SCORE;
  }

  return calculateAnswerTotalScore(answers) + calculateLivesScore(livesCount);
}

function calculateAnswerTotalScore(answers) {
  return answers.reduce((score, answer) => {
    return score + calculateAnswerScore(answer);
  }, 0);
}

function calculateAnswerScore(answer) {
  return answer.isCorrect
    ? correctScore.CORRECT + calculateAnswerSpeedScore(answer)
    : correctScore.INCORRECT;
}

function calculateAnswerSpeedScore(answer) {
  if (answer.time < SpeedTime.QUICK) {
    return SpeedScore.QUICK;
  }
  if (answer.time > SpeedTime.SLOW) {
    return SpeedScore.SLOW;
  }
  return SpeedScore.AVERAGE;
}

function calculateLivesScore(livesCount) {
  return livesCount * LIVE_SCORE;
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
