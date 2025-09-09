import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { GarbageDropEventRecord } from '../../../../model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedList } from '../../../../model/page_list.model';
import { EventUrl } from '../../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import {
  GarbageDropAcceptParams,
  GarbageDropSuperviseParams,
  GarbageDropSuperviseResultParams,
  GarbageFeedbackParams,
} from '../event-request.params';
import { GetGarbageDropEventRecordsParams } from './event-request-garbage-drop.params';

export class EventRecordGarbageDropRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(GarbageDropEventRecord);
  }

  type: HowellBaseTypeRequestService<GarbageDropEventRecord>;

  async all(
    params: GetGarbageDropEventRecordsParams = new GetGarbageDropEventRecordsParams()
  ) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }

  list(
    params: GetGarbageDropEventRecordsParams
  ): Promise<PagedList<GarbageDropEventRecord>> {
    let url = EventUrl.record.garbagedrop.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<GarbageDropEventRecord> {
    let url = EventUrl.record.garbagedrop.item(id);
    return this.type.get(url);
  }
  feedback(id: string, params: GarbageFeedbackParams) {
    let url = EventUrl.record.garbagedrop.feedback(id);
    return this.type.post(url, params);
  }
  supervise(id: string, params: GarbageDropSuperviseParams) {
    let url = EventUrl.record.garbagedrop.supervise(id);
    return this.type.post(url, params);
  }
  superviseResult(id: string, params: GarbageDropSuperviseResultParams) {
    let url = EventUrl.record.garbagedrop.superviseresult(id);
    return this.type.post(url, params);
  }
  accept(id: string, params: GarbageDropAcceptParams) {
    let url = EventUrl.record.garbagedrop.accept(id);
    return this.type.post(url, params);
  }
}
