import ScreenView from "./common/screen";
import EventEmitter from "../utils/event-emitter";

// Модальное окно с подтверждением
export class ModalConfirmView extends ScreenView {
  constructor() {
    super();
    this.confirmEventEmitter = new EventEmitter();
    this.cancelEventEmitter = new EventEmitter();
    this._emittersMap = {
      confirm: this.confirmEventEmitter,
      cancel: this.cancelEventEmitter
    };
  }

  get _template() {
    return `<section class="modal">
      <form class="modal__inner">
        <button class="modal__close" type="button" data-action="confirm">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn" data-action="confirm">Ок</button>
          <button class="modal__btn" data-action="cancel">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  _bind(_element) {
    super._bind(_element);

    _element
      .querySelector(`.modal__inner`)
      .addEventListener(`click`, (event) => {
        const target = event.target.closest(`button`);

        if (!target || !target.dataset.action) {
          return;
        }

        this.map[target.dataset.action].fire();
      });
  }
}
