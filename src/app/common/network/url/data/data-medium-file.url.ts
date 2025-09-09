import { AbstractUrl } from '../abstract.url';

export class DataMediumFileUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Files`);
  }
}
