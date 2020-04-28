import { of, interval } from 'rxjs';
import { map, tap, mapTo, scan, filter } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

/*
 * tap can be used to spy on your streams, performing side effects
 * such as logging, and is particularly useful for debugging.
 * In the example below, we are spying on the value before and after
 * the map operator.
 */

/*
 * tap also accepts an observer object, if you wish to also
 * receieve notifications on complete or error. You will use this
 * far less often, but it's good to know just in case...
 */

numbers$
  .pipe(
    // tap((value) => console.log('before', value)),
    tap((value) => {
      // console.log('before', value);
      // tap completely ignores any return value from the function you provide
      return 100;
    }),
    map((value) => value * 10),
    // tap((value) => console.log('after', value))
    tap({
      // next: (value) => console.log('after', value),
      // complete: () => console.log('done!'),
      error: (error) => {
        // do something
      },
    })
  )
  .subscribe((value) => {
    // console.log('from next callback', value);
  });

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
/* const counter$ = interval(1000);

counter$
  .pipe(
    // for each value emitted we map it to -1
    mapTo(-1),
    scan((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 10),
    tap(console.log),
    filter((value) => value >= 0)
  )
  .subscribe((value) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  }); */
