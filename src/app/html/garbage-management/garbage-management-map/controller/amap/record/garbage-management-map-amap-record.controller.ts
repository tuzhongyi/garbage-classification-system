import { EventEmitter } from '@angular/core';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { GeoTool } from '../../../../../../common/tools/geo-tool/geo.tool';
import { GarbageManagementMapAMapInfoController } from '../info/garbage-management-map-amap-marker-info.controller';
import { GarbageManagementMapAMapInfo } from '../info/garbage-management-map-amap-marker-info.model';
import { GarbageManagementMapAMapRecordMarkerLayerController } from './garbage-management-map-amap-record-marker-layer.controller';
import { GarbageManagementMapAMapRecordInfoContentController } from './info/garbage-management-map-amap-record-info-content.controller';

export class GarbageManagementMapAMapRecordController {
  event = {
    dblclick: new EventEmitter<IasEventRecord>(),
  };

  constructor(map: AMap.Map) {
    this.marker = new GarbageManagementMapAMapRecordMarkerLayerController(map);
    this.info = new GarbageManagementMapAMapInfoController(map, {
      zooms: [0, 50],
      offset: [0, -40],
      class: 'record-ias',
    });
    this.regist();
  }

  private marker: GarbageManagementMapAMapRecordMarkerLayerController;
  private info: GarbageManagementMapAMapInfoController;
  private content = new GarbageManagementMapAMapRecordInfoContentController();
  private regist() {
    this.marker.event.mouseover.subscribe((data) => {
      this.select(data);
    });
    this.marker.event.mouseout.subscribe((station) => {
      this.info.remove();
    });
    this.marker.event.dblclick.subscribe((data) => {
      this.event.dblclick.emit(data);
    });
  }

  load(datas: IasEventRecord[]) {
    this.marker.load(datas);
  }

  clear() {
    this.marker.clear();
  }
  select(data: IasEventRecord) {
    let position: [number, number] = GeoTool.point.convert.wgs84.to.gcj02(
      data.Location?.Longitude ?? 121.31,
      data.Location?.Latitude ?? 31.121
    );
    let info: GarbageManagementMapAMapInfo = {
      Name: this.content.load(data),
      Location: [...position],
    };
    this.info.add(info);
  }

  blur() {
    this.info.remove();
  }
}
