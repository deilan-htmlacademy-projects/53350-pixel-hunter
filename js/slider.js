"use strict";

(function (window) {
  const Slider = function (container, templates) {
    verifyContainer(container);
    verifyTemplates(templates);
    this.container = container;
    this.templates = templates;
    this.indexer = new window.CircularIndexer(this.templates.length);
  };
  Slider.prototype.select = function (index) {
    this._select(this.indexer.set(index));
  };
  Slider.prototype.prev = function () {
    this._select(this.indexer.prev());
  };
  Slider.prototype.next = function () {
    this._select(this.indexer.next());
  };
  Slider.prototype._select = function (index) {
    this.container.innerHTML = ``;
    const slide = this.templates[index].content.cloneNode(true);
    this.container.appendChild(slide);
  };

  function verifyContainer(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error(`container must be an ${HTMLElement.name}`);
    }
  }

  function verifyTemplates(templates) {
    if (!Array.isArray(templates) || !templates.every((st) => st instanceof HTMLTemplateElement)) {
      throw new Error(`templates must be an array of ${HTMLTemplateElement.name}`);
    }
  }
  window.Slider = Slider;
})(window);
