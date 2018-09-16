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

  get timerElement() {
    if (!this.timerElement) {
      this.timerElement = this.element.querySelector(`.game__timer`);
    }
    return this.timerElement;
  }

  updateTime(time) {
    const timerElement = this.timerElement;
    if (timerElement) {
      timerElement.textContent = time;
    }
  }

  blinkTime() {
    const timerElement = this.timerElement;
    if (timerElement) {
      timerElement.style.color = timerElement.style.color !== `black`
        ? `black`
        : `red`;
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
