import { EventEmitter } from '@angular/core';
import { IasDevice } from '../../../../../../common/network/model/ias/ias-device.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementMapAMapInfoController } from '../info/garbage-management-map-amap-marker-info.controller';
import { GarbageManagementMapAMapInfo } from '../info/garbage-management-map-amap-marker-info.model';
import { GarbageManagementMapAMapDeviceMarkerLayerController } from './garbage-management-map-amap-device-marker-layer.controller';

export class GarbageManagementMapAMapDeviceController {
  event = {
    dblclick: new EventEmitter<IasDevice>(),
  };

  constructor(map: AMap.Map) {
    this.marker = new GarbageManagementMapAMapDeviceMarkerLayerController(map);
    this.info = new GarbageManagementMapAMapInfoController(map);
    this.regist();
  }

  private marker: GarbageManagementMapAMapDeviceMarkerLayerController;
  private info: GarbageManagementMapAMapInfoController;

  private regist() {
    this.marker.event.mouseover.subscribe((data) => {
      let info: GarbageManagementMapAMapInfo = {
        Name: data.Name,
        Location: ObjectTool.model.GisPoint.to(data.Location),
      };
      this.info.add(info);
    });
    this.marker.event.mouseout.subscribe((data) => {
      this.info.remove();
    });
    this.marker.event.dblclick.subscribe((data) => {
      this.event.dblclick.emit(data);
    });
  }

  load(datas: IasDevice[]) {
    this.marker.load(datas);
  }

  clear() {
    this.marker.clear();
  }

  set = {};
}
