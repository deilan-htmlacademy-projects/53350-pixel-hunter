import {ANSWER_RANK} from "./domain/answer-rank";

const CORRECTNESS_SCORE = Object.freeze({
  INCORRECT: 0,
  CORRECT: 100
});

const SUB_MIN_ANSWERS_SCORE = -1;
const MIN_ANSWERS_COUNT = 10;
const LIVE_SCORE = 50;

const SPEED_SCORE = Object.freeze({
  SLOW: -50,
  AVERAGE: 0,
  QUICK: 50
});

const SPEED_TIME = Object.freeze({
  SLOW: 20,
  QUICK: 10
});

export function getAnswerRank(answer) {
  if (!answer.isCorrect) {
    return ANSWER_RANK.WRONG;
  }

  if (answer.time < SPEED_TIME.QUICK) {
    return ANSWER_RANK.QUICK;
  }

  if (answer.time > SPEED_TIME.SLOW) {
    return ANSWER_RANK.SLOW;
  }

  return ANSWER_RANK.CORRECT;
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
