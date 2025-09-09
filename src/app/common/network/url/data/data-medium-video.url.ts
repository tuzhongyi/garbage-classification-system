import { AbstractUrl } from '../abstract.url';

export class DataMediumVideoUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Videos`);
  }

  from = {
    file: () => {
      return `${this.basic()}/FromFile`;
    },
  };

  get task() {
    return new DataMediumVideoTaskUrl(this.basic());
  }
}
export class DataMediumVideoTaskUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Tasks`);
  }
}
