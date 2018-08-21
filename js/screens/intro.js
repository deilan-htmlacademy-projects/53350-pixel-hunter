import {Screen} from "./screen";

// Интро
const template = `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

export class IntroScreen extends Screen {
  constructor() {
    super(template);
    const asterisk = this.view.querySelector(`.intro__asterisk`);
    asterisk.addEventListener(`click`, () => this.next.emit());
  }
}
