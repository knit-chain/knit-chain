'use strict';

const Doc = require('./doc');

module.exports = class Block {
  constructor(previousHash) {
    if (previousHash === undefined) {
      return null;
    }
    this.createdAt = Date.now();
    this.docs = [];
    this.previousHash = previousHash;
    this.closed = false;
    this.hash = null;
  };

  createDoc(value) {
    if (this.closed === true) return;

    const doc = new Doc(value);
    this.docs.push(doc);

    this._hashBlock();

    return;
  };

  _hashBlock() {
    if (this.docs.length === 2) {
      this.closed = true;
      const radix = 1000 + this.docs[0].value + this.docs[1].value + this.previousHash;
      this.hash = 100 + (this.createdAt % radix);
    }
    return;
  };
};
