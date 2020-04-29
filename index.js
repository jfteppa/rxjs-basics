import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, map, mergeAll, mergeMap } from 'rxjs/operators';

//elems
const textInput = document.getElementById('text-input');

// streams
const input$ = fromEvent(textInput, 'keyup');

input$
  .pipe(
    debounceTime(500),
    map((e) => e.target.value)
  )
  .subscribe(console.log); // it prints just a string

input$
  .pipe(
    debounceTime(500),
    map((event) => {
      const value = event.target.value;
      return ajax.getJSON(`
      https://api.github.com/users/${value}`);
    })
  )

  /**
   * it does not log a response from the network request,
   * it logs the ajax observable
   */
  // .subscribe(console.log);

  // we know we are receiving an observable
  .subscribe((obs) => {
    obs.subscribe(console.log); // we log the response
    /**
     * but in order to filter some data we will need to add pipe
     * we will be in a callback hell loop situation, nested subscriptions
     * obs.pipe(...).subscribe((obs2) => { obs.subscribe(...) })
     */
  });

input$
  .pipe(
    debounceTime(500),
    map((event) => {
      const value = event.target.value;
      return ajax.getJSON(`
      https://api.github.com/users/${value}`);
    }),
    mergeAll()
  )
  .subscribe(console.log); // it logs the network request response

input$
  .pipe(
    debounceTime(500),
    // mergeAll and map in 1 operator
    mergeMap((event) => {
      const value = event.target.value;
      return ajax.getJSON(`
      https://api.github.com/users/${value}`);
    })
  )
  .subscribe(console.log); // it logs the network request response
