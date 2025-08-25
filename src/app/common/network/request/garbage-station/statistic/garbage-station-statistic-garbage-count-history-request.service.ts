import { GarbageStationGarbageCountStatistic } from '../../../model/garbage-station/garbage-station-sarbage-count-statistic.model';
import { GarbageStationUrl } from '../../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationStatisticGarbageCountsParams } from '../garbage-station-request.params';

export class GarbageStationStatistictGarbageCountHistoryRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageStationGarbageCountStatistic);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationGarbageCountStatistic>;
  list(
    params: GetGarbageStationStatisticGarbageCountsParams
  ): Promise<GarbageStationGarbageCountStatistic[]> {
    let url = GarbageStationUrl.statistic().garbagecount.history.list();
    return this.basicType.postArray(url, params);
  }
}
