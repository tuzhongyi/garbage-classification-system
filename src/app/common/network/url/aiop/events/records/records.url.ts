import { EventsUrl } from '../events.url';

export abstract class RecordsUrl extends EventsUrl {
  static override get basic(): string {
    return `${super.basic}/Records`;
  }
}
