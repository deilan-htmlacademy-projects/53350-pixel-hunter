"use strict";

(function (window) {
  const Slider = function (container, slideTemplates) {
    this.container = container;
    this.slideTemplates = Array.isArray(slideTemplates)
      ? slideTemplates
      : Array.from(slideTemplates);
    this.indexer = new window.CircularIndexer(this.slideTemplates.length);
  };
  Slider.prototype.selectSlide = function (index) {
    if (!this.indexer.isValid(index)) {
      throw new Error(`${index} is not a valid index`);
    }
    this.container.innerHTML = ``;
    const slide = this.slideTemplates[index].content.cloneNode(true);
    this.container.appendChild(slide);
  };
  Slider.prototype.prev = function () {
    this.selectSlide(this.indexer.prev());
  };
  Slider.prototype.next = function () {
    this.selectSlide(this.indexer.next());
  };
  window.Slider = Slider;
})(window);
