import { Injectable } from '@angular/core';
import { GetIasEventsParams } from '../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementManagerIasBusiness {
  constructor(private service: IasRequestService) {}
  async device() {
    return this.service.device.all();
  }
  record(date = new Date()) {
    let duration = DateTimeTool.all.day(date);
    let params = new GetIasEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.EventType = 103;
    return this.service.event.all(params);
  }
}
