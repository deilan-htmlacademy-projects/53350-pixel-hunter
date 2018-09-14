import {images} from "./images";
import {getRandomItem} from "../utils/random";

export const AnswerType = Object.freeze({
  PHOTO: `photo`,
  PAINTING: `painting`
});

export const QuestionType = Object.freeze({
  TINDER_LIKE: `tinder-like`,
  TWO_OF_TWO: `two-of-two`,
  ONE_OF_THREE: `one-of-three`
});

export function getAllQuestions() {
  return [
    {
      id: 1,
      type: QuestionType.TINDER_LIKE,
      question: `Угадай, фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        }
      ]
    },
    {
      id: 2,
      type: QuestionType.TWO_OF_TWO,
      question: `Угадайте для каждого изображения фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 468,
            height: 458,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 468,
            height: 458,
            description: `Option 2`,
          },
          type: AnswerType.PAINTING
        }
      ]
    },
    {
      id: 3,
      type: QuestionType.ONE_OF_THREE,
      question: `Найдите рисунок среди изображений`,
      answers: [
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 304,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PAINTING
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 2`,
          },
          type: AnswerType.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 3`,
          },
          type: AnswerType.PHOTO
        }
      ]
    },
    {
      id: 4,
      type: QuestionType.TINDER_LIKE,
      question: `Угадай, фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        }
      ]
    },
    {
      id: 5,
      type: QuestionType.TWO_OF_TWO,
      question: `Угадайте для каждого изображения фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 468,
            height: 458,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 468,
            height: 458,
            description: `Option 2`,
          },
          type: AnswerType.PAINTING
        }
      ]
    },
    {
      id: 6,
      type: QuestionType.ONE_OF_THREE,
      question: `Найдите рисунок среди изображений`,
      answers: [
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 304,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PAINTING
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 2`,
          },
          type: AnswerType.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 3`,
          },
          type: AnswerType.PHOTO
        }
      ]
    },
    {
      id: 7,
      type: QuestionType.TINDER_LIKE,
      question: `Угадай, фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        }
      ]
    },
    {
      id: 8,
      type: QuestionType.TWO_OF_TWO,
      question: `Угадайте для каждого изображения фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 468,
            height: 458,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 468,
            height: 458,
            description: `Option 2`,
          },
          type: AnswerType.PAINTING
        }
      ]
    },
    {
      id: 9,
      type: QuestionType.ONE_OF_THREE,
      question: `Найдите рисунок среди изображений`,
      answers: [
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 304,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PAINTING
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 2`,
          },
          type: AnswerType.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 3`,
          },
          type: AnswerType.PHOTO
        }
      ]
    },
    {
      id: 10,
      type: QuestionType.TINDER_LIKE,
      question: `Угадай, фото или рисунок?`,
      answers: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: AnswerType.PHOTO
        }
      ]
    }
  ];
}
