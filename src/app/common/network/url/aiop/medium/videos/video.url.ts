import { MediumUrl } from '../medium.url';

export class MediumVideoUrl extends MediumUrl {
  protected static override get basic(): string {
    return `${super.basic}/Videos`;
  }
  static mkv(id: string) {
    return `${this.basic}/${id}.mkv`;
  }
}
