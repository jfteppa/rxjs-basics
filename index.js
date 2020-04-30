import { fromEvent, timer, empty } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  takeUntil,
  pluck,
  mergeMapTo,
  exhaustMap,
  tap,
  finalize,
  switchMapTo,
  catchError,
} from 'rxjs/operators';

// elems
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pollingStatus = document.getElementById('polling-status');
const dogImage = document.getElementById('dog');

// streams
const startClick$ = fromEvent(startButton, 'click');
const stopClick$ = fromEvent(stopButton, 'click');

const startClickObs = startClick$.pipe(
  /*
   * Every start click we will map to an interval which
   * emits every 5 seconds to request a new image.
   * Since we do not want multiple polls active at once,
   * we'll use exhaustMap to ignore any emissions
   * while the inner interval is running.
   */

  // updating the satus to Active
  tap(() => {
    console.log('updating status');
    return (pollingStatus.innerHTML = 'Active');
  }),
  /**
   * we switch from mergeMapTo to exhaustMap
   * because the timer will never stop until the user clicks the stop button
   * so while the event is not cancelled al the other events are ignored!
   * no switching to the new one, no creating queues and not triggering all the clicks
   */
  // mergeMapTo(
  exhaustMap(() =>
    /**
     * we could use interval but since we want to trigger at click at not later
     * we use timer instead of interval
     */
    timer(0, 5000).pipe(
      /**
       * it is updating the value every 5 seconds until stop button is clicked
       * we can moved this out at the beggining
       */
      /* 
        tap(() => {
          console.log('tapping');
          return (pollingStatus.innerHTML = 'Active');
        }), */
      /**
       * we use switchMapTo in case one request
       * takes longer than 5seconds to finalize
       * so we swtich to the new/next request
       */
      switchMapTo(
        /**
         * we make the request and
         * use pipe to filter the value returned and
         * to catch any errors
         */
        ajax.getJSON('https://random.dog/woof.json').pipe(
          /**
           * we just grab the object url value
           */
          pluck('url'),
          /**
           * in case of error, we catch the error
           * and kepp the app observable running
           */
          catchError((error, caught) => {
            console.log('error: ', error.message);
            return empty();
          })
        )
      ),
      /**
       * stops when the user clicks the stop button
       */
      takeUntil(stopClick$),
      /**
       * is triggered when the inner oberser
       * in this case the timer is complete
       */
      finalize(() => {
        console.log('stopping inner observable (timer)');
        pollingStatus.innerHTML = 'Stopped';
      })
    )
  )
);

startClickObs.subscribe((url) => {
  console.log('updating image');
  /**
   * update the image src when we get the value
   */
  dogImage.src = url;
});
