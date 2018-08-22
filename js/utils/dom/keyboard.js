"use strict";

(function (window) {
  window.createKeydownHandler = (keyCodeHandlersMap) => {
    return (ev) => {
      const handler = keyCodeHandlersMap[ev.code];
      if (handler) {
        handler();
      }
    };
  };
})(window);
