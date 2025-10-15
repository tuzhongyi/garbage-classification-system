import { WindowViewModel } from '../../../../../../common/components/window/window.model';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';

export class GarbageManagementRecordEventIllegalVehicleListConfirmWindow extends WindowViewModel {
  data?: IllegalVehicleEventRecord;
  get content() {
    return `是否把 ${this.data?.Data.PlateNo} 加入白名单？`;
  }
}
