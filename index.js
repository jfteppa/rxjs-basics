import { fromEvent, combineLatest, interval, merge } from 'rxjs';
import { map, filter, withLatestFrom, take } from 'rxjs/operators';

// streams
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// merge(keyup$, click$).subscribe(console.log);

/*
 * Each time any stream provided to combineLatest
 * emits a value, the latest value from all provided
 * streams will be emitted as an array.
 *
 * Note that all provided streams must emit at least one value
 * before combineLatest will emit any values.
 */
// combineLatest(keyup$, click$).subscribe(console.log);

// elems
const first = document.getElementById('first');
const second = document.getElementById('second');

// helpers
const keyupAsValue = (elem) => {
  return fromEvent(elem, 'keyup').pipe(
    map((event) => event.target.valueAsNumber)
  );
};

/*
 * combineLatest is great when an element depends
 * on the combination of multiple streams to make
 * some calculation or determination. We will explore
 * this concept further in the next lab.
 */
combineLatest(keyupAsValue(first), keyupAsValue(second))
  .pipe(
    filter(([first, second]) => {
      return !isNaN(first) && !isNaN(second);
    }),
    map(([first, second]) => first + second)
  )
  .subscribe(console.log);

/*
 * When you want to augment one stream with
 * information from a second stream on emitted values,
 * withLatestFrom is a perfect choice.
 */

/**
 * this one will emit only when you click
 * with the latest value from both
 */
click$
  .pipe(withLatestFrom(interval(1000).pipe(take(10))))
  .subscribe(console.log);

/**
 * this one will emit when you click and also
 * will emit for each value from the interval
 * with the latest value from both
 */
combineLatest(click$, interval(1000).pipe(take(10))).subscribe(console.log);
