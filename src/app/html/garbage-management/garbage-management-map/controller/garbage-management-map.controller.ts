import { Injectable } from '@angular/core';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

@Injectable()
export class GarbageManagementMapController {
  constructor(private amap: GarbageManagementMapAMapController) {}

  move(center: [number, number]) {
    this.amap.move(center);
  }

  fit() {
    this.amap.fit();
  }

  load = {
    root: (data: MapDivision) => {
      this.amap.root.get().then((x) => {
        x.load(data);
      });
    },
    division: (datas: MapDivision[]) => {
      this.amap.division.get().then((x) => {
        x.load(datas);
      });
    },
    station: (datas: GarbageStation[]) => {
      this.amap.station.get().then((x) => {
        x.load(datas);
      });
    },
  };
}
