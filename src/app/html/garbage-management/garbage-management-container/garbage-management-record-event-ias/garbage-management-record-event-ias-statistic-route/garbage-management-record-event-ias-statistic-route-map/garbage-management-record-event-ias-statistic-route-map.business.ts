import { Injectable } from '@angular/core';
import { GetIasDeviceRoutesParams } from '../../../../../../common/network/request/ias/device/route/ias-device-route-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementRecordEventIasStatisticRouteArgs } from '../garbage-management-record-event-ias-statistic-route.model';

@Injectable()
export class GarbageManagementRecordEventIasStatisticRouteMapBusiness {
  constructor(private service: IasRequestService) {}

  async load(args: GarbageManagementRecordEventIasStatisticRouteArgs) {
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    let params = new GetIasDeviceRoutesParams();
    params.DeviceId = args.deviceId;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return this.service.device.route.array(params);
  }
}
