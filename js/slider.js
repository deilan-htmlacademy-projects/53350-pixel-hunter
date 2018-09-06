import {CircularIndexer} from "./utils/circular-indexer";

const Slider = function (container, screens, game) {
  verifyContainer(container);
  this.game = game;
  this.container = container;
  this.screens = screens;
  this.indexer = new CircularIndexer(this.screens.length);
};
Slider.prototype.select = function (index) {
  this._select(this.indexer.set(index));
};
Slider.prototype.prev = function () {
  this._select(this.indexer.prev());
};
Slider.prototype.next = function () {
  this._select(this.indexer.next());
};
Slider.prototype.reset = function () {
  this._select(this.indexer.set(0));
};
Slider.prototype._select = function (index) {
  this.container.innerHTML = ``;
  const screen = this.screens[index](this.game);
  this.initScreen(screen);
  this.container.appendChild(screen.element);
};
Slider.prototype.initScreen = function (screen) {
  screen.prevEventEmitter.on(this.prev.bind(this));
  screen.nextEventEmitter.on(() => {
    if (this.game.state.lives > 0) {
      this.next();
    } else {
      this._select(this.screens.length - 1);
    }
  });
  screen.resetEventEmitter.on(this.reset.bind(this));
};

function verifyContainer(container) {
  if (!(container instanceof HTMLElement)) {
    throw new Error(`container must be an ${HTMLElement.name}`);
  }
}

export {Slider};
