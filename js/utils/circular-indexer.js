const CircularIndexer = function (count, initial = 0) {
  verifyCount(count);
  verifyIndex(initial, count);
  this.count = count;
  this.current = initial;
};
CircularIndexer.prototype.prev = function () {
  this.current = this.current > 0
    ? this.current - 1
    : this.count - 1;
  return this.current;
};
CircularIndexer.prototype.next = function () {
  this.current = this.current < this.count - 1
    ? this.current + 1
    : 0;
  return this.current;
};
CircularIndexer.prototype.set = function (index) {
  verifyIndex(index, this.count);
  this.current = index;
  return this.current;
};
function verifyCount(count) {
  if (!Number.isInteger(count)) {
    throw new Error(`count must be an integer number`);
  }
  if (count < 0) {
    throw new Error(`count must be greater than ${0}`);
  }
}
function verifyIndex(index, count) {
  if (!Number.isInteger(index)) {
    throw new Error(`index must be an integer number`);
  }
  if (index < 0 || index > count - 1) {
    throw new Error(`index must be between 0 and ${count - 1}`);
  }
}

export {CircularIndexer};
