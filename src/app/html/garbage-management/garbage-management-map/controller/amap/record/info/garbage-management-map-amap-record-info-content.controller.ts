import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementMapAMapRecordExposedInfoContentController } from './garbage-management-map-amap-record-info-content-exposed.controller';
import { GarbageManagementMapAMapRecordTimeoutInfoContentController } from './garbage-management-map-amap-record-info-content-timeout.controller';

export class GarbageManagementMapAMapRecordInfoContentController {
  private exposed =
    new GarbageManagementMapAMapRecordExposedInfoContentController();
  private timeout =
    new GarbageManagementMapAMapRecordTimeoutInfoContentController();

  load(data: IasEventRecord) {
    if (data.IsTimeout) {
      return this.timeout.load(data);
    }
    return this.exposed.load(data);
  }
}
