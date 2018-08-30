import {images} from "./images";
import {getRandomItem} from "../utils/random";

export const IMAGE_TYPES = Object.freeze({
  PHOTO: `photo`,
  PAINTING: `painting`
});

export const CHALLENGE_TYPES = {
  FIRST: `1`,
  SECOND: `2`,
  THIRD: `3`
};

export function getAllChallenges() {
  return [
    {
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 705,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.SECOND,
      task: `Угадайте для каждого изображения фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 468,
          height: 458,
          type: IMAGE_TYPES.PHOTO
        },
        {
          imageUrl: getRandomItem(images.paintings),
          title: `Option 2`,
          width: 468,
          height: 458,
          type: IMAGE_TYPES.PAINTING
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.THIRD,
      task: `Найдите рисунок среди изображений`,
      options: [
        {
          imageUrl: getRandomItem(images.paintings),
          title: `Option 1`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PAINTING
        },
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 2`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        },
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 3`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },

    {
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 705,
          height: 455,
          type: IMAGE_TYPES.PHOTO,
          answer: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.SECOND,
      task: `Угадайте для каждого изображения фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 468,
          height: 458,
          type: IMAGE_TYPES.PHOTO
        },
        {
          imageUrl: getRandomItem(images.paintings),
          title: `Option 2`,
          width: 468,
          height: 458,
          type: IMAGE_TYPES.PAINTING
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.THIRD,
      task: `Найдите рисунок среди изображений`,
      options: [
        {
          imageUrl: getRandomItem(images.paintings),
          title: `Option 1`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PAINTING
        },
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 2`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        },
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 3`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 705,
          height: 455,
          type: IMAGE_TYPES.PHOTO,
          answer: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.SECOND,
      task: `Угадайте для каждого изображения фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 468,
          height: 458,
          type: IMAGE_TYPES.PHOTO
        },
        {
          imageUrl: getRandomItem(images.paintings),
          title: `Option 2`,
          width: 468,
          height: 458,
          type: IMAGE_TYPES.PAINTING
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.THIRD,
      task: `Найдите рисунок среди изображений`,
      options: [
        {
          imageUrl: getRandomItem(images.paintings),
          title: `Option 1`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PAINTING
        },
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 2`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        },
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 3`,
          width: 304,
          height: 455,
          type: IMAGE_TYPES.PHOTO
        }
      ]
    },
    {
      type: CHALLENGE_TYPES.FIRST,
      task: `Угадай, фото или рисунок?`,
      options: [
        {
          imageUrl: getRandomItem(images.photos),
          title: `Option 1`,
          width: 705,
          height: 455,
          type: IMAGE_TYPES.PHOTO,
          answer: IMAGE_TYPES.PHOTO
        }
      ]
    }
  ];
}

export const challenges = [
  {
    type: CHALLENGE_TYPES.THIRD,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        imageUrl: `http://placehold.it/304x455`,
        title: `Option 1`,
        width: 304,
        height: 455
      },
      {
        imageUrl: `http://placehold.it/304x455`,
        title: `Option 2`,
        width: 304,
        height: 455
      },
      {
        imageUrl: `http://placehold.it/304x455`,
        title: `Option 3`,
        width: 304,
        height: 455
      }
    ]
  },
  {
    type: CHALLENGE_TYPES.FIRST,
    task: `Угадай, фото или рисунок?`,
    options: [
      {
        imageUrl: `http://placehold.it/705x455`,
        title: `Option 1`,
        width: 705,
        height: 455
      }
    ]
  },
  {
    type: CHALLENGE_TYPES.SECOND,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        imageUrl: `http://placehold.it/468x458`,
        title: `Option 1`,
        width: 468,
        height: 458
      },
      {
        imageUrl: `http://placehold.it/468x458`,
        title: `Option 1`,
        width: 468,
        height: 458
      }
    ]
  }
];
