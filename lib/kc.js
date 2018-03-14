'use strict';

const Block = require('./Block');
const pushToHashArray = require('./pushToHashArray');

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
      pushToHashArray(this.hashArray, this.latest.hash, this.latest);
    }

    return this.latest;
  };
};
