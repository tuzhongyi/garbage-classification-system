import { Injectable } from '@angular/core';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetGarbageDropEventRecordsParams } from '../../../../../../common/network/request/garbage/event/garbage-drop/event-request-garbage-drop.params';
@Injectable()
export class GarbageManagementChartStationCountStateGarbageDropBusiness {
  constructor(private service: EventRequestService) {}

  async load(divisionId: string, duration: Duration) {
    let task = await this.data.load(divisionId, duration);
    let handle = await this.data.load(divisionId, duration, true);

    return {
      count: task.Page.TotalRecordCount ?? 0,
      value: handle.Page.TotalRecordCount ?? 0,
    };
  }

  private data = {
    load: (divisionId: string, duration: Duration, handled?: boolean) => {
      let params = new GetGarbageDropEventRecordsParams();
      params.DivisionIds = [divisionId];
      params.IsHandle = handled;
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      return this.service.record.GarbageDrop.list(params);
    },
  };
}
