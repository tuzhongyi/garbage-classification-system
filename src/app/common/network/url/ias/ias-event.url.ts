import { AbstractUrl } from '../abstract.url';

export class IasEventUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`);
  }

  handle(id: string) {
    return `${this.item(id)}/Handle`;
  }

  number() {
    return `${this.basic()}/Numbers`;
  }
}
