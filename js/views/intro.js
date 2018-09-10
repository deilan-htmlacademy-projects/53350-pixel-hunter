import ScreenView from "./common/screen";

// Интро
export class IntroView extends ScreenView {
  get _template() {
    return `<section class="intro">
      <button class="intro__asterisk asterisk" type="button">
        <span class="visually-hidden">Продолжить</span>*
      </button>
      <p class="intro__motto">
        <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
      </p>
    </section>`;
  }

  _bind(_element) {
    super._bind(_element);

    _element
      .querySelector(`.intro__asterisk`)
      .addEventListener(`click`, () => this.eventEmitter.fire(`next`));
  }
}
