import { Injectable } from '@angular/core';
import { EventType } from '../../../../common/enum/event-type.enum';
import { IasDevice } from '../../../../common/network/model/ias/ias-device.model';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

@Injectable()
export class GarbageManagementMapController {
  constructor(private amap: GarbageManagementMapAMapController) {}

  move(center: [number, number]) {
    this.amap.move(center);
  }

  fit(datas?: any) {
    this.amap.fit(datas);
  }

  root = {
    load: async (root: MapDivision, datas: MapDivision[]) => {
      this.amap.root.get().then((x) => {
        x.load(root, datas);
      });
    },
  };
  division = {
    load: (datas: MapDivision[]) => {
      this.amap.division.get().then((x) => {
        x.load(datas);
      });
    },
    select: (id: string) => {
      this.amap.division.get().then((x) => {
        x.select(id);
      });
    },
  };
  station = {
    load: (datas: GarbageStationViewModel[]) => {
      this.amap.station.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
    clear: () => {
      this.amap.station.get().then((x) => {
        x.clear();
      });
    },
    eventable: (types: EventType[]) => {
      this.amap.station.get().then((x) => {
        x.set.eventable(types);
      });
    },
  };
  device = {
    load: (datas: IasDevice[]) => {
      this.amap.device.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
  };
}
