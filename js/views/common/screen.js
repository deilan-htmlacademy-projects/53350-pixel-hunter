import EventEmitter from "../../utils/event-emitter";
import AbstractView from "./abstract";

export default class ScreenView extends AbstractView {
  constructor() {
    if (new.target === ScreenView) {
      throw new Error(
          `Could not instantiate an ScreenView.` +
          ` Instantiate a concrete subclass instead.`
      );
    }

    super();
    this.prevEventEmitter = new EventEmitter();
    this.nextEventEmitter = new EventEmitter();
    this.resetEventEmitter = new EventEmitter();
  }

  _bind(_element) {
    const backBtn = _element.querySelector(`.back`);

    if (backBtn) {
      backBtn.addEventListener(`click`, () => {
        this.resetEventEmitter.fire();
      });
    }
  }
}
