export function waiting(
  whether: () => boolean,
  resolve: () => void,
  timepoll = 100
) {
  setTimeout(() => {
    if (whether()) {
      resolve();
    } else {
      waiting(whether, resolve, timepoll);
    }
  }, timepoll);
}
export function wait(
  this: any,
  whether: () => boolean,
  timepoll = 10,
  timeout = 1000 * 1 * 60,
  stopable = true
) {
  return new Promise<void>((resolve, reject) => {
    let stop = false;
    waiting(
      () => {
        return whether() || stop;
      },
      () => {
        if (stop) {
          console.warn('wait2 timeout', this);
          reject();
        } else {
          resolve();
        }
      },
      timepoll
    );
    if (stopable && timeout) {
      setTimeout(() => {
        stop = true;
      }, timeout);
    }
  });
}
