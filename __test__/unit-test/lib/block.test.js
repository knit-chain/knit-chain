'use strict';

require('jest');

const KC = require('../../../lib/kc');
const Doc = require('../../../lib/doc');
const Block = require('../../../lib/block');
const mock = require('../../mock');

describe('block unit test', function() {
  describe('# constructor', () => {
    it('creates new block', () => {
      const b = new Block(1, 'h3110');
      expect(b).toBeInstanceOf(Block);
    });
    it('sets index and previousHash', () => {
      const b = new Block(1, 'h3110');
      expect(b.index).toBe(1);
      expect(b.previousHash).toEqual('h3110');
    });
    it('sets previousHash to empty string if undefined', () => {
      const b = new Block(1);
      expect(b.previousHash).toEqual('');
    });
    it('sets index to undefined if undefined', () => {
      const b = new Block();
      expect(b.index).toBeUndefined();
    });
  });
  describe('# methods', () => {
    describe('.createDoc()', () => {
      it('creates and pushes new doc if block.docs empty', () => {
        const b = new Block(0);
        b.createDoc('');
        expect(b.docs[0]).toBeInstanceOf(Doc);
        expect(b.docs[0].value).toBe('');
        expect(JSON.stringify(b.docs[0].createdAt)).toMatch(/[0-9]{13}/);
      });
      it('creates and pushes new doc', () => {
        const b = new Block(0);
        b.docs[0] = mock.doc;
        b.createDoc('d1');
        expect(b.docs[1]).toBeInstanceOf(Doc);
        expect(b.docs[1].value).toBe('d1');
        expect(JSON.stringify(b.docs[1].createdAt)).toMatch(/[0-9]{13}/);
      });
      it('sets closed true if docs.length equals docsLimit', () => {
        const b = new Block(0);
        b.docs[0] = mock.doc;
        b.createDoc('d1');
        expect(b.closed).toBe(true);
      });
      it('doesnt change the block if closed is true', () => {
        const b = new Block(0);
        b.closed = true;
        b.createDoc('d1');
        expect(b.docs.length).toBe(0);
      });
      it('doesnt change the block if value undefined', () => {
        const b = new Block(0);
        b.createDoc();
        expect(b.docs.length).toBe(0);
      });
    });
  });
});
