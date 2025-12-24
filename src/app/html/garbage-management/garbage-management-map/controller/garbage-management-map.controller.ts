import { Injectable } from '@angular/core';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';
import { GarbageManagementMapDivisionController } from './garbage-management-map-division.controller';
import { GarbageManagementMapIasDeviceController } from './garbage-management-map-ias-device.controller';
import { GarbageManagementMapIasHeatmapController } from './garbage-management-map-ias-heatmap.controller';
import { GarbageManagementMapIasRecordController } from './garbage-management-map-ias-record.controller';
import { GarbageManagementMapRootController } from './garbage-management-map-root.controller';
import { GarbageManagementMapStationController } from './garbage-management-map-station.controller';

@Injectable()
export class GarbageManagementMapController {
  root: GarbageManagementMapRootController;
  division: GarbageManagementMapDivisionController;
  station: GarbageManagementMapStationController;
  ias: {
    device: GarbageManagementMapIasDeviceController;
    exposed: GarbageManagementMapIasRecordController;
    timeout: GarbageManagementMapIasRecordController;
    heatmap: GarbageManagementMapIasHeatmapController;
  };
  constructor(private amap: GarbageManagementMapAMapController) {
    this.root = new GarbageManagementMapRootController(amap);
    this.division = new GarbageManagementMapDivisionController(amap);
    this.station = new GarbageManagementMapStationController(amap);
    this.ias = {
      device: new GarbageManagementMapIasDeviceController(amap),
      exposed: new GarbageManagementMapIasRecordController(amap),
      timeout: new GarbageManagementMapIasRecordController(amap),
      heatmap: new GarbageManagementMapIasHeatmapController(amap),
    };
    this.regist();
  }

  private regist() {
    this.amap.exposed.get().then((x) => {
      x.event.dblclick.subscribe((data) => {
        this.ias.exposed.event.dblclick.emit(data);
      });
    });
    this.amap.timeout.get().then((x) => {
      x.event.dblclick.subscribe((data) => {
        this.ias.timeout.event.dblclick.emit(data);
      });
    });
  }

  move(center: [number, number]) {
    this.amap.move(center);
  }

  fit(datas?: any) {
    this.amap.fit(datas);
  }
  destroy() {
    this.amap.destroy();
  }
}
