"use strict";

(function (window, document) {
  window.createPaginator = () => {
    const container = document.createElement(`div`);
    container.classList.add(`arrows__wrap`);
    container.appendChild(createStyle());
    container.appendChild(createButton(`<-`));
    container.appendChild(createButton(`->`));
    return container;
  };

  function createStyle() {
    const style = document.createElement(`style`);
    style.type = `text/css`;
    const arrowsWrapStyle = document.createTextNode(`
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }`);
    const arrowsBtnStyle = document.createTextNode(`
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }`);
    style.appendChild(arrowsWrapStyle);
    style.appendChild(arrowsBtnStyle);
    return style;
  }
  function createButton(textContent) {
    const btn = document.createElement(`button`);
    btn.classList.add(`arrows__btn`);
    btn.textContent = textContent;
    return btn;
  }
})(window, document);
