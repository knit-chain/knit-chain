'use strict';

const Block = require('./block');

module.exports = class KC {
  constructor(difficulty = 4, docsLimit = 2) {
    this.chain = [];
    this.latest = null;
    this.difficulty = difficulty;
    this.docsLimit = docsLimit;
  };

  getLatest() {
    return (this.chain[this.chain.length - 1]);
  };

  insertData(value) {
    if (!this.latest) {
      this.latest = new Block(0, '', this.docsLimit);
      this.insertData(value);
      this.chain.push(this.latest);
      return this.latest;
    }

    if (this.latest.closed) {
      this.latest = new Block(this.chain.length, this.latest.hash, this.docsLimit);
      this.insertData(value);
      this.chain.push(this.latest);
      return this.latest;
    }

    this.latest.createDoc(value);
    this.latest.mineBlock(this.difficulty);

    return this.latest;
  };

  isValid(index = 0) {
    if (!this.chain[index]) return false;
    // TODO: coverage ^

    const currentBlock = this.chain[index];
    const previousBlock = this.chain[index - 1];

    if (currentBlock.hash !== currentBlock.calculateHash()) return false;
    if (index >= 1) {
      if (currentBlock.previousHash !== previousBlock.hash) return false;
      // TODO: coverage ^
    }
    if (index < this.chain.length - 1) {
      index++;
      this.isValid(index);
    }
    return true;
  };
};
