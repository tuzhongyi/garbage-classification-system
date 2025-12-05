import { MapMarkerIllegalDropPath } from './map-marker-illegal-drop.path';
import { MapMarkerIllegalDumpPath } from './map-marker-illegal-dump.path';
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
  get illegaldump() {
    return new MapMarkerIllegalDumpPath(this.basic);
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
    return {
      red: `${this.basic}-ias-record-red.png`,
      orange: `${this.basic}-ias-record-orange.png`,
    };
  }
}
