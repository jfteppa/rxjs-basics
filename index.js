import { Observable } from 'rxjs';

// const observable = Observable.create // static function does the same as new Observable.

/**
 * the constructor takes a function suscriber that receives a subscriber.
 * this subscriber is an object that handles 3 callbacks (next, error and complete).
 * next can be called several times until complete gets called.
 * after the complete callback gets called next and error won't be call anymore
 * the error callback is called at most 1 time on completion.
 */
const observable = new Observable((subscriber) => {
  subscriber.next('Hello');
  subscriber.next('Wrold');
  subscriber.complete();
  subscriber.next('Hello');
  subscriber.next('Wrold');
});

const observer = {
  next: (value) => console.log('next', value),
  error: (error) => console.log('error', error),
  complete: () => console.log('complete!'),
};

/**
 * in order to hook up an observer to an observable
 * beginning an observable execution you must subscribe.
 */
observable.subscribe(observer);
