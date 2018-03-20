# 🧶 knit-chain
_lightweight block-chain, without smart-contract_


## knit-chain: lightweight block-chain

#### most current block-chain implementations use:

* blocks, containing
  * a cryptographic hash of the previous block
  * timestamp
  * data
    * hashed and stored in Merkle trees
* proof of work, via cryptographic salting
* peer-to-peer
  * distribution
  * evaluation (smart-contracts)

#### knit-chain uses:

* blocks, containing
  * a cryptographic hash of the previous block
  * timestamp
  * data
    * ~~hashed and stored in Merkle trees~~
* proof of work, via cryptographic salting
* ~~peer-to-peer~~
  * ~~distribution~~
  * ~~evaluation (smart-contracts)~~

Because of the complexity of most block-chain implementations, they are often discarded as a realistic option for smaller-scale solutions. Knit-chain was created to fill that need -- to provide a go-to option for exploring light-weight use cases for block-chain.

## testing
All tests passing.
96.72% of statements covered.

## install
### npm install:
In project directory (with existing package.json):
```sh
$ npm i knitchain
```
## javascript
### require
```js
const KC = require('knitchain');
// returns knitchain constructor
```
### constructor & methods:
```js
const myKC = new KC(/* [difficulty (default 4)], [docsLimit (default 2)] */);
// returns new knitchain object:
// {
//   chain: [],
//   latest: null,
//   difficulty: 4
//   docsLimit: 2
// }
```
```js
myKC.insertData('data 1');
// if this is the first block or the current block is full,
//    1. creates block
//    2. creates doc from data
//    3. pushes doc to block.docs array
//    4. pushes block to chain array
//    5. mines latest block
//    6. returns latest block:
//      {
//        createdAt: 1521485744340,
//        docs: [
//          { value: 'data 1', createdAt: 1521485744340 }
//        ],
//        docsLimit: 2,
//        previousHash: '',
//        index: 0,
//        closed: false,
//        hash: '<hashed block>',
//        nonce: <nonce value>
//      }

myKC.insertData('data 2');
// if this is not the first block and the current block is not full,
//    1. creates doc from data
//    2. pushes doc to block.docs array
//    3. mines latest block (again)
//    4. returns latest block:
//      {
//        createdAt: 1521485744340,
//        docs: [
//          { value: 'data 1', createdAt: 1521485744340 },
//          { value: 'data 2', createdAt: 1521486162374 }
//        ],
//        docsLimit: 2,
//        previousHash: '',
//        index: 0,
//        closed: true,
//        hash: '<re-hashed block>',
//        nonce: <new nonce value>
//      }
```
```js
myKC.getLatest();
// returns latest block:
// {
//   createdAt: 1521485744340,
//   docs: [
//     { value: 'data 1', createdAt: 1521485744340 },
//     { value: 'data 2', createdAt: 1521486162374 }
//   ],
//   docsLimit: 2,
//   previousHash: '',
//   index: 0,
//   closed: true,
//   hash: '<re-hashed block>',
//   nonce: <new nonce value>
// }
```
```js
myKC.isValid();
// checks the hash of each block in the chain
// if hashes are correct, returns true
// if hashes are incorrect, returns false
```
## updates:
### ```1.0.6```
* _set difficulty and docsLimits as knitchain constructor optional parameters_
