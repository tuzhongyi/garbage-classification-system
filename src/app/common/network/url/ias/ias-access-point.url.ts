import { AbstractUrl } from '../abstract.url';

export class IasAccessUrl {
  constructor(private base: string) {}

  get point() {
    return new IasAccessPointUrl(this.base);
  }
}

class IasAccessPointUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/AccessPoint`);
  }

  sync(id: string) {
    return `${this.item(id)}/Sync`;
  }
}
