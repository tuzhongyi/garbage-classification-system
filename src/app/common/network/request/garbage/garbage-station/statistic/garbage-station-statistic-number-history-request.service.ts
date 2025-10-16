import { GarbageStationNumberStatisticV2 } from '../../../../model/garbage-station/garbage-station-number-statistic-v2.model';
import { PagedList } from '../../../../model/page_list.model';
import { GarbageStationUrl } from '../../../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { Cache } from '../../../cache/cache';
import { AbstractService } from '../../../cache/cache.interface';
import { GetGarbageStationStatisticNumbersParamsV2 } from '../garbage-station-request.params';

@Cache(
  GarbageStationUrl.statistic().number.history.basic(),
  GarbageStationNumberStatisticV2
)
export class GarbageStationStatisticNumberHistoryService extends AbstractService<GarbageStationNumberStatisticV2> {
  constructor(basic: HowellBaseRequestService) {
    super();
    this.basicType = basic.type(GarbageStationNumberStatisticV2);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationNumberStatisticV2>;

  list(
    params: GetGarbageStationStatisticNumbersParamsV2
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let url = GarbageStationUrl.statistic().number.history.list();
    return this.basicType.postArray(url, params);
  }
  override paged(): Promise<PagedList<GarbageStationNumberStatisticV2>> {
    throw new Error('Method not implemented.');
  }
  override get(id: string): Promise<GarbageStationNumberStatisticV2> {
    throw new Error('Method not implemented.');
  }
}
