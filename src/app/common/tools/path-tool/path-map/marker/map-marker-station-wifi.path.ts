import {
  IMapMarkerFull,
  IMapMarkerOffline,
  IMapMarkerStay,
} from './map-marker.interface';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';
import { MapMarkerStateFullPath } from './state/map-marker-state-full.path';
import { MapMarkerStateStayPath } from './state/map-marker-state-stay.path';

export class MapMarkerStationWifiPath
  extends MapMarkerPathAbstract
  implements IMapMarkerOffline, IMapMarkerFull, IMapMarkerStay
{
  constructor(base: string) {
    super(`${base}-wifi`);
  }

  get full() {
    return new MapMarkerStateFullPath(this.basic);
  }
  get stay() {
    return new MapMarkerStateStayPath(this.basic);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
