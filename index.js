import { from, interval } from 'rxjs';
import { reduce, scan, map, pluck } from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5];

from(numbers)
  .pipe(reduce((accumulator, currentValue) => accumulator + currentValue))
  .subscribe(console.log);

/*
 * scan is similar to reduce, except it emits each new acculumated
 * value as it occurs. This is great for managing state changes
 * in your application over time.
 */
from(numbers)
  .pipe(scan((accumulator, currentValue) => accumulator + currentValue))
  .subscribe(console.log);

const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: true, token: 'abc' },
  { name: 'Brian', loggedIn: true, token: '123' },
];

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, {})
);

const names$ = state$.pipe(map((state) => state.name));
names$.subscribe(console.log);

// same but less code.
const names2$ = state$.pipe(pluck('name'));
names2$.subscribe(console.log);
