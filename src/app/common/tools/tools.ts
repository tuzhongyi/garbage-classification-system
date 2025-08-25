export function wait(
  whether: () => boolean,
  reject: () => void,
  timepoll = 100
) {
  setTimeout(() => {
    if (whether()) {
      reject();
    } else {
      wait(whether, reject, timepoll);
    }
  }, timepoll);
}
export function wait2(
  whether: () => boolean,
  timepoll = 10,
  timeout = 1000 * 1 * 60
) {
  return new Promise<void>((resolve, reject) => {
    let stop = false;
    wait(
      () => {
        return whether() || stop;
      },
      () => {
        if (stop) {
          console.warn('wait2 timeout');
          reject();
        } else {
          resolve();
        }
      },
      timepoll
    );
    if (timeout) {
      setTimeout(() => {
        stop = true;
      }, timeout);
    }
  });
}
