import { MapMarkerStationWifiPath } from './map-marker-station-wifi.path';
import {
  IMapMarkerFull,
  IMapMarkerOffline,
  IMapMarkerStay,
} from './map-marker.interface';
import { MapMarkerPathAbstract } from './map-marker.path.abstract';
import { MapMarkerStateFullPath } from './state/map-marker-state-full.path';
import { MapMarkerStateStayPath } from './state/map-marker-state-stay.path';

export class MapMarkerStationPath
  extends MapMarkerPathAbstract
  implements IMapMarkerOffline, IMapMarkerFull, IMapMarkerStay
{
  constructor(base: string) {
    super(`${base}-station`);
  }

  get full() {
    return new MapMarkerStateFullPath(this.basic);
  }
  get stay() {
    return new MapMarkerStateStayPath(this.basic);
  }

  get wifi() {
    return new MapMarkerStationWifiPath(this.basic);
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
