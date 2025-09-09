import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapRootBorderController } from './garbage-management-map-amap-root-border.controller';
import { GarbageManagementMapAMapRootWallController } from './garbage-management-map-amap-root-wall.controller';

export class GarbageManagementMapAMapRootController {
  constructor(private loca: Loca.Container) {
    this.border = new GarbageManagementMapAMapRootBorderController(loca);
    this.wall = new GarbageManagementMapAMapRootWallController(loca);
  }
  private border: GarbageManagementMapAMapRootBorderController;
  private wall: GarbageManagementMapAMapRootWallController;

  load(root: MapDivision, datas: MapDivision[]) {
    this.border.load([root]);
    this.wall.load(datas);
    this.loca.animate.start();
  }
}
