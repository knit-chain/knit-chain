'use strict';

const Block = require('../lib/block');
const Doc = require('../lib/doc');

const mock = module.exports = {
  blockWithOneDoc: new Block(0),
  blockWithTwoDocs: new Block(0),
  blockWithPreviousHash: new Block(1),
  doc: new Doc()
}

mock.blockWithOneDoc.docs = [{value: 'd0', createdAt: 1521485744340}];
mock.blockWithOneDoc.createdAt = 1521485744340;
mock.blockWithOneDoc.hash = '000025932b4790239795aa94b974e55e58449b436235a8e0218c5506989cd36a';
mock.blockWithOneDoc.nonce = 205788;

mock.blockWithTwoDocs.docs = [{value: 'd0', createdAt: 1521485744340}, { value: 'd1', createdAt: 1521498350186 }];
mock.blockWithTwoDocs.createdAt = 1521485744340;
mock.blockWithTwoDocs.hash = '000039364e656e2bbc62d390e130caf852c4c48e2c2b460a03fe2525051239a9';
mock.blockWithTwoDocs.nonce = 208713;
mock.blockWithTwoDocs.closed = true;

mock.blockWithPreviousHash.docs = [{value: 'd2', createdAt: 1521500968796}];
mock.blockWithPreviousHash.createdAt = 1521500968796;
mock.blockWithPreviousHash.hash = '000027b973ac560285c5dfc60f648bcecb0b196e043458fc8ed1f12b11be23d5';
mock.blockWithPreviousHash.nonce = 61422;
mock.blockWithPreviousHash.previousHash = '000039364e656e2bbc62d390e130caf852c4c48e2c2b460a03fe2525051239a9'

mock.doc.value = 'd0';
mock.doc.createdAt = 1521485744340;
