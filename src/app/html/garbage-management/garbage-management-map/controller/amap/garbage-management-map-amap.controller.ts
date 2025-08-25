import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { GarbageManagementMapAMapDivisionController } from './division/garbage-management-map-amap-division.controller';
import { GarbageManagementMapAMapConfigController } from './garbage-management-map-amap.config';
import { GarbageManagementMapAMapRootController } from './root/garbage-management-map-amap-root.controller';
import { GarbageManagementMapAMapStationController } from './station/garbage-management-map-amap-station.controller';

@Injectable()
export class GarbageManagementMapAMapController {
  root = new PromiseValue<GarbageManagementMapAMapRootController>();
  division = new PromiseValue<GarbageManagementMapAMapDivisionController>();
  station = new PromiseValue<GarbageManagementMapAMapStationController>();
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
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      let position = e.pixel.toArray();
      GarbageManagementMapAMapConfigController.event.mousemoving.emit(position);
    });
  }

  move(position: [number, number]) {
    this.map.get().then((x) => {
      x.setCenter(position);
    });
  }
  fit() {
    this.map.get().then((x) => {
      x.setFitView();
    });
  }
}
