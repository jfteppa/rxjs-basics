import { interval, fromEvent, of, merge, empty } from 'rxjs';
import {
  scan,
  mapTo,
  takeWhile,
  takeUntil,
  tap,
  startWith,
  switchMap,
} from 'rxjs/operators';

/*
 * CODE FOR FOR FIRST SECTION OF LESSON
 */
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// keyup$.subscribe(console.log);
// click$.subscribe(console.log);

/*
 * merge subscribes to all provided streams on subscription,
 * emitting any values emitted by these streams.
 */
merge(keyup$, click$).subscribe(console.log);

/*
 * BEGIN SECOND SECTION OF LESSON
 */
// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const pauseButton = document.getElementById('pause');
const startButton = document.getElementById('start');

// streams
const counter$ = interval(1000);
const pauseClick$ = fromEvent(pauseButton, 'click');
const startClick$ = fromEvent(startButton, 'click');

const COUNTDOWN_FROM = 10;

/*
 * With merge, we can combine the start and pause
 * streams, taking relevant action below depending
 * on which stream emits a value.
 */
merge(
  // mapping any emitted values (click event object) to true/false
  startClick$.pipe(mapTo(true)),
  pauseClick$.pipe(mapTo(false))
)
  .pipe(
    /*
     * Depending on whether start or pause was clicked,
     * we'll either switch to the interval observable,
     * or to an empty observable which will act as a pause.
     */
    switchMap((shouldStart) => {
      return shouldStart ? counter$ : empty();
    }),
    /**
     * mapping any emitted/receiving values to -1,
     * this case the counter values (0, 1, 2, ...)
     * the empty observable will pause the counter
     */
    mapTo(-1),
    /**
     * for each value received we sacn it
     * and we do a reduce function starting with a inital value of COUNTDOWN_FROM
     */
    scan((accumulator, current) => {
      return accumulator + current;
    }, COUNTDOWN_FROM),

    takeWhile((value) => value >= 0),
    /**
     * we start the value not with (10 - 1)
     * but with 10 and then it gets the value from scan
     */
    startWith(COUNTDOWN_FROM)
  )
  .subscribe((value) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
