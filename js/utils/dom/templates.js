'use strict';

(function (window) {
  window.getTemplates = (ids) => {
    verifyIds(ids);
    return ids.map((id) => document.querySelector(`#${id}`));
  };
  function verifyIds(ids) {
    if (!(Array.isArray(ids))) {
      throw new Error(`ids is not an array`);
    }
  }
})(window, document);
