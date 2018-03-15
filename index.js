'use strict';

require('dotenv').config();
const KC = require('./lib/kc');

const myKnitChain = new KC();

console.log(`DEMO START`);

console.log(`\ncreate new knitChain:\nmyKnitChain: ${JSON.stringify(myKnitChain)}`);

console.log(`\ninsert document with value 90:\nlatest block: ${JSON.stringify(myKnitChain.insertData(90))}`);

console.log(`\nlookup chain: ${JSON.stringify(myKnitChain.chain)}`);

console.log(`\ninsert document with value 81:\nlatest block: ${JSON.stringify(myKnitChain.insertData(81))}`);

console.log(`\n(the first block is now full)`);

console.log(`\nlookup chain: ${JSON.stringify(myKnitChain.chain)}`);

console.log(`\ninsert document with value 72:\nlatest block: ${JSON.stringify(myKnitChain.insertData(72))}`);

console.log(`\nlookup chain: ${JSON.stringify(myKnitChain.chain)}`);

console.log(`\ninsert document with value 63:\nlatest block: ${JSON.stringify(myKnitChain.insertData(63))}`);

console.log(`\n(the second block is now full)`);

console.log(`\nlookup chain: ${JSON.stringify(myKnitChain.chain)}`);

console.log(`\ngetLatest: ${JSON.stringify(myKnitChain.getLatest())}`);

console.log(`\nisValid: ${myKnitChain.isValid()}`);

console.log(`\nEND OF DEMO\n`);
