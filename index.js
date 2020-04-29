import { fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  take,
  mergeMap,
  switchMap,
  concatMap,
  exhaustMap,
} from 'rxjs/operators';

const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

// it queues the events
const concatMapObs = click$.pipe(concatMap(() => interval$.pipe(take(3))));
// concatMapObs.subscribe(console.log);

// it ignores all the events until previous finishes
const exhaustMapObs = click$.pipe(exhaustMap(() => interval$.pipe(take(3))));
// exhaustMapObs.subscribe(console.log);

// example login, prevent multiple clicks on login until finishes
const authenticateUser = () => {
  return ajax.post('https://reqres.in/api/login', {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });
};

// DOM elements
const loginButton = document.getElementById('login');

const login$ = fromEvent(loginButton, 'click');

// all requests are initiated
const mergeMapSubs = login$.pipe(mergeMap(() => authenticateUser()));
// mergeMapSubs.subscribe(console.log);

// only requests but the last one will be canceled
const switchMapSubs = login$.pipe(switchMap(() => authenticateUser()));
// switchMapSubs.subscribe(console.log);

// all requests will be initiated in order, one after the previous is done
const concatMapSubs = login$.pipe(concatMap(() => authenticateUser()));
// concatMapSubs.subscribe(console.log);

// the 1st request will be initiated and the other ones will be ignored
// until the 1st one or previous is done
const exhaustMapSubs = login$.pipe(exhaustMap(() => authenticateUser()));
exhaustMapSubs.subscribe(console.log);
