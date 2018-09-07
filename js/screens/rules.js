import {Screen} from "./common/screen";
import {getRules} from "./templates/rules";

export class RulesScreen extends Screen {
  constructor(game) {
    super(getRules(game.rules));
    const rulesInput = this.view.querySelector(`.rules__input`);
    const rulesBtn = this.view.querySelector(`.rules__button`);
    const rulesForm = this.view.querySelector(`.rules__form`);
    rulesInput.addEventListener(`input`, (evt) => {
      rulesBtn.disabled = !evt.target.value;
    });
    rulesForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.next.fire();
      return false;
    });
  }
}
