import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';
import { GarbageManagementMapAMapRootBorderController } from './garbage-management-map-amap-root-border.controller';

export class GarbageManagementMapAMapRootController {
  border: GarbageManagementMapAMapRootBorderController;

  constructor(private loca: Loca.Container) {
    this.border = new GarbageManagementMapAMapRootBorderController(loca);
  }

  private converter = new GarbageManagementMapAMapConverter();

  load(data: MapDivision) {
    let geo = this.converter.geo.line.item(data);
    let source = new Loca.GeoJSONSource({ data: geo });
    this.border.load(source);
    this.loca.animate.start();
  }
}
