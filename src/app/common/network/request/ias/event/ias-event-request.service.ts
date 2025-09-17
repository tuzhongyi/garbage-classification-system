import { instanceToPlain } from 'class-transformer';
import { EventNumberStatistic } from '../../../model/garbage-station/event-number-statistic.model';
import { IasEventRecord } from '../../../model/ias/ias-event-record.model';
import { PagedList } from '../../../model/page_list.model';
import { IasUrl } from '../../../url/ias/ias.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { Cache } from '../../cache/cache';
import { AbstractService } from '../../cache/cache.interface';
import {
  GetIasEventNumbersParams,
  GetIasEventsParams,
} from './ias-event-request.params';

@Cache(IasUrl.event.basic(), IasEventRecord)
export class IasEventRequestService extends AbstractService<IasEventRecord> {
  constructor(private basic: HowellBaseRequestService) {
    super();
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
}
