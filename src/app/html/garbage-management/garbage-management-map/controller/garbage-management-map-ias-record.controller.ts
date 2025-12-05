import { EventEmitter } from '@angular/core';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

export class GarbageManagementMapIasRecordController {
  event = {
    dblclick: new EventEmitter<IasEventRecord>(),
  };

  constructor(private amap: GarbageManagementMapAMapController) {}

  load(datas: IasEventRecord[]) {
    this.amap.exposed.get().then((x) => {
      x.clear();
      x.load(datas);
    });
  }
  clear() {
    this.amap.exposed.get().then((x) => {
      x.clear();
    });
  }
  select(data: IasEventRecord) {
    this.amap.exposed.get().then((x) => {
      x.blur();
      x.select(data);
      this.amap.zoom();
    });
  }
  blur() {
    this.amap.exposed.get().then((x) => {
      x.blur();
    });
  }
}
