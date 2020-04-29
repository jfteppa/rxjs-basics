import { fromEvent, interval } from 'rxjs';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  debounce,
  map,
} from 'rxjs/operators';

//elems
const inputBox = document.getElementById('text-input');
const input$ = fromEvent(inputBox, 'keyup');

// streams
const click$ = fromEvent(document, 'click');
const keyup$ = fromEvent(inputBox, 'keyup');

// click$.pipe(debounceTime(1000)).subscribe(console.log);
// it logs the last click after 1 second pause

// keyup$.pipe(debounceTime(1000)).subscribe(console.log);
// it logs the last key entered in the input after 1 second pause

/*
 * debounceTime emits the last emitted value from the source
 * after a pause, based on a duration you specify.
 * For instance, in this case when the user starts typing all values
 * will be ignored until they paused for at least 500ms,
 * at which point the last value will be emitted.
 */
keyup$
  .pipe(
    debounceTime(500),
    // debounce(() => interval(500)),

    // map((event) => event.target.value),
    pluck('target', 'value'), //short

    /*
     * If the user types, then backspaces quickly, the same value could
     * be emitted twice in a row. Using distinctUntilChanged will prevent
     * this from happening.
     */
    distinctUntilChanged()
  )
  .subscribe(console.log);
