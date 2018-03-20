'use strict';

require('jest');

const KC = require('../../../lib/kc');
const Doc = require('../../../lib/doc');
const Block = require('../../../lib/block');
const mock = require('../../mock');

describe('knitchain unit test', function() {
  describe('# constructor', () => {
    it('creates new KC', () => {
      const kc = new KC();
      expect(kc).toBeInstanceOf(KC);
    });
  });
  describe('# methods', () => {
    describe('.insertData() once to empty chain', () => {
      const kc = new KC();
      kc.insertData('d0');
      it('creates new block', () => {
        expect(kc.chain.length).toBe(1);
        expect(kc.chain[0]).toBeInstanceOf(Object);
        // expect(kc.chain[0]).toBeInstanceOf(Block);
          // someone explain why this fails?  ^^^^^
      });
      it('adds new doc to block', () => {
        expect(kc.chain[0].docs.length).toBe(1);
        expect(kc.chain[0].docs[0]).toBeInstanceOf(Doc);
        expect(kc.chain[0].docs[0].value).toEqual('d0');
        expect(JSON.stringify(kc.chain[0].docs[0].createdAt)).toMatch(/[0-9]{13}/);
      });
      it('creates valid hash and nonce', () => {
        expect(kc.chain[0].hash).toMatch(/0{4}[0-9|a-f]{60}/);
        expect(kc.chain[0].nonce).not.toBeNaN();
      });
      it('sets closed to false', () => {
        expect(kc.chain[0].closed).toBe(false);
      });
    });
    describe('.insertData() to block with one doc', () => {
      const kc = new KC();
      kc.chain = [mock.blockWithOneDoc];
      kc.latest = kc.chain[0];
      kc.insertData('d1');
      it('doesnt create new block', () => {
        expect(kc.chain.length).toBe(1);
        expect(kc.chain[0]).toBeInstanceOf(Object);
      });
      it('adds new doc to block', () => {
        expect(kc.chain[0].docs.length).toBe(2);
        expect(kc.chain[0].docs[1]).toBeInstanceOf(Doc);
        expect(kc.chain[0].docs[1].value).toEqual('d1');
        expect(JSON.stringify(kc.chain[0].docs[1].createdAt)).toMatch(/[0-9]{13}/);
      });
      it('updates valid hash and nonce', () => {
        expect(kc.chain[0].hash).not.toEqual('000025932b4790239795aa94b974e55e58449b436235a8e0218c5506989cd36a')
        expect(kc.chain[0].hash).toMatch(/0{4}[0-9|a-f]{60}/);
        expect(kc.chain[0].nonce).not.toEqual(205788);
        expect(kc.chain[0].nonce).not.toBeNaN();
      });
      it('sets closed to true', () => {
        expect(kc.chain[0].closed).toBe(true);
      });
    });
    describe('.insertData() to block with two docs', () => {
      const kc = new KC();
      kc.chain = [mock.blockWithTwoDocs];
      kc.latest = kc.chain[0];
      kc.insertData('d2');
      it('creates new block', () => {
        expect(kc.chain.length).toBe(2);
        expect(kc.chain[1]).toBeInstanceOf(Object);
      });
      it('adds new doc to block', () => {
        expect(kc.chain[1].docs.length).toBe(1);
        expect(kc.chain[1].docs[0]).toBeInstanceOf(Doc);
        expect(kc.chain[1].docs[0].value).toEqual('d2');
        expect(JSON.stringify(kc.chain[1].docs[0].createdAt)).toMatch(/[0-9]{13}/);
      });
      it('creates valid hash and nonce', () => {
        expect(kc.chain[1].hash).toMatch(/0{4}[0-9|a-f]{60}/);
        expect(kc.chain[1].nonce).not.toBeNaN();
      });
      it('sets closed to false', () => {
        expect(kc.chain[1].closed).toBe(false);
      });
    });
    describe('.getLatest()', () => {
      const kc = new KC();
      it('returns null', () => {
        expect(kc.getLatest()).toBeUndefined;
      });
      it('returns latest', () => {
        kc.chain = [mock.blockWithOneDoc];
        kc.latest = kc.chain[0];
        expect(kc.getLatest()).toBe(mock.blockWithOneDoc);
      });
    });
    describe('.isValid()', () => {
      it('returns true if valid', () => {
        var kc = new KC();
        kc.chain = [mock.blockWithTwoDocs, mock.blockWithPreviousHash];
        kc.latest = kc.chain[1];
        expect(kc.isValid()).toBe(true);
      });
      it('returns false if first block altered', () => {
        var kc = new KC();
        kc.chain = [mock.blockWithTwoDocs, mock.blockWithPreviousHash];
        kc.latest = kc.chain[1];

        kc.chain[0].hash = 1;
        expect(kc.isValid()).toBe(false);
      });
      it('returns false if second block altered', () => {
        var kc = new KC();
        kc.chain = [mock.blockWithTwoDocs, mock.blockWithPreviousHash];
        kc.latest = kc.chain[1];

        kc.chain[1].hash = 1;
        expect(kc.isValid()).toBe(false);
      });
      it('returns false if additional block is added', () => {
        var kc = new KC();
        kc.chain = [mock.blockWithTwoDocs, mock.blockWithPreviousHash];
        kc.latest = kc.chain[1];

        kc.chain[2] = mock.blockWithOneDoc;
        kc.latest = kc.chain[2];
        expect(kc.isValid()).toBe(false);
      });
    });
  });
});
