import { formatDate } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { Language } from '../../../../../../common/tools/language';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementMapAMapInfoController } from '../info/garbage-management-map-amap-marker-info.controller';
import { GarbageManagementMapAMapInfo } from '../info/garbage-management-map-amap-marker-info.model';
import { GarbageManagementMapAMapRecordMarkerLayerController } from './garbage-management-map-amap-record-marker-layer.controller';

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
  private regist() {
    this.marker.event.mouseover.subscribe((data) => {
      let content = `时间：${formatDate(
        data.EventTime,
        Language.yyyyMMddHHmmss,
        'en'
      )}<br/>地址：${data.Address ?? '无'}`;
      let info: GarbageManagementMapAMapInfo = {
        Name: content,
        Location: ObjectTool.model.GisPoint.to(data.Location),
      };
      this.info.add(info);
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
}
