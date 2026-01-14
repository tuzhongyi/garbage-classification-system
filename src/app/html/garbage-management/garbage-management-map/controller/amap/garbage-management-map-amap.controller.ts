import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { GarbageManagementMapAMapDeviceController } from './device/garbage-management-map-amap-device.controller';
import { GarbageManagementMapAMapDivisionController } from './division/garbage-management-map-amap-division.controller';
import { GarbageManagementMapAMapConfig } from './garbage-management-map-amap.config';
import { GarbageManagementMapAMapHeatmapController } from './heatmap/garbage-management-map-amap-heatmap.controller';
import { GarbageManagementMapAMapRecordController } from './record/garbage-management-map-amap-record.controller';
import { GarbageManagementMapAMapRootController } from './root/garbage-management-map-amap-root.controller';
import { GarbageManagementMapAMapStationController } from './station/garbage-management-map-amap-station.controller';

@Injectable()
export class GarbageManagementMapAMapController {
  root = new PromiseValue<GarbageManagementMapAMapRootController>();
  division = new PromiseValue<GarbageManagementMapAMapDivisionController>();
  station = new PromiseValue<GarbageManagementMapAMapStationController>();
  device = new PromiseValue<GarbageManagementMapAMapDeviceController>();
  exposed = new PromiseValue<GarbageManagementMapAMapRecordController>();
  timeout = new PromiseValue<GarbageManagementMapAMapRecordController>();
  heatmap = new PromiseValue<GarbageManagementMapAMapHeatmapController>();
  constructor() {
    MapHelper.amap
      .get('map-container', { showBuildingBlock: false, showLabel: false }, [
        'AMap.MarkerCluster',
      ])
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

        let exposed = new GarbageManagementMapAMapRecordController(map);
        this.exposed.set(exposed);

        let timeout = new GarbageManagementMapAMapRecordController(map);
        this.timeout.set(timeout);

        let heatmap = new GarbageManagementMapAMapHeatmapController(
          map,
          container
        );
        this.heatmap.set(heatmap);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      let position = e.pixel.toArray();
      GarbageManagementMapAMapConfig.event.mousemoving.emit(position);
    });
    map.on('click', (e) => {
      this.station.get().then((station) => {
        station.set.blur();
      });
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
  zoom() {
    this.map.get().then((x) => {
      x.setZoom(GarbageManagementMapAMapConfig.zoom.marker[0] + 1);
    });
  }
  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
