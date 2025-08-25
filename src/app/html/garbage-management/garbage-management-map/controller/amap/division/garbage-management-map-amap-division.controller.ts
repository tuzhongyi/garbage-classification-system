import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';
import { GarbageManagementMapAMapDivisionBorderController } from './garbage-management-map-amap-division-border.controller';
import { GarbageManagementMapAMapDivisionPolygonController } from './garbage-management-map-amap-division-polygon.controller';

export class GarbageManagementMapAMapDivisionController {
  constructor(private loca: Loca.Container) {
    this.polygon = new GarbageManagementMapAMapDivisionPolygonController(loca);
    this.border = new GarbageManagementMapAMapDivisionBorderController(loca);
  }

  // items: GarbageManagementMapAMapDivisionItemController[] = [];

  private converter = new GarbageManagementMapAMapConverter();
  private polygon: GarbageManagementMapAMapDivisionPolygonController;
  private border: GarbageManagementMapAMapDivisionBorderController;

  load(datas: MapDivision[]) {
    let geo = {
      line: this.converter.geo.line.array(datas),
      polygon: this.converter.geo.polygon.array(datas),
    };

    let source = {
      line: new Loca.GeoJSONSource({ data: geo.line }),
      polygon: new Loca.GeoJSONSource({ data: geo.polygon }),
    };
    this.polygon.load(source.polygon);
    this.border.load(source.line);
  }
}
