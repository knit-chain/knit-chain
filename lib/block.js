'use strict';

const SHA256 = require('crypto-js/sha256');
const Doc = require('./doc');

module.exports = class Block {
  constructor(index, previousHash = '', docsLimit = 2) {
    this.createdAt = Date.now();
    this.docs = [];
    this.docsLimit = docsLimit;
    this.previousHash = previousHash;
    this.index = index;
    this.closed = false;
    this.hash = '';
    this.nonce = 0;
  };

  createDoc(value) {
    if (value === undefined) return;
    if (this.closed === true) return;
    const doc = new Doc(value);
    this.docs.push(doc);
    if (this.docs.length === parseInt(this.docsLimit)) this.closed = true;
    return;
  };

  calculateHash() {
    return SHA256(this.index +
      this.previousHash +
      this.createdAt +
      JSON.stringify(this.docs) +
      this.nonce
    ).toString()
  };

  mineBlock(difficulty) {
    // TODO: coverage (indirectly covered)
    this.hash = this.calculateHash();
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    return;
  };
};
