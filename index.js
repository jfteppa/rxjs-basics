import { fromEvent, empty, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  switchMap,
  catchError,
  mergeMap,
} from 'rxjs/operators';

/*
 * BEGIN FIRST SECTION
 */
const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

/**
 * for each click it initiates another interval and does not cancel previous
 */
// click$.pipe(mergeMap(() => interval$)).subscribe(console.log);

const clickInstance = click$.pipe(
  /*
   * switchMap switches to a new observable on each emission
   * from the source, cancelling any previous inner
   * observables. For instance, if you click once a new
   * interval observable will be subscribed to internally,
   * with it's values emitted. When you click again,
   * that observable will be completed, and the next
   * interval will be subscribed to, restarting
   * the count. This will happen on each emission from
   * the click$ observable.
   */
  switchMap(() => interval$)
);

// clickInstance.subscribe(console.log);

/*
 * BEGIN SECOND SECTION
 */
const BASE_URL = 'https://api.openbrewerydb.org/breweries';

//elems
const inputBox = document.getElementById('text-input');
const typeaheadContainer = document.getElementById('typeahead-container');

// streams
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    // to test, comment out the debounceTime and go to the network tab
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    // mergeMap((searchTerm) => ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`))
    /*
     * switchMap is perfect for GET requests, as you do
     * not normally care about the previous request
     * to the same URL if another has fired. For instance,
     * in this example if the user continues typing
     * and the previuos request has not returned,
     * switchMap will go ahead and cancel it and only
     * the current request will be considered.
     */
    switchMap((searchTerm) => ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`))
  )
  .subscribe((response) => {
    // update ui
    typeaheadContainer.innerHTML = response.map((b) => b.name).join('<br>');
  });
