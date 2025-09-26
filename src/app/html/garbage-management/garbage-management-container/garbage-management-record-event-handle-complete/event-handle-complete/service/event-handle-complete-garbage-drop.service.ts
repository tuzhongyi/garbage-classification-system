import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { Paged } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetGarbageDropEventRecordsParams } from '../../../../../../common/network/request/garbage/event/garbage-drop/event-request-garbage-drop.params';

export class EventHandleCompleteGarbageDropService {
  constructor(public service: EventRequestService) {}

  async list(page: Page, record: IEventRecord) {
    let params = new GetGarbageDropEventRecordsParams();
    params.BeginTime = record.EventTime;
    params.EndTime = record.EventTime;
    params.PageSize = 1;
    params.PageIndex = page.PageIndex;
    let res = await this.service.record.GarbageDrop.list(params);
    if (res.Data && res.Data.length > 0) {
      let paged = new Paged<GarbageDropEventRecord>();
      paged.Page = res.Page;
      paged.Data = res.Data[0];
      return paged;
    }
    throw new Error('No data found');
  }
}
