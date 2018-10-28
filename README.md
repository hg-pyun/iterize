# iterize

> Minimalistic Javascript Iterators

The JavaScript added a great feature called Iterator. But most front-end developers, it's a strange concept.
Iterize helps you create code more easily and efficiently using the various attributes of the generator.

## What is Effective ?

#### Lazy Evaluation

Array does not need to be allocated to memory before. You can use it to calculate at run-time.

#### Infinite Expression

Conventional grammar cannot easily express the concept of infinity. Iterize can help you express this infinite.

#### Reuse

Most functions of Iterize are implemented as High-Order Function. You can improve productivity by reusing the functions you have implemented.

# Install

```bash
$ npm install iterize --save
```

# API

## Range

Returns the transmitter that increases with step within a certain range.

#### Interface

```typescript
iterize.range(start: number, end:number, step: number | Function): IterableIterator;
```

#### Example

```js
import { range } from 'iterize';

[...range(1, 10, 1)]; // [1, 2, 3 ... 9]
[...range(1, 10, x => x + 1)]; // [1, 2, 3 ... 9]
[...range(2, 64, x => x * x)]; // [2, 4, 16]
```

## Cycle

#### Interface

Receives an array or an Iterator and returns an emitter that repeats indefinitely.

```typescript
iterize.cycle(item: Array<any> | IterableIterator): IterableIterator;
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

Returns an infinite number or string.

#### Interface

```typescript
repeat(item: number | string): IterableIterator
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

Return input number, string, or interator with copy N times.

#### Interface

```typescript
replicate(count: number, item: number | string | IterableIterator): IterableIterator
```

#### Example

```js
import {replicate} from 'iterize';

[...replicate(5, 0)]   // [0, 0, 0, 0, 0]
[...replicate(5, 'a')] // ['a', 'a', 'a', 'a', 'a']
```

```js
import { replicate, range } from 'iterize';

const rangeIterator = range(1, 5, 1);
[...replicate(2, rangeIterator)]; // [1, 2, 3, 4, 1, 2, 3, 4]
```

## Take

Returns the count in the Iterator.

#### Interface

```typescript
take(count: Number, iter: IterableIterator): IterableIterator
```

#### Example

```js
import { take, cycle } from 'iterize';

const cycleIterator = lterize.cycle([1, 2, 3]);
[...iterize.take(5, cycleIterator)]; // [1, 2, 3, 1, 2]
```

# CONTRIBUTING

### [Contributing Guide](https://github.com/hg-pyun/iterize/blob/master/CONTRIBUTE.md)

Read contributing guide to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Iterize.

# LICENSE

Iterize is [MIT licensed](https://github.com/hg-pyun/iterize/blob/master/LICENSE).
