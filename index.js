import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

/*
 * Calculate progress based on scroll position
 */
function calculateScrollPercent(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar = document.querySelector('.progress-bar');

// streams
const scroll$ = fromEvent(document, 'scroll');

const progress$ = scroll$.pipe(
  map(({ target }) => calculateScrollPercent(target.scrollingElement))
);

/*
 * We can then take the emitted percent and set the width
 * on our progress bar.
 */
progress$.subscribe((percent) => {
  progressBar.style.width = `${percent}%`;
  console.log(percent);
});
