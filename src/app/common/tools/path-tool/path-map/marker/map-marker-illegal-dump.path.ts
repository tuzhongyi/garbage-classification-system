import { IMapMarkerFull, IMapMarkerOffline } from './map-marker.interface';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';
import { MapMarkerStateFullPath } from './state/map-marker-state-full.path';
import { MapMarkerStateStayPath } from './state/map-marker-state-stay.path';

export class MapMarkerIllegalDumpPath
  extends MapMarkerPathAbstract
  implements IMapMarkerOffline, IMapMarkerFull
{
  constructor(base: string) {
    super(`${base}-illegal-dump`);
  }

  get stay() {
    return new MapMarkerStateStayPath(this.basic);
  }

  get full() {
    return new MapMarkerStateFullPath(this.basic);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
