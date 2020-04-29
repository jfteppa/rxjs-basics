import { of, from } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  scan,
  map,
} from 'rxjs/operators';

const numbers$ = of(1, '1', 1, 2, 3, 3, 3, 4, 5, 3);

// numbers$.subscribe(console.log);

/*
 * distinctUntilChanged emits unique values based
 * on a === comparison to the last emitted value.
 */

numbers$.pipe(distinctUntilChanged()).subscribe(console.log);
// 1, '1', 1, 2, 3, 4, 5, 3
// remember ===

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

/*
 * If comparing based on a property you can use
 * the distinctUntilKeyChanged helper operator instead.
 */

/*
 * If you need to use a custom comparer, you can
 * pass distinctUntilChanged a comparer function.
 * ex. distinctUntilChanged((prev, curr) => {
 *   return prev.name === curr.name;
 * })
 */
const name$ = state$.pipe(
  // without returning just the name value
  // distinctUntilChanged(), // Brian 3 times
  // because it is comparing object1 === object2

  // first returning onnly the name value with map
  // map((state) => state.name),
  // distinctUntilChanged() // Brian only 1 time

  // filtering objects by key value and then just
  /* distinctUntilChanged((previousObject, currentObject) => {
    return previousObject.name === currentObject.name; // first Object
  }), */

  // short version of comparing prevObj and currObj by key value
  distinctUntilKeyChanged('name'), // first Object

  map((state) => state.name)
);

name$.subscribe(console.log);
