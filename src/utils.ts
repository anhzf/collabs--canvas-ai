/* eslint-disable import/prefer-default-export */

export function debounceWithPromise(inner: Function, ms = 0) {
  let timer: number;
  let resolves: any[] = [];

  // eslint-disable-next-line func-names
  return function (...args: any[]) {
    // Run the function after a certain amount of time
    clearTimeout(timer);
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      const result = inner(...args);
      resolves.forEach((r) => r(result));
      resolves = [];
    }, ms);

    return new Promise((r) => resolves.push(r));
  };
}
