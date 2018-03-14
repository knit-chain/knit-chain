'use strict';

module.exports = function pushToHashArray(array, blockHash, block) {
  if (array[blockHash] !== undefined) {
    array[blockHash].push(block);
  } else {
    array[blockHash] = [block];
  }
}
