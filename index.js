import { interval } from 'rxjs';
import { scan, mapTo, filter, take } from 'rxjs/operators';

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
const counter$ = interval(1000);

/* counter$
  .pipe(
    // for each value emitted we map it to -1
    mapTo(-1),
    scan((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 10),
    filter((value) => value >= 0)
  )
  .subscribe((value) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  }); */

/**
 * with the example from above the interval never stops
 * with this new example it completes wen it takes 10 numbers
 */

const test$ = interval(1000)
  .pipe(
    mapTo(-1),
    scan((a, c) => {
      console.log({ a, c });
      return a + c;
    }, 10),
    take(10)
  )
  .subscribe({
    next: (value) => {
      console.log(value);
      countdown.innerHTML = value;
    },
    complete: () => {
      console.log('complete');
      message.innerHTML = 'Liftoff!';
    },
  });
