import { interval, fromEvent, of } from 'rxjs';
import {
  scan,
  mapTo,
  takeWhile,
  takeUntil,
  tap,
  startWith,
  endWith,
} from 'rxjs/operators';

/*
 * CODE FOR FOR FIRST SECTION OF LESSON
 */
const numbers$ = of(1, 2, 3);

numbers$
  .pipe(
    /*
     * startWith lets you seed a stream with 1:M values.
     * On subscription, these values will be emitted
     * immediately, followed by any future values from
     * the source.
     */
    startWith('a', 'b', 'c'),

    /*
     * You can also end a stream with any number of values,
     * emitted on completion.
     */
    endWith('d', 'e', 'f')
  )
  .subscribe(console.log);

/*
 * BEGIN SECOND SECTION OF LESSON
 */
// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// streams
const counter$ = interval(1000);
const abort$ = fromEvent(abortButton, 'click');

const COUNTDOWN_FROM = 10;

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, COUNTDOWN_FROM),
    takeWhile((value) => value >= 0),
    takeUntil(abort$),
    /*
     * With startWith, we can seed the stream with
     * the starting countdown value.
     */
    startWith(COUNTDOWN_FROM)
  )
  .subscribe((value) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
