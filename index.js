import { from, interval } from 'rxjs';
import { reduce, take } from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5];

/*
 * Reducer functions take the accumulated value (last return)
 * and current value, returning a new accumulated value.
 * You can think of this like a snowball rolling downhill,
 * collecting values over time.
 */
const totalReducer = (accumulator, currentValue) => {
  console.log({ accumulator, currentValue });
  return accumulator + currentValue;
};

const total = numbers.reduce(totalReducer, 0);
console.log(total);

/*
 * Our reducer function is invoked on each emission and the accumulated
 * value stored. On completion the current accumulated value is emitted.
 * In this example we are supplying a seed value (initial accumulator) of 0
 * as the second parameter.
 */
from(numbers).pipe(reduce(totalReducer, 0)).subscribe(console.log);

from(numbers).pipe(take(3), reduce(totalReducer, 0)).subscribe(console.log);

interval(2000)
  .pipe(take(3), reduce(totalReducer, 0))
  .subscribe({
    next: console.log,
    complete: () => console.log('complete!!!'),
  });

/*
 * Important! reduce only emits one value, the final accumulated value
 * on completion. We are forcing completion by using the take operator.
 * If you want to emit each new accumulated value, you will use the scan
 * operator, which is the focus of the next lesson.
 */
