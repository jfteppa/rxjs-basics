import { fromEvent, interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap, catchError, take, delay, switchMap } from 'rxjs/operators';

/*
 * BEGIN FIRST SECTION
 */
const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

const swithMapObs = click$.pipe(switchMap(() => interval$));
// swithMapObs.subscribe(console.log);

const concatMapObs = click$.pipe(
  /*
   * concat based operators are the 'single file line'
   * of operators, maintaining 1 active inner observable at
   * a time. For instance, in this example on the first click a new
   * interval observable will be subscribed to internally,
   * with any emitted values being emitted by concatMap.
   * If you click again while that inner interval
   * is active, the next interval will be queued until
   * the current active interval completes. At this point,
   * the next inner observable will be activated and so on...
   */
  concatMap(() => interval$.pipe(take(3)))
);
// concatMapObs.subscribe(console.log);

/**
 * it will not start the other events until the previous is done.
 */

/*
 * BEGIN SECOND SECTION
 */
const saveAnswer = (answer) => {
  // simulate delayed request
  return of(`Saved: ${answer}`).pipe(delay(1500));
};

// elems
const radioButtons = document.querySelectorAll('.radio-option');

// streams
const answerChange$ = fromEvent(radioButtons, 'click');

answerChange$
  .pipe(
    /*
     * concatMap can be useful if you need to queue
     * requests client side. For instance, in this example
     * we are emulating save requests on a quiz, ensuring
     * order remains in tact by not initiating the next
     * request until the previous completes. Be careful though,
     * as long running inner observables could cause backups.
     */
    concatMap((event) => saveAnswer(event.target.value))
  )
  .subscribe(console.log);
