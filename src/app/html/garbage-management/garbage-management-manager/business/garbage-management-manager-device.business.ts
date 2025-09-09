import { Injectable } from '@angular/core';
import { IasRequestService } from '../../../../common/network/request/ias/ias-request.service';

@Injectable()
export class GarbageManagementManagerDeviceBusiness {
  constructor(private service: IasRequestService) {}
  async load() {
    return this.service.device.all();
  }
}
