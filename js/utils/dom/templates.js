'use strict';

(function (window) {
  function verifyIds(ids) {
    if (!(Array.isArray(ids))) {
      throw new Error(`ids is not an array`);
    }
  }
  window.getTemplates = (...ids) => {
    // TODO: use flattening?
    if (Array.isArray(ids[0])) {
      ids = [...ids[0]];
    }
    verifyIds(ids);
    const idsMap = ids.reduce((acc, id, index) => {
      acc[id] = index;
      return acc;
    }, {});
    const selectors = ids.map((id) => `#${id}`).join(`, `);
    return Array.from(document.querySelectorAll(selectors))
      .sort((a, b) => idsMap[a.id] - idsMap[b.id]);
  };
})(window, document);
