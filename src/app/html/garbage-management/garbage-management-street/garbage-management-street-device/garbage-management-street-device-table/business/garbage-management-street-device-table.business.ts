import { Injectable } from '@angular/core';
import { GetIasDevicesParams } from '../../../../../../common/network/request/ias/device/ias-device-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { GarbageManagementStreetDeviceTableArgs } from './garbage-management-street-device-table.model';

@Injectable()
export class GarbageManagementStreetDeviceTableBusiness {
  constructor(private service: IasRequestService) {}

  load(
    index: number,
    size: number,
    args: GarbageManagementStreetDeviceTableArgs
  ) {
    let params = new GetIasDevicesParams();
    params.PageIndex = index;
    params.PageSize = size;
    if (args.divisionId) {
      params.DivisionId = args.divisionId;
    }
    if (args.name) {
      params.Name = args.name;
    }
    if (args.online != undefined) {
      params.OnlineStatus = args.online ? 1 : 0;
    }

    return this.service.device.list(params);
  }
}
