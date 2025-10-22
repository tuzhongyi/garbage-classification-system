import { wait } from '../tools/wait.tools';

export class PromiseValue<T> {
  private _value?: T;
  get(): Promise<T> {
    return new Promise<T>((resolve) => {
      if (this._value) {
        resolve(this._value);
      } else {
        wait(
          () => {
            return !!this._value;
          },
          undefined,
          undefined,
          false
        ).then(() => {
          if (this._value) {
            resolve(this._value);
          }
        });
      }
    });
  }
  set(value: T): void {
    this._value = value;
  }

  clear() {
    this._value = undefined;
  }
  get exists(): boolean {
    return !!this._value;
  }
}
