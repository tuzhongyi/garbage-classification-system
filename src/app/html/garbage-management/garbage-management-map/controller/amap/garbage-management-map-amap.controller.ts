import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { GarbageManagementMapAMapDeviceController } from './device/garbage-management-map-amap-device.controller';
import { GarbageManagementMapAMapDivisionController } from './division/garbage-management-map-amap-division.controller';
import { GarbageManagementMapAMapConfig } from './garbage-management-map-amap.config';
import { GarbageManagementMapAMapRootController } from './root/garbage-management-map-amap-root.controller';
import { GarbageManagementMapAMapStationController } from './station/garbage-management-map-amap-station.controller';

@Injectable()
export class GarbageManagementMapAMapController {
  root = new PromiseValue<GarbageManagementMapAMapRootController>();
  division = new PromiseValue<GarbageManagementMapAMapDivisionController>();
  station = new PromiseValue<GarbageManagementMapAMapStationController>();
  device = new PromiseValue<GarbageManagementMapAMapDeviceController>();

  constructor() {
    MapHelper.amap
      .get('map-container', { showBuildingBlock: false, showLabel: false })
      .then((map) => {
        this.map.set(map);
        this.regist(map);

        let container = new Loca.Container({ map });
        this.loca.set(container);

        let root = new GarbageManagementMapAMapRootController(container);
        this.root.set(root);

        let division = new GarbageManagementMapAMapDivisionController(
          container
        );
        this.division.set(division);

        let station = new GarbageManagementMapAMapStationController(
          map,
          container
        );
        this.station.set(station);

        let device = new GarbageManagementMapAMapDeviceController(map);
        this.device.set(device);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      let position = e.pixel.toArray();
      GarbageManagementMapAMapConfig.event.mousemoving.emit(position);
    });
  }

  move(position: [number, number]) {
    this.map.get().then((x) => {
      x.setCenter(position);
    });
  }
  fit(datas?: any) {
    this.map.get().then((x) => {
      x.setFitView(datas, true);
    });
  }
}
