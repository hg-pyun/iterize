# iterize

[![npm](https://img.shields.io/npm/v/iterize.svg)](https://www.npmjs.com/package/iterize)
![npm](https://img.shields.io/npm/dt/iterize.svg)
[![GitHub license](https://img.shields.io/github/license/hg-pyun/iterize.svg)](https://github.com/hg-pyun/iterize/blob/master/LICENSE)

> Minimalistic JavaScript Iterators

A great feature called Iterator was added into JavaScript. However, it's a strange concept to most of the front-end developers.
**iterize** helps you create your code more easily and efficiently using the various attributes of the Iterable Protocol.

## Why Powerful?

#### Lazy Evaluation

An array does not need to be allocated to memory on compile-time, nor does it need to be declared explicitly. You can let it be calculated on run-time, or any time you want it to be used.

#### Expressing Infinity

It was not easy to express the concept of infinity using the conventional syntax of JavaScript. **iterize** can help you express this concept effectively.

#### Reuse

Most functions of **iterize** are implemented as Higher-Order Functions. You can improve your productivity by reusing the functions you have already implemented before.

# Install

```bash
$ npm install iterize --save
```

# API

You can import **iterize** using ESModule style.

```js
import * as iterize from 'iterize';
```
OR
```js
import {range} from 'iterize';
```

## Range

Returns a transmitter that increases with some steps within a certain range.

#### Interface

```typescript
range(start: number, end:number, step: number | Function): Iterator
```

#### Example

```js
import {range} from 'iterize';

[...range(1, 10, 1)]; // [1, 2, 3 ... 9]
[...range(1, 10, x => x + 1)]; // [1, 2, 3 ... 9]
[...range(2, 64, x => x * x)]; // [2, 4, 16]
```

```js
import {range} from 'iterize';

let result = [];
for (let number of range(1, 3, 1)) {
    result.push(number);
}
console.log(result);  // [1, 2, 3]
```

## Cycle

#### Interface

Receives an array or an iterator and returns an emitter that repeats infinitely.

```typescript
cycle(item: Array<any> | Iterator): Iterator
```

#### Example

```js
import {cycle} from 'iterize';

const iter = cycle([0, 1, 2]);
iter.next(); // { value: 0, done: false }
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 0, done: false }
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
...
```

```js
import {cycle, range} from 'iterize';

const rangeIterator = range(0, 5, 2);
const iter = cycle(rangeIterator);
iter.next(); // { value: 0, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 4, done: false }
iter.next(); // { value: 0, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 4, done: false }
iter.next(); // { value: 0, done: false }
...
```

## Repeat

Returns a number or a string infinitely.

#### Interface

```typescript
repeat(item: number | string| Function): Iterator
```

#### Example

```js
import {repeat} from 'iterize';

const iter = repeat(0);
iter.next(); // { value: 0, done: false }
iter.next(); // { value: 0, done: false }
iter.next(); // { value: 0, done: false }
...
```

```js
import {repeat} from 'iterize';

const iter = repeat('a');
iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'a', done: false }
...
```

## Replicate

Returns the N copies of the input(number, string, or iterator).

#### Interface

```typescript
replicate(count: number, item: number | string | Function | Iterator): Iterator
```

#### Example

```js
import {replicate} from 'iterize';

[...replicate(5, 0)]   // [0, 0, 0, 0, 0]
[...replicate(5, 'a')] // ['a', 'a', 'a', 'a', 'a']
```

```js
import {replicate} from 'iterize';

let result = [];
for (let number of replicate(3, 0)) {
    result.push(number);
}
console.log(result);  // [0, 0, 0]
```

```js
import {replicate, range} from 'iterize';

const rangeIterator = range(1, 5, 1);
[...replicate(2, rangeIterator)]; // [1, 2, 3, 4, 1, 2, 3, 4]
```

## Take

Returns the first N items of the iterator sequentially.

#### Interface

```typescript
take(count: Number, iter: Iterator): Iterator
```

#### Example

```js
import {take, cycle} from 'iterize';

const cycleIterator = cycle([1, 2, 3]);
[...take(5, cycleIterator)]; // [1, 2, 3, 1, 2]
```

```js
import {take, cycle} from 'iterize';

const cycleIterator = cycle([1, 2, 3]);
let result = [];
for (let number of take(2, cycleIterator)) {
    result.push(number);
}
console.log(result);  // [1, 2]
```

# CONTRIBUTING

### [Contributing Guide](https://github.com/hg-pyun/iterize/blob/master/CONTRIBUTE.md)

Read contributing guide to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to **iterize**.

# LICENSE

**iterize** is [MIT licensed](https://github.com/hg-pyun/iterize/blob/master/LICENSE).
