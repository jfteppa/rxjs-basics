import { interval, empty, concat } from 'rxjs';
import { take, concat as _concat, startWith, delay } from 'rxjs/operators';

const interval$ = interval(1000);
const delayed$ = empty().pipe(delay(1000));

/*
 * concat subscribes to each observable in order,
 * subscribing to the next as the previous completes.
 * Like concatMap, you can think of concat based
 * operators as a single file line.
 */

const concat$ = concat(interval$.pipe(take(3)), interval$.pipe(take(2)));
concat$.subscribe(console.log);

/*
 * There is also a pipeable operator version that can
 * be used to add observables to a pre-existing stream
 * on completion. This version is used far less than
 * static version, but is available if needed.
 */

/*
 * On top of ordering requests, like we saw in the
 * concatMap lesson, concat can also be used for some
 * interesting UI scenarios such as ordering
 * messaging or animations.
 */

delayed$
  .pipe(
    /*
     * Note: I am using alias here because we are also
     * using the concat creation operator on this page.
     */
    _concat(
      delayed$.pipe(startWith('3...')),
      delayed$.pipe(startWith('2...')),
      delayed$.pipe(startWith('1...')),
      delayed$.pipe(startWith('Go!'))
    ),
    startWith('Get Ready!')
  )
  .subscribe(console.log);

concat(
  delayed$,
  delayed$.pipe(startWith('3...')),
  delayed$.pipe(startWith('2...')),
  delayed$.pipe(startWith('1...')),
  delayed$.pipe(startWith('Go!'))
)
  .pipe(startWith('Get Ready!'))
  .subscribe(console.log);
