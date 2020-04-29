import { fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, catchError, takeUntil, map } from 'rxjs/operators';

/*
 * BEGIN FIRST SECTION
 */
const click$ = fromEvent(document, 'click');
const interval$ = interval(1000);

// click$.pipe(
/*
 * mergeMap invokes the function you provide,
 * subscribing to each returned observable internally.
 * Any values emitted by these inner observables
 * are then emitted by mergeMap. By default there
 * is no limit to the number of active inner
 * subscriptions that can be active at a time
 * with mergeMap, so if you continually click on
 * the page more and more timers will be activated.
 * This can be dangerous if you have long
 * running inner observables and forget to clean
 * them up.
 */
//   mergeMap(() => interval$)
// ).subscribe(console.log);

/*
 * BEGIN SECOND SECTION
 */
const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(
    /*
     * In this case, we are mapping to a new interval
     * observable on mousedown, but we are limiting it's
     * lifetime by using the takeUntil operator with
     * the mouseup$ stream.
     */
    mergeMap(() => interval$.pipe(takeUntil(mouseup$)))
  )
  .subscribe(console.log);

/*
 * BEGIN THIRD SECTION
 */
const coordinates$ = click$.pipe(
  map((event) => ({
    x: event.clientX,
    y: event.clientY,
  }))
);

const coordinatesWithSave$ = coordinates$.pipe(
  /*
   * mergeMap is good for 'fire and forget' save request
   * you do not want to be cancelled. For instance, in this
   * example we are emulating a save of coordinates
   * anytime the user clicks on the page.
   */
  mergeMap((coords) =>
    ajax.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed', coords)
  )
);

coordinatesWithSave$.subscribe(console.log);
