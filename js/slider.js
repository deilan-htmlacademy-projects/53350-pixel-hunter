import CircularIndexer from "./utils/circular-indexer";

export default class Slider {
  constructor(container, screens, game) {
    verifyContainer(container);
    this.game = game;
    this.container = container;
    this.screens = screens;
    this.indexer = new CircularIndexer(this.screens.length);
  }

  select(index) {
    this._select(this.indexer.set(index));
  }

  prev() {
    this._select(this.indexer.prev());
  }

  next() {
    this._select(this.indexer.next());
  }

  reset() {
    this._select(this.indexer.set(0));
  }

  _select(index) {
    const screen = this.screens[index](this.game);
    this.initScreen(screen);
    this.container.innerHTML = ``;
    this.container.appendChild(screen.element);
  }

  initScreen(screen) {
    screen.prevEventEmitter.on(this.prev.bind(this));

    screen.nextEventEmitter.on(() => {
      if (this.game.state.lives > 0) {
        this.next();
      } else {
        this._select(this.screens.length - 1);
      }
    });

    screen.resetEventEmitter.on(this.reset.bind(this));
  }
}

function verifyContainer(container) {
  if (!(container instanceof HTMLElement)) {
    throw new Error(`container must be an ${HTMLElement.name}`);
  }
}
