import {assert} from "chai";
import {calculateScore} from "./score";

describe(`Calculate score `, () => {
  it(`returns -1 for less than 10 answers`, () => {
    const answers = [createAnswer(true, 10), createAnswer(true, 20)];
    assert.equal(calculateScore(answers, 1), -1);
  });

  it(`returns 1150 for 10 regular correct answers and 3 lives`, () => {
    const answers = [
      createAnswer(true, 11),
      createAnswer(true, 12),
      createAnswer(true, 13),
      createAnswer(true, 14),
      createAnswer(true, 15),
      createAnswer(true, 16),
      createAnswer(true, 17),
      createAnswer(true, 18),
      createAnswer(true, 19),
      createAnswer(true, 20)
    ];
    assert.equal(calculateScore(answers, 3), 1150);
  });

  it(`returns 1600 for 10 fast correct answers and 2 lives`, () => {
    const answers = [
      createAnswer(true, 1),
      createAnswer(true, 2),
      createAnswer(true, 3),
      createAnswer(true, 4),
      createAnswer(true, 5),
      createAnswer(true, 6),
      createAnswer(true, 7),
      createAnswer(true, 8),
      createAnswer(true, 9),
      createAnswer(true, 0)
    ];
    assert.equal(calculateScore(answers, 2), 1600);
  });

  it(`returns 550 for 10 slow correct answers and 1 lives`, () => {
    const answers = [
      createAnswer(true, 21),
      createAnswer(true, 22),
      createAnswer(true, 23),
      createAnswer(true, 24),
      createAnswer(true, 25),
      createAnswer(true, 26),
      createAnswer(true, 27),
      createAnswer(true, 28),
      createAnswer(true, 29),
      createAnswer(true, 30)
    ];
    assert.equal(calculateScore(answers, 1), 550);
  });

  it(`returns 850 for 2 fast, 3 regular and 5 slow correct answers and 0 lives`, () => {
    const answers = [
      createAnswer(true, 1),
      createAnswer(true, 2),
      createAnswer(true, 13),
      createAnswer(true, 14),
      createAnswer(true, 15),
      createAnswer(true, 26),
      createAnswer(true, 27),
      createAnswer(true, 28),
      createAnswer(true, 29),
      createAnswer(true, 30)
    ];
    assert.equal(calculateScore(answers, 0), 850);
  });

  it(`returns 850 for 5 regular correct and 5 incorrect answers and 3 lives`, () => {
    const answers = [
      createAnswer(true, 11),
      createAnswer(true, 12),
      createAnswer(true, 13),
      createAnswer(true, 14),
      createAnswer(true, 15),
      createAnswer(false, 26),
      createAnswer(false, 27),
      createAnswer(false, 28),
      createAnswer(false, 29),
      createAnswer(false, 30)
    ];
    assert.equal(calculateScore(answers, 3), 650);
  });

  it(`returns 2100 for 20 regular correct answers and 2 lives`, () => {
    const answers = [
      createAnswer(true, 11),
      createAnswer(true, 12),
      createAnswer(true, 13),
      createAnswer(true, 14),
      createAnswer(true, 15),
      createAnswer(true, 16),
      createAnswer(true, 17),
      createAnswer(true, 18),
      createAnswer(true, 19),
      createAnswer(true, 20),
      createAnswer(true, 11),
      createAnswer(true, 12),
      createAnswer(true, 13),
      createAnswer(true, 14),
      createAnswer(true, 15),
      createAnswer(true, 16),
      createAnswer(true, 17),
      createAnswer(true, 18),
      createAnswer(true, 19),
      createAnswer(true, 20)
    ];
    assert.equal(calculateScore(answers, 2), 2100);
  });

  it(`throws if answers is not an array of valid objects`, () => {
    assert.throws(() => calculateScore([undefined], 0));
    assert.throws(() => calculateScore([null], 1));
    assert.throws(() => calculateScore([false], 2));
    assert.throws(() => calculateScore([0], 3));
    assert.throws(() => calculateScore([`answer`], 4));
    assert.throws(() => calculateScore([{}], 5));
    assert.throws(() => calculateScore([Symbol()], 6));
  });
});

function createAnswer(isCorrect, time) {
  return {
    isCorrect,
    time
  };
}
