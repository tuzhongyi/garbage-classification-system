import { AbstractUrl } from '../abstract.url';

export class IasDeviceUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Devices`);
  }

  handle(id: string) {
    return `${this.item(id)}/Handle`;
  }

  get route() {
    return new IasDeviceRouteUrl(this.basic());
  }
}

class IasDeviceRouteUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Routes`);
  }

  statistic() {
    return `${this.basic()}/Statistic`;
  }
}
