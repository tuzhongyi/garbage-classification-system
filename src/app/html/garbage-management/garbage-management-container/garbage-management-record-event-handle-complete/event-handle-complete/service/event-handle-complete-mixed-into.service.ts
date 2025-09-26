import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { MixedIntoEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { Paged } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordMixedIntoParams } from '../../../../../../common/network/request/garbage/event/mixed-info/event-request-mixed-info.params';

export class EventHandleCompleteMixedIntoService {
  constructor(public service: EventRequestService) {}

  async list(page: Page, record: IEventRecord) {
    let params = new GetEventRecordMixedIntoParams();
    params.BeginTime = record.EventTime;
    params.EndTime = record.EventTime;
    params.PageSize = 1;
    params.PageIndex = page.PageIndex;
    let res = await this.service.record.MixedInto.list(params);
    if (res.Data && res.Data.length > 0) {
      let paged = new Paged<MixedIntoEventRecord>();
      paged.Page = res.Page;
      paged.Data = res.Data[0];
      return paged;
    }
    throw new Error('No data found');
  }
}
