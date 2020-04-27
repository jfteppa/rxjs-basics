import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  subscriber.next('Hello');
  subscriber.next('Wrold');
  subscriber.complete();
});

const observer = {
  next: (value) => console.log('next', value),
  error: (error) => console.log('next', error),
  complete: () => console.log('complete!!!'),
};

// synchronously
console.log('before');
observable.subscribe(observer);
console.log('after');

// asynchronously
const observable2 = new Observable((subscriber) => {
  let count = 0;

  const id = setInterval(() => {
    subscriber.next(count);
    subscriber.complete();
    count += 1;
  }, 1000);

  // we can return a function when the observable completes.
  return () => {
    console.log('calling clearInterval');
    clearInterval(id);
  };
});

observable2.subscribe(observer);
