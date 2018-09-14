export const AnswerType = Object.freeze({
  PHOTO: `photo`,
  PAINTING: `painting`,

  getOppositeType(type) {
    switch (type) {
      case this.PAINTING:
        return this.PHOTO;
      case this.PHOTO:
        return this.PAINTING;
    }
    throw new Error(`Couldn't get an opposite of ${type}`);
  }
});
