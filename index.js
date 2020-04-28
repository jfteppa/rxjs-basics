import { fromEvent, interval } from 'rxjs';
import { scan, map, mapTo, takeWhile, tap } from 'rxjs/operators';

/**
 * BEGIN FIRST SECTION OF LESSON
 */
const click$ = fromEvent(document, 'click');

/*
 * takeWhile emits values as long as they pass
 * the provided condition. As soon as the predicate
 * returns false, takeWhile completes the observable.
 * You can also pass an optional second parameter of true
 * if you want takeWhile to emit the value that caused
 * your condition to return false, before completing.
 */

/* click$
  .pipe(
    map((value) => ({
      x: event.clientX,
      y: event.clientY,
    })),
    // takes until condition is met and DOES NOT RETURN VALUE MEETING CONDITION
    // takeWhile(({ y }) => y <= 200)
    // RETURNS VALUE WHEN CONDITION IS MET
    takeWhile(({ y }) => y <= 200, true)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('Complete!'),
  }); */

/**
 * BEGIN SECOND SECTION OF LESSON
 */

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
const counter$ = interval(1000);

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    // proving the interval stops
    tap(console.log),
    /*
     * Instead of filter let's use takeWhile. This will
     * complete the observable and clean up the interval
     * once the countdown goes below zero, rather than
     * just preventing the numbers from being emitted.
     */
    takeWhile((value) => value >= 0)
  )
  .subscribe({
    next: (value) => {
      countdown.innerHTML = value;
      if (!value) {
        message.innerHTML = 'Liftoff!';
      }
    },
    complete: () => console.log('Complete!'),
  });
