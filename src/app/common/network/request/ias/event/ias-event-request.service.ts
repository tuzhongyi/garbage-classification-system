import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../tools/service-tool/service.tool';
import { EventNumberStatistic } from '../../../model/garbage-station/event-number-statistic.model';
import { IasEventRecord } from '../../../model/ias/ias-event-record.model';
import { PagedList } from '../../../model/page_list.model';
import { IasUrl } from '../../../url/ias/ias.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import {
  GetIasEventNumbersParams,
  GetIasEventsParams,
} from './ias-event-request.params';

export class IasEventRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = this.basic.type(IasEventRecord);
  }
  private type: HowellBaseTypeRequestService<IasEventRecord>;

  list(
    params: GetIasEventsParams = new GetIasEventsParams()
  ): Promise<PagedList<IasEventRecord>> {
    let url = IasUrl.event.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<IasEventRecord> {
    let url = IasUrl.event.item(id);
    return this.type.get(url);
  }

  handle(id: string, data: FormData) {
    let url = IasUrl.event.handle(id);
    return this.type.post(url, data);
  }

  numbers(params: GetIasEventNumbersParams) {
    let url = IasUrl.event.number();
    let plain = instanceToPlain(params);
    return this.basic.postArray<EventNumberStatistic>(
      url,
      EventNumberStatistic,
      plain
    );
  }

  all(params: GetIasEventsParams = new GetIasEventsParams()) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }
}
