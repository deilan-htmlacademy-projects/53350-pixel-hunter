import {createElement} from "../../utils/dom/document";
import {EventEmitter} from "../../utils/event-emitter";

export class Screen {
  constructor(template) {
    this.view = createElement(template);
    this.prev = new EventEmitter();
    this.next = new EventEmitter();
    this.reset = new EventEmitter();
    const backBtn = this.view.querySelector(`.back`);
    if (backBtn) {
      backBtn.addEventListener(`click`, () => this.reset.fire());
    }
  }
}
