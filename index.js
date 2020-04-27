import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  subscriber.next('Hello');
  subscriber.next('Wrold');
  subscriber.complete();
  subscriber.next('Hello');
  subscriber.next('Wrold');
});

/**
 * if we do not supply any of the callbacks,
 * still work fine they will just be ignored.
 */
const observer = {
  next: (value) => console.log('next', value),
};

// we can also not pass an observer to the subscribe function
// observable.subscribe();

// observable.subscribe(observer);

// we can pass the functions directly,
// 1st arg next function, 2nd error and 3rd complete.
observable.subscribe(
  (value) => console.log('next', value),
  // (error) => console.log('next', error),
  null, // if we don't want to pass an callback function for the argument.
  () => console.log('complete!')
);
