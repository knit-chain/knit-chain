'use strict';

const KC = require('./lib/kc');
const myKnitChain = new KC();

console.log(`DEMO START`);

console.log(`\nmyKnitChain: ${JSON.stringify(myKnitChain)}`);

console.log(`\ninsert document with value 90:\nlatest block: ${JSON.stringify(myKnitChain.insert(90))}`);

console.log(`\ninsert document with value 81:\nlatest block: ${JSON.stringify(myKnitChain.insert(81))}`);

console.log(`\n(the block is now full)`);

console.log(`\nlookup by latest.hash:\nhashArray[${myKnitChain.latest.hash}]: ${JSON.stringify(myKnitChain.hashArray[myKnitChain.latest.hash])}`);

console.log(`\ninsert document with value 72:\nlatest block: ${JSON.stringify(myKnitChain.insert(72))}`);

console.log(`\nlookup by latest.previousHash:\nhashArray[${myKnitChain.latest.previousHash}]: ${JSON.stringify(myKnitChain.hashArray[myKnitChain.latest.previousHash])}`);

console.log(`\nEND OF DEMO\n`);
