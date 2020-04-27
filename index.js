import { interval, timer } from 'rxjs';

/*
 * interval emits numbers in sequence based on the
 * duration that you specify. In this case, a number
 * will be emitted every 1000ms (1s)
 */

/*
 * We'll just supply a function for next in this case,
 * rather than observer object.
 *
 * Remember if you onle provide a single element to subscribe,
 * that function is register as the 'next' callback
 */
const interval$ = interval(1000);
// interval$.subscribe(console.log);

/*
 * If you need the first item to be emitted on an interval
 * different than the rest, you can use the timer operator instead.
 * For example, let's have the first item emit after 2 seconds,
 * followed and the others every 1 seconfs.
 */
const timer$ = timer(2000, 1000);
// timer$.subscribe(console.log);

/*
 * You can also emit a single item after a specified duration, then complete,
 * by just supplying the first argument.
 */
const timer2$ = timer(2000);
timer2$.subscribe(console.log);
