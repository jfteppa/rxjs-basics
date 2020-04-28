import { of, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  /*
   * filter only emits values that pass the provided condition
   */
  filter((value) => value > 2)
);
// .subscribe(console.log); // 3, 4, 5

const keyup$ = fromEvent(document, 'keyup');

const keycode$ = keyup$.pipe(map((event) => event.code));
// keycode$.subscribe(console.log); // logs any keys

const enter$ = keycode$.pipe(filter((code) => code === 'Enter'));
// enter$.subscribe(console.log); // logs only the 'Enter', therefore it logs twice

// same as enter$ but we pipe 2 operators
keyup$
  .pipe(
    map((event) => event.code),
    filter((code) => code === 'Enter')
  )
  .subscribe(console.log);
