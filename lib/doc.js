'use strict';

module.exports = class Doc {
  constructor(value) {
    this.value = value;
    this.createdAt = Date.now();
  };
};
