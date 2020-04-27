import { fromEvent } from 'rxjs';

const source$ = fromEvent(document, 'click');

const observer = {
  next: (val) => {
    console.log('next', val);
  },
  error: (val) => {
    console.log('error', error);
  },
  complete: (val) => {
    console.log('complete');
  },
};

const sub1 = source$.subscribe(observer);
const sub2 = source$.subscribe(observer);

setTimeout(() => {
  console.log('unsubscribing');
  sub1.unsubscribe();
  // sub2 still subscribed to the click event.
}, 3000);
