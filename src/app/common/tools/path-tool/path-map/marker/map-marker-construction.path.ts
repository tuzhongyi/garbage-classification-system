import { IMapMarkerFull, IMapMarkerOffline } from './map-marker.interface';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';
import { MapMarkerStateFullPath } from './state/map-marker-state-full.path';

export class MapMarkerConstructionPath
  extends MapMarkerPathAbstract
  implements IMapMarkerOffline, IMapMarkerFull
{
  constructor(base: string) {
    super(`${base}-construction`);
  }

  get full() {
    return new MapMarkerStateFullPath(this.basic);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
