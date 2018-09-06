export default class EventEmitter {
  constructor() {
    this._handlers = [];
  }

  on(handler) {
    verifyHandler(handler);
    this._handlers = [...this._handlers, handler];
  }

  remove(handler) {
    verifyHandler(handler);
    this._handlers = this._handlers.filter((h) => h !== handler);
  }

  fire() {
    for (let handler of this._handlers) {
      handler();
    }
  }
}

function verifyHandler(handler) {
  if (typeof handler !== `function`) {
    throw new Error(`handler must be a function`);
  }
}
