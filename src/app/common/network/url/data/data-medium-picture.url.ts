import { AbstractUrl } from '../abstract.url';

export class DataMediumPictureUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Pictures`);
  }

  from = {
    file: () => {
      return `${this.basic()}/FromFile`;
    },
  };

  data(id: string) {
    return `${this.item(id)}/Data`;
  }
}
