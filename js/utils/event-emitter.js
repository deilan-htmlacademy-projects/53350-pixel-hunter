export default class EventEmitter {
  constructor() {
    this._handlers = new Map();
  }

  on(eventType, handler) {
    verifyEventType(eventType);
    verifyHandler(handler);

    let eventTypeHandlers = this._handlers.get(eventType);
    if (!eventTypeHandlers) {
      eventTypeHandlers = new Set();
      this._handlers.set(eventType, eventTypeHandlers);
    }
    eventTypeHandlers.add(handler);
  }

  remove(eventType, handler) {
    verifyEventType(eventType);
    verifyHandler(handler);

    const eventTypeHandlers = this._handlers.get(eventType);
    if (!eventTypeHandlers) {
      return;
    }

    eventTypeHandlers.delete(handler);
    if (eventTypeHandlers.size === 0) {
      this._handlers.delete(eventType);
    }
  }

  fire(eventType, ...args) {
    verifyEventType(eventType);

    const eventTypeHandlers = this._handlers.get(eventType);
    if (!eventTypeHandlers) {
      return;
    }

    for (const handler of eventTypeHandlers) {
      handler(...args);
    }
  }
}

const verifyEventType = (eventType) => {
  if (typeof eventType !== `string` && !(eventType instanceof String)) {
    throw new Error(`eventType must be a string`);
  }
};

const verifyHandler = (handler) => {
  if (typeof handler !== `function`) {
    throw new Error(`handler must be a const`);
  }
};
