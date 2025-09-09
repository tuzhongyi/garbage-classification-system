import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { IllegalDropEventRecord } from '../../../../model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedList } from '../../../../model/page_list.model';
import { EventUrl } from '../../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { GetEventRecordIllegalDropParams } from './event-request-illegal-drop.params';

export class EventRecordIllegalDropRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(IllegalDropEventRecord);
  }

  type: HowellBaseTypeRequestService<IllegalDropEventRecord>;

  list(
    params: GetEventRecordIllegalDropParams
  ): Promise<PagedList<IllegalDropEventRecord>> {
    let url = EventUrl.record.illegaldrop.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<IllegalDropEventRecord> {
    let url = EventUrl.record.illegaldrop.item(id);
    return this.type.get(url);
  }
  async all(
    params: GetEventRecordIllegalDropParams = new GetEventRecordIllegalDropParams()
  ) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }
}
