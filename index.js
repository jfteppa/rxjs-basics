import { of, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// of(1, 2, 3, 4, 5).subscribe(console.log);

of(1, 2, 3, 4, 5)
  .pipe(
    /*
     * map applies the function you provide on each emitted value,
     * then emits the result.
     */
    map((value) => value * 10)
  )
  .subscribe(console.log);

const keyup$ = fromEvent(document, 'keyup');
keyup$.subscribe(console.log);

/*
 * One popular use case is mapping to a property (or multiple properties)
 * on an object. In this case you can use map like below...
 */
const keycode$ = keyup$.pipe(map((event) => event.code)); // console.log = KeyF, KeyE, Space, Enter, etc...
// keycode$.subscribe(console.log);

/*
 * Or you could use pluck, which accepts the property name you
 * wish to emit. You can also 'pluck' nested properties,
 * for instance: pluck('target', 'value'). I would use whichever
 * you feel is easiest to read (regarding map for single prop vs pluck).
 */
const keycodeWithPluck$ = keyup$.pipe(
  // pluck('code'),

  /* pluck('target'), 
  pluck('outerText'),   */
  // filters from the previous result ^

  // nested properties
  pluck('target', 'outerText') // same as above in 1 line
);
keycodeWithPluck$.subscribe(console.log); // console.log = KeyF, KeyE, Space, Enter, etc...

/*
 * For scenarios where you ALWAYS want to map to the same,
 * static value, you can use mapTo instead. This emits the value
 * you supply on any emissions from the source observable. We will see
 * a few examples of where this can be useful in upcoming lessons.
 */
const pressed$ = keyup$.pipe(mapTo('Key Pressed'));
pressed$.subscribe(console.log);
