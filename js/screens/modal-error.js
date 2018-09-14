import {ModalErrorView} from "../views/modal-error";

export class ErrorScreen {
  constructor(error) {
    this.view = new ModalErrorView(error);
  }
}
