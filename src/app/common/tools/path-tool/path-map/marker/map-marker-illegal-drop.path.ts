import { IMapMarkerOffline, IMapMarkerStay } from './map-marker.interface';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';
import { MapMarkerStateStayPath } from './state/map-marker-state-stay.path';

export class MapMarkerIllegalDropPath
  extends MapMarkerPathAbstract
  implements IMapMarkerOffline, IMapMarkerStay
{
  constructor(base: string) {
    super(`${base}-illegal-drop`);
  }

  get stay() {
    return new MapMarkerStateStayPath(this.basic);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
