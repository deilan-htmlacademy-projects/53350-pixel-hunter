import AbstractView from "./abstract";
import EventEmitter from "../../utils/event-emitter";

export default class BackButtonView extends AbstractView {
  constructor() {
    super();
    this.clickEventEmitter = new EventEmitter();
  }
  get _template() {
    return `<button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>`;
  }

  _bind(_element) {
    _element.addEventListener(`click`, () => this.clickEventEmitter.fire());
  }
}
