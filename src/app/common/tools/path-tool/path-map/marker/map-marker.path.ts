import { MapMarkerIllegalDropPath } from './map-marker-illegal-drop.path';
import { MapMarkerIllegalVehiclePath } from './map-marker-illegal-vehicle.path';
import { MapMarkerMixedIntoPath } from './map-marker-mixed-into.path';

export class MapMarkerPath {
  constructor(path: string) {
    this.basic = `${path}/map-marker`;
  }

  private basic: string;

  get illegaldrop() {
    return new MapMarkerIllegalDropPath(this.basic);
  }
  get mixedinto() {
    return new MapMarkerMixedIntoPath(this.basic);
  }
  get illegalvehicle() {
    return new MapMarkerIllegalVehiclePath(this.basic);
  }
  get unknow() {
    return `${this.basic}-unknow.png`;
  }
  get patrol() {
    return `${this.basic}-patrol.png`;
  }
}
