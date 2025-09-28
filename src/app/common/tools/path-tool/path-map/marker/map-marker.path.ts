import { MapMarkerConstructionPath } from './map-marker-construction.path';
import { MapMarkerIllegalDropPath } from './map-marker-illegal-drop.path';
import { MapMarkerIllegalVehiclePath } from './map-marker-illegal-vehicle.path';
import { MapMarkerStationPath } from './map-marker-station.path';

export class MapMarkerPath {
  constructor(path: string) {
    this.basic = `${path}/map-marker`;
  }

  private basic: string;

  get station() {
    return new MapMarkerStationPath(this.basic);
  }
  get construction() {
    return new MapMarkerConstructionPath(this.basic);
  }
  get illegalvehicle() {
    return new MapMarkerIllegalVehiclePath(this.basic);
  }
  get illegaldrop() {
    return new MapMarkerIllegalDropPath(this.basic);
  }
  get unknow() {
    return `${this.basic}-unknow.png`;
  }
  get patrol() {
    return `${this.basic}-patrol.png`;
  }
  get ias() {
    return `${this.basic}-ias-record.png`;
  }
}
