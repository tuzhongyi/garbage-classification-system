import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageFullEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { Paged } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordGarbageFullParams } from '../../../../../../common/network/request/garbage/event/garbage-full/event-request-garbage-full.params';

export class EventHandleCompleteGarbageFullService {
  constructor(public service: EventRequestService) {}

  async list(page: Page, record: IEventRecord) {
    let params = new GetEventRecordGarbageFullParams();
    params.BeginTime = record.EventTime;
    params.EndTime = record.EventTime;
    params.PageSize = 1;
    params.PageIndex = page.PageIndex;
    let res = await this.service.record.GarbageFull.list(params);
    if (res.Data && res.Data.length > 0) {
      let paged = new Paged<GarbageFullEventRecord>();
      paged.Page = res.Page;
      paged.Data = res.Data[0];
      return paged;
    }
    throw new Error('No data found');
  }
}
