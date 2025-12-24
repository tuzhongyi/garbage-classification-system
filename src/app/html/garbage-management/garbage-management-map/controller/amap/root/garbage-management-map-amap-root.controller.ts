import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapDivisionPolygonController } from '../division/garbage-management-map-amap-division-polygon.controller';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';
import { GarbageManagementMapAMapRootBorderController } from './garbage-management-map-amap-root-border.controller';
import { GarbageManagementMapAMapRootWallController } from './garbage-management-map-amap-root-wall.controller';

export class GarbageManagementMapAMapRootController {
  constructor(private loca: Loca.Container) {
    this.border = new GarbageManagementMapAMapRootBorderController(loca);
    this.wall = new GarbageManagementMapAMapRootWallController(loca);
  }
  private border: GarbageManagementMapAMapRootBorderController;
  private wall: GarbageManagementMapAMapRootWallController;
  private polygon?: GarbageManagementMapAMapDivisionPolygonController;

  load(root: MapDivision, datas: MapDivision[]) {
    this.border.load([root]);
    this.wall.load(datas);
    this.loca.animate.start();
  }

  select(data: MapDivision) {
    this.polygon = new GarbageManagementMapAMapDivisionPolygonController(
      this.loca
    );
    let geo = GarbageManagementMapAMapConverter.geo.polygon.array([data]);
    let source = new Loca.GeoJSONSource({ data: geo });
    this.polygon.load(source, data.id);
  }

  blur() {
    if (this.polygon) {
      this.polygon.blur();
      this.polygon = undefined;
    }
  }
}
