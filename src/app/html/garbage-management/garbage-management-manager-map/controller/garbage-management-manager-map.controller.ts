import { Injectable } from '@angular/core';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementManagerMapAMapController } from './amap/garbage-management-manager-map-amap.controller';

@Injectable()
export class GarbageManagementManagerMapController {
  private amap = new GarbageManagementManagerMapAMapController();

  load(data: IasEventRecord) {
    this.amap.load(data);
  }
  destroy() {
    this.amap.destroy();
  }
}
