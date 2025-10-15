import { Injectable } from '@angular/core';
import { IasDevice } from '../../network/model/ias/ias-device.model';
import { IasEventRecord } from '../../network/model/ias/ias-event-record.model';
import { IasRequestService } from '../../network/request/ias/ias-request.service';

export class IasEventRecordViewModel extends IasEventRecord {
  Device!: Promise<IasDevice>;
}

@Injectable({
  providedIn: 'root',
})
export class IasEventRecordViewModelConverter {
  constructor(private service: IasRequestService) {}

  convert(data: IasEventRecord) {
    let item = new IasEventRecordViewModel();
    item = Object.assign(item, data);
    item.Device = this.service.device.get(data.DeviceId);
    return item;
  }
}
