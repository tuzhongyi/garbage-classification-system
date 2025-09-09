import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { SewageEventRecord } from '../../../../model/garbage-station/event-record/sewage-event-record.model';
import { PagedList } from '../../../../model/page_list.model';
import { EventUrl } from '../../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { GetEventRecordSewageParams } from './event-request-sewage.params';

export class EventRecordSewageRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(SewageEventRecord);
  }

  type: HowellBaseTypeRequestService<SewageEventRecord>;

  list(
    params: GetEventRecordSewageParams
  ): Promise<PagedList<SewageEventRecord>> {
    let url = EventUrl.record.sewage.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<SewageEventRecord> {
    let url = EventUrl.record.sewage.item(id);
    return this.type.get(url);
  }
  async all(
    params: GetEventRecordSewageParams = new GetEventRecordSewageParams()
  ) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }
}
