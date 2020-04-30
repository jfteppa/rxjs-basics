import { forkJoin, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay } from 'rxjs/operators';

const numbers$ = of(1, 2, 3);
const letters$ = of('a', 'b', 'c');

forkJoin(numbers$, letters$).subscribe(console.log);
// it logs [3, c]

forkJoin(numbers$, letters$.pipe(delay(3000))).subscribe(console.log);
// it logs [3, c] until 3 seconds

forkJoin({
  numbers: numbers$,
  letters: letters$.pipe(delay(3000)),
}).subscribe(console.log);
// it logs {numbers: 3, letters: "c" }

const GITHUB_API_BASE = 'https://api.github.com';

/*
 * forkJoin waits for all inner observables to complete
 * before emitting the last emitted value of each.
 * The use cases for forkJoin are generally similar to
 * Promise.all
 */
forkJoin({
  user: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`),
  repo: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex/repos`),
}).subscribe(console.log);

/*
 * You can also pass in comma seperated arugments and
 * receieve an array in return. This is the only option if
 * you are using less than RxJS 6.5
 */

//  by index, position 0 we call it user, position 2 will be repos
forkJoin(
  ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`),
  ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex/repos`)
).subscribe(([user, repos]) => {
  // perform action
  console.log(user);
  console.log(repos);
});
