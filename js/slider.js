import {CircularIndexer} from "./utils/circular-indexer";
import {Screen} from "./screens/common/screen";

const Slider = function (container, screens) {
  verifyContainer(container);
  verifyScreens(screens);
  this.container = container;
  this.screens = this.initScreens(screens);
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
  this.container.appendChild(this.screens[index].view);
};
Slider.prototype.initScreens = function (screens) {
  for (let screen of screens) {
    screen.prev.on(this.prev.bind(this));
    screen.next.on(this.next.bind(this));
    screen.reset.on(this.reset.bind(this));
  }
  return screens;
};

function verifyContainer(container) {
  if (!(container instanceof HTMLElement)) {
    throw new Error(`container must be an ${HTMLElement.name}`);
  }
}

function verifyScreens(screens) {
  if (!Array.isArray(screens)) {
    throw new Error(`screens must be an array of ${Screen.name}`);
  }
  if (screens.length === 0) {
    throw new Error(`screens must contain at least one item`);
  }
  if (!screens.every((st) => st instanceof Screen)) {
    throw new Error(`screens items must be instances of ${Screen.name}`);
  }
}

export {Slider};
