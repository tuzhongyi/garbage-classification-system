import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

export class GarbageManagementMapDivisionController {
  constructor(private amap: GarbageManagementMapAMapController) {}

  load(datas: MapDivision[]) {
    this.amap.division.get().then((x) => {
      x.load(datas);
    });
  }
  select(id: string) {
    this.amap.division.get().then((x) => {
      x.select(id);
    });
  }
}
