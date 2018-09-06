import ScreenView from "./common/screen";
import {getRules} from "./templates/rules";

// Правила игры
export class RulesScreen extends ScreenView {
  constructor(game) {
    super();
    this.game = game;
  }

  get _template() {
    return getRules(this.game.rules);
  }

  _bind(_element) {
    const rulesInput = _element.querySelector(`.rules__input`);
    const rulesBtn = _element.querySelector(`.rules__button`);
    const rulesForm = _element.querySelector(`.rules__form`);
    rulesInput.addEventListener(`input`, (evt) => {
      rulesBtn.disabled = !evt.target.value;
    });
    rulesForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.nextEventEmitter.fire();
    });
  }
}
