import ScreenView from "./common/screen";

// Модальное окно с ошибкой
export class ModalErrorView extends ScreenView {
  constructor(error) {
    super();
    this.error = error;
  }

  get _template() {
    return `<section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this.error}</p>
      </div>
    </section>`;
  }
}
