import { EventNumberStatistic } from '../../../model/garbage-station/event-number-statistic.model';
import { PagedList } from '../../../model/page_list.model';
import { GarbageStationUrl } from '../../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationEventNumbersParams } from '../garbage-station-request.params';

export class GarbageStationEventNumberHistoryRequestService {
  constructor(basic: HowellBaseRequestService) {
    this.basicType = basic.type(EventNumberStatistic);
  }
  private basicType: HowellBaseTypeRequestService<EventNumberStatistic>;
  list(
    stationId: string,
    params: GetGarbageStationEventNumbersParams
  ): Promise<PagedList<EventNumberStatistic>> {
    let url = GarbageStationUrl.eventnumber(stationId).history.list();
    return this.basicType.paged(url, params);
  }
}
