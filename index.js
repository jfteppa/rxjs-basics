import { Observable } from 'rxjs';

const observer = {
  next: (value) => console.log('next', value),
  error: (error) => console.log('next', error),
  complete: () => console.log('complete!!!'),
};

const observable = new Observable((subscriber) => {
  let count = 0;

  const id = setInterval(() => {
    subscriber.next(count);
    count += 1;
  }, 1000);

  return () => {
    console.log('id', id);
    console.log('calling clearInterval');
    clearInterval(id);
  };
});

const subscription = observable.subscribe(observer);

/* setTimeout(() => {
  subscription.unsubscribe();
}, 3500); */

/**
 * Note: Calling unsubscribe will not fire your complete callback,
 * but it will call the returned function.
 */

const subscription2 = observable.subscribe(observer);

/*
 * Subscriptions can be added together using the add method,
 * you can then unsubscribe to multiple at the same time.
 * This is simply personal preference, unsubscribing individually
 * will produce the same result. Also, in future lessons, we will see how
 * to automate this unsubscribe process with operators.
 */

subscription.add(subscription2);

setTimeout(() => {
  // unsubscribing individually
  /* subscription.unsubscribe();
  subscription2.unsubscribe(); */

  // unsubscribe to multiple at the same time
  subscription.unsubscribe();
}, 3500);
