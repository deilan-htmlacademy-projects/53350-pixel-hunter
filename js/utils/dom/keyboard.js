"use strict";

(function (window) {
  window.createKeydownHandler = (keyCodeHandlersMap) => {
    return (ev) => {
      keyCodeHandlersMap[ev.keyCode]();
    };
  };
})(window);
