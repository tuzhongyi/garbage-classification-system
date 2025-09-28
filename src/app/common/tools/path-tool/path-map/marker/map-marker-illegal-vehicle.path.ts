import { IMapMarkerOffline } from './map-marker.interface';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';

export class MapMarkerIllegalVehiclePath
  extends MapMarkerPathAbstract
  implements IMapMarkerOffline
{
  constructor(base: string) {
    super(`${base}-illegal-vehicle`);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
