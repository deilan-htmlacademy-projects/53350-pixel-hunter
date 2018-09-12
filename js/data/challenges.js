import {images} from "./images";
import {getRandomItem} from "../utils/random";

export const IMAGE_TYPES = Object.freeze({
  PHOTO: `photo`,
  PAINTING: `paint`
});

export const CHALLENGE_TYPES = {
  FIRST: `1`,
  SECOND: `2`,
  THIRD: `3`
};

export function getAllChallenges() {
  return [
    {
      id: 1,
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      id: 2,
      type: CHALLENGE_TYPES.SECOND,
      task: `Угадайте для каждого изображения фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 468,
            height: 458,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 468,
            height: 458,
            description: `Option 2`,
          },
          type: IMAGE_TYPES.PAINTING
        }
      ]
    },
    {
      id: 3,
      type: CHALLENGE_TYPES.THIRD,
      task: `Найдите рисунок среди изображений`,
      options: [
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 304,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PAINTING
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 2`,
          },
          type: IMAGE_TYPES.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 3`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      id: 4,
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      id: 5,
      type: CHALLENGE_TYPES.SECOND,
      task: `Угадайте для каждого изображения фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 468,
            height: 458,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 468,
            height: 458,
            description: `Option 2`,
          },
          type: IMAGE_TYPES.PAINTING
        }
      ]
    },
    {
      id: 6,
      type: CHALLENGE_TYPES.THIRD,
      task: `Найдите рисунок среди изображений`,
      options: [
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 304,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PAINTING
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 2`,
          },
          type: IMAGE_TYPES.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 3`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      id: 7,
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      id: 8,
      type: CHALLENGE_TYPES.SECOND,
      task: `Угадайте для каждого изображения фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 468,
            height: 458,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 468,
            height: 458,
            description: `Option 2`,
          },
          type: IMAGE_TYPES.PAINTING
        }
      ]
    },
    {
      id: 9,
      type: CHALLENGE_TYPES.THIRD,
      task: `Найдите рисунок среди изображений`,
      options: [
        {
          image: {
            url: getRandomItem(images.paintings),
            width: 304,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PAINTING
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 2`,
          },
          type: IMAGE_TYPES.PHOTO
        },
        {
          image: {
            url: getRandomItem(images.photos),
            width: 304,
            height: 455,
            description: `Option 3`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      id: 10,
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          image: {
            url: getRandomItem(images.photos),
            width: 705,
            height: 455,
            description: `Option 1`,
          },
          type: IMAGE_TYPES.PHOTO
        }
      ]
    }
  ];
}
