import { of, range } from 'rxjs';

const observer = {
  next: (val) => console.log('next', val),
  error: (val) => console.log('error', error),
  complete: (val) => console.log('complete'),
};

/*
 * Emits each item you provide in sequence, synchronously.
 * of literally just loops through the items and emits them,
 * there is no flattening involved. For instance, if you pass an
 * array the entire array will be emitted, not each item within
 * the array.
 */

const source$ = of(1, 2, 3, 4, 5, 6);
const source2$ = of([1, 2], [3, 4], [5, 6]);
const source3$ = of([1, 2, 3, 4, 5, 6]);
const source4$ = of('hello');
const source5$ = range(1, 6);

console.log('proving');
source$.subscribe(observer); // 1, 2, 3, 4, 5, 6
// source2$.subscribe(observer); // [1, 2], [3, 4], [5, 6]
// source3$.subscribe(observer); // // [1, 2, 3, 4, 5, 6]
// source4$.subscribe(observer); // hello
source5$.subscribe(observer); // 1, 2, 3, 4, 5, 6
console.log('this is synchronous');
