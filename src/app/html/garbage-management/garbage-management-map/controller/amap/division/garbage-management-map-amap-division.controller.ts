import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';
import { GarbageManagementMapAMapDivisionBorderController } from './garbage-management-map-amap-division-border.controller';
import { GarbageManagementMapAMapDivisionPolygonController } from './garbage-management-map-amap-division-polygon.controller';

export class GarbageManagementMapAMapDivisionController {
  constructor(private loca: Loca.Container) {
    this.polygon = new GarbageManagementMapAMapDivisionPolygonController(loca);
    this.border = new GarbageManagementMapAMapDivisionBorderController(loca);
    this.regist();
  }

  // items: GarbageManagementMapAMapDivisionItemController[] = [];

  private polygon: GarbageManagementMapAMapDivisionPolygonController;
  private border: GarbageManagementMapAMapDivisionBorderController;

  private regist() {
    this.polygon.event.over.subscribe((id) => {
      this.border.over(id);
    });
    this.polygon.event.out.subscribe(() => {
      this.border.out();
    });
  }

  load(datas: MapDivision[]) {
    let geo = {
      line: GarbageManagementMapAMapConverter.geo.line.array(datas),
      polygon: GarbageManagementMapAMapConverter.geo.polygon.array(datas),
    };

    let source = {
      line: new Loca.GeoJSONSource({ data: geo.line }),
      polygon: new Loca.GeoJSONSource({ data: geo.polygon }),
    };
    this.polygon.load(source.polygon);
    this.border.load(source.line);
  }

  select(id: string) {
    this.border.out();
    this.border.over(id);
    this.polygon.select(id);
  }
}
