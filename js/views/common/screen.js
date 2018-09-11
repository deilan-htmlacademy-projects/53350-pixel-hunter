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
    this.eventEmitter = new EventEmitter();
  }

  updateTime(time) {
    const timer = this.element.querySelector(`.game__timer`);
    if (timer) {
      timer.textContent = time;
    }
  }

  _bind(_element) {
    const backBtn = _element.querySelector(`.back`);

    if (backBtn) {
      backBtn.addEventListener(`click`, () => {
        this.eventEmitter.fire(`reset`);
      });
    }
  }
}
