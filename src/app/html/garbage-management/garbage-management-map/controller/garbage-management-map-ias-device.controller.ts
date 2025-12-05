import { EventEmitter } from '@angular/core';
import { IasDevice } from '../../../../common/network/model/ias/ias-device.model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

export class GarbageManagementMapIasDeviceController {
  event = {
    dblclick: new EventEmitter<IasDevice>(),
  };
  constructor(private amap: GarbageManagementMapAMapController) {
    this.regist();
  }

  private regist() {
    this.amap.device.get().then((x) => {
      x.event.dblclick.subscribe((data) => {
        this.event.dblclick.emit(data);
      });
    });
  }

  load(datas: IasDevice[]) {
    this.amap.device.get().then((x) => {
      x.clear();
      x.load(datas);
    });
  }
}
