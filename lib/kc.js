'use strict';

const Block = require('./Block');

module.exports = class BasicKC {
  constructor() {
    this.latest = null;
    this.hashArray = [];
  };

  insert(value) {
    if (isNaN(value)) return this;

    if (!this.latest) {
      this.latest = new Block(null);
      this.latest.createDoc(value);
      return this.latest;
    }

    // closed before insertion:
    if (this.latest.closed) {
      const nextBlock = new Block(this.latest.hash);
      this.latest = nextBlock;
      this.insert(value);
      return this.latest;
    }

    this.latest.createDoc(value);

    // closed after insertion:
    if (this.latest.closed) {
      this._assignToHashArray();
    }

    return this.latest;
  };

  _assignToHashArray() {
    if (this.hashArray[this.latest.hash] !== undefined) {
      this.hashArray[this.latest.hash].push(this.latest);
    } else {
      this.hashArray[this.latest.hash] = [this.latest];
    }
  }
};
