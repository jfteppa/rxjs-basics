import { range, from } from 'rxjs';
import 'regenerator-runtime/runtime';

const observer = {
  next: (val) => console.log('next', val),
  error: (error) => console.log('error', error),
  complete: () => console.log('complete'),
};

/*
 * from can turn nearly anything into an observable
 * When from receieves an array, it loops through each item
 * within that array, emitting them in sequence.
 */
//  Arrays
const source_$ = from([1, 2, 3, 4, 5, 6]);
const source$ = from(range(1, 6));
source_$.subscribe(observer); // 1, 2, 3, 4, 5, 6
source$.subscribe(observer); // 1, 2, 3, 4, 5, 6

/*
 * This works for any array like object as well, for instance,
 * when from receieves a string (which has a length property)
 * it will loop through emitting each character.
 */
// Strings
const source2$ = from('Hello');
// source2$.subscribe(observer); // H, e, l , l, o

/*
 * When from receieves a promise, it will call .then, emitting
 * the response. We will see ways to make requests using an
 * observable interface in upcoming lessons, but for now we will
 * just use fetch.
 */
// Promises
const source3$ = from(fetch('https://api.github.com/users/octocat'));
source3$.subscribe(observer);
// next gets the response

/*
 * When from receieves a iterator it will drop it in a do while loop,
 * calling .next and emitting each item until there are no more items left.
 */

// Iterators
function* hello() {
  yield 'Hello';
  yield 'World';
}

const iterator = hello();
// console.log(iterator.next().value); // Hello
// console.log(iterator.next().value); // World
const source4$ = from(iterator);
// source4$.subscribe(observer);
