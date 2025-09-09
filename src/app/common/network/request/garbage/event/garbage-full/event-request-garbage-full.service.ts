import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { GarbageFullEventRecord } from '../../../../model/garbage-station/event-record/garbage-full-event-record.model';
import { PagedList } from '../../../../model/page_list.model';
import { EventUrl } from '../../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { GetEventRecordGarbageFullParams } from './event-request-garbage-full.params';

export class EventRecordGarbageFullRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(GarbageFullEventRecord);
  }

  type: HowellBaseTypeRequestService<GarbageFullEventRecord>;

  list(
    params: GetEventRecordGarbageFullParams
  ): Promise<PagedList<GarbageFullEventRecord>> {
    let url = EventUrl.record.garbagefull.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<GarbageFullEventRecord> {
    let url = EventUrl.record.garbagefull.item(id);
    return this.type.get(url);
  }
  async all(
    params: GetEventRecordGarbageFullParams = new GetEventRecordGarbageFullParams()
  ) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }
}
