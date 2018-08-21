export class EventEmitter {
  constructor() {
    this.handlers = [];
  }

  add(handler) {
    verifyHandler(handler);
    this.handlers = [...this.handlers, handler];
  }

  remove(handler) {
    verifyHandler(handler);
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  emit() {
    for (let handler of this.handlers) {
      handler();
    }
  }
}

function verifyHandler(handler) {
  if (typeof handler !== `function`) {
    throw new Error(`handler must be a function`);
  }
}
