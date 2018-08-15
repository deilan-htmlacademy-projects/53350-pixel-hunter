"use strict";

(function (window) {
  const CircularIndexer = function (count, initial = 0) {
    verifyCount(count);
    verifyIndex(initial, count);
    this.count = count;
    this.current = initial;
  };
  CircularIndexer.prototype.prev = function () {
    return this.current > 0 ? --this.current : (this.current = this.count - 1);
  };
  CircularIndexer.prototype.next = function () {
    return this.current < this.count - 1 ? ++this.current : (this.current = 0);
  };
  CircularIndexer.prototype.set = function (index) {
    verifyIndex(index, this.count);
    return (this.current = index);
  };
  function verifyCount(count) {
    if (!Number.isInteger(count)) {
      throw new Error(`count must be an integer number`);
    }
    if (!(count >= 1)) {
      throw new Error(`count must be greater than ${0}`);
    }
  }
  function verifyIndex(index, count) {
    if (!Number.isInteger(index)) {
      throw new Error(`index must be an integer number`);
    }
    if (!(index >= 0 && index <= count - 1)) {
      throw new Error(`index must be between ${0} and ${count - 1}`);
    }
  }
  window.CircularIndexer = CircularIndexer;
})(window);
