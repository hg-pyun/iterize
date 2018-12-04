# iterize

[![npm](https://img.shields.io/npm/v/iterize.svg)](https://www.npmjs.com/package/iterize)
[![npm](https://img.shields.io/npm/dt/iterize.svg)](https://www.npmjs.com/package/iterize)
[![GitHub license](https://img.shields.io/github/license/hg-pyun/iterize.svg)](https://github.com/hg-pyun/iterize/blob/master/LICENSE)

> Use JavaScript Iterator, Easily 

**iterize** is a minimalistic creator for the iterator. A great feature called Iterator was added into JavaScript. However, it's a strange concept for most of the front-end developers.
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

You can import **iterize** using ESModule style.

```js
import * as iterize from 'iterize';
```
```js
import {range} from 'iterize';
```

# API
- [Range](https://github.com/hg-pyun/iterize#range)
- [Cycle](https://github.com/hg-pyun/iterize#cycle)
- [Repeat](https://github.com/hg-pyun/iterize#repeat)
- [Replicate](https://github.com/hg-pyun/iterize#replicate)
- [Take](https://github.com/hg-pyun/iterize#take)

## Range

Returns a transmitter that increases with some steps within a certain range.

#### Interface

```typescript
range(start: number, end?:number, step?: number | Function): Iterator
```

#### Example
You can use with `for-of` syntax.
```js
import {range} from 'iterize';

for (let number of range(5)) {
    console.log(number);  // 0, 1, 2, 3, 4
}

for (let number of range(0, 5)) {
    console.log(number);  // 0, 1, 2, 3, 4
}

for (let number of range(0, 5, 2)) {
    console.log(number);  // 0, 2, 4
}
```
With the spread operator.
```js
import {range} from 'iterize';
[...range(5)];  // [0, 1, 2, 3, 4]
[...range(0, 5)]; // [0, 1, 2, 3, 4]
[...range(5, 0)]; // [5, 4, 3, 2, 1]
[...range(1, 10, 1)]; // [1, 2, 3 ... 9]
[...range(1, 10, x => x + 1)]; // [1, 2, 3 ... 9]
[...range(2, 64, x => x * x)]; // [2, 4, 16]
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
`Cycle` can also receive a range iterator.
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
repeat(item: number | string): Iterator
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
replicate(count: number, item: number | string | Iterator): Iterator
```

#### Example
```js
import {replicate} from 'iterize';

for (let number of replicate(3, 1)) {
    console.log(number);  // [1, 1, 1]
}
```
With the spread operator.
```js
import {replicate} from 'iterize';

[...replicate(5, 0)]   // [0, 0, 0, 0, 0]
[...replicate(5, 'a')] // ['a', 'a', 'a', 'a', 'a']
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
take(count: number, iter: Iterator): Iterator
```

#### Example
```js
import {take, cycle} from 'iterize';

const cycleIterator = cycle([1, 2, 3]);
for (let number of take(5, cycleIterator)) {
    console.log(number);  // 1, 2, 3, 1, 2
}
```
With spread operator.
```js
import {take, cycle} from 'iterize';

const cycleIterator = cycle([1, 2, 3]);
[...take(5, cycleIterator)]; // [1, 2, 3, 1, 2]
```

# CONTRIBUTING

### [Contributing Guide](https://github.com/hg-pyun/iterize/blob/master/CONTRIBUTE.md)

Read contributing guide to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to **iterize**.

# LICENSE

**iterize** is [MIT licensed](https://github.com/hg-pyun/iterize/blob/master/LICENSE).
