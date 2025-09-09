import { MapMarkerEventPath } from './map-marker-event.path';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';

export class MapMarkerIllegalVehiclePath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-illegal-vehicle`);
  }

  get event() {
    return new MapMarkerEventPath(this.basic);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
