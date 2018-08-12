"use strict";

(function (window) {
  const KEY_CODES = Object.freeze({
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  });
  window.getSliderKeyboardHandler = (slider) => (ev) => {
    switch (ev.keyCode) {
      case KEY_CODES.LEFT_ARROW:
        slider.prev();
        break;
      case KEY_CODES.RIGHT_ARROW:
        slider.next();
        break;
    }
  };
})(window);
