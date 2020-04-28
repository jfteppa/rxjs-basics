import { of, fromEvent } from 'rxjs';
import { take, map, first, filter } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

// numbers$.subscribe(console.log);

/*
 * take emits the first x values from the source,
 * then completes. In this case, 1,2,3 will be emitted.
 */
numbers$.pipe(take(3)).subscribe({
  next: console.log,
  complete: () => console.log('Complete!'),
});

const click$ = fromEvent(document, 'click');

/* click$
  .pipe(
    map((value) => ({
      x: event.clientX,
      y: event.clientY,
    })),
    take(1)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('Complete!'),
  }); */

/*
 * In this example, we will take the first value that matches
 * the provided criteria before completing. While we could use
 * a combination of filter(condition) and take(1), we can also
 * use the first operator to fulfill the same use case.
 * If you supply no values to first, it is equivalent to take(1).
 */

click$
  .pipe(
    map((value) => ({
      x: event.clientX,
      y: event.clientY,
    })),
    // filter(({ y }) => y > 200), // filters everything to be y > 200
    // take(1) // takes 1 and completes
    first(({ y }) => y > 200) // filter and take in 1 operator
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('Complete!'),
  });
