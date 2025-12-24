import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

export class GarbageManagementMapRootController {
  constructor(private amap: GarbageManagementMapAMapController) {}
  async load(root: MapDivision, datas: MapDivision[]) {
    this.amap.root.get().then((x) => {
      x.load(root, datas);
    });
  }

  select(data: MapDivision) {
    this.amap.root.get().then((x) => {
      x.select(data);
    });
  }
  blur() {
    this.amap.root.get().then((x) => {
      x.blur();
    });
  }
}
