import {createElement} from "../../utils/dom/document";

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(
          `Could not instantiate an AbstractView.` +
          ` Instantiate a concrete subclass instead.`
      );
    }
  }

  get _template() {
    throw new Error(`'_template' getter must be overrided`);
  }

  _render() {
    return createElement(this._template);
  }

  _bind(_element) {}

  get element() {
    if (!this._element) {
      this._element = this._render();
      this._bind(this._element);
    }
    return this._element;
  }
}
