"use strict";

(function (window) {
  const CircularIndexer = function (count, initial = 0) {
    this.count = count;
    this.current = initial;
  };
  CircularIndexer.prototype.prev = function () {
    return this.current > 0 ? --this.current : (this.current = this.count - 1);
  };
  CircularIndexer.prototype.next = function () {
    return this.current < this.count - 1 ? ++this.current : (this.current = 0);
  };
  CircularIndexer.prototype.isValid = function (index) {
    return index >= 0 && index <= this.count - 1;
  };
  window.CircularIndexer = CircularIndexer;
})(window);
