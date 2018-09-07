export default class EventEmitter {
  constructor() {
    this._handlers = new Set();
  }

  on(handler) {
    verifyHandler(handler);
    this._handlers.add(handler);
  }

  remove(handler) {
    verifyHandler(handler);
    this._handlers.clear(handler);
  }

  fire(...args) {
    for (const handler of this._handlers) {
      handler(...args);
    }
  }
}

function verifyHandler(handler) {
  if (typeof handler !== `function`) {
    throw new Error(`handler must be a function`);
  }
}
