import { Injectable } from '@angular/core';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';

@Injectable()
export class GarbageManagementRecordEventIasStatisticDetailsManagerBusiness {
  constructor(private service: IasRequestService) {}

  load() {
    return this.service.device.array();
  }
}
