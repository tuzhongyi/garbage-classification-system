import { instanceToPlain } from 'class-transformer';
import { GarbageStationAbnormalStatistic } from '../../../model/garbage-station/abnormal/garbage-station-abnormal-statistic.model';
import { GarbageStation } from '../../../model/garbage-station/garbage-station.model';
import { GarbageStationUrl } from '../../../url/garbage/garbage-station.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';
import {
  GetGarbageStationAbnormalsListParams,
  GetGarbageStationAbnormalsStatisticParams,
} from './garbage-station-abnormal-request.params';

export class GarbageStationAbnormalRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  statistic(parmas: GetGarbageStationAbnormalsStatisticParams) {
    let url = GarbageStationUrl.abnormal().statistic();
    let plain = instanceToPlain(parmas);
    return this.basic.post(url, GarbageStationAbnormalStatistic, plain);
  }
  list(params: GetGarbageStationAbnormalsListParams) {
    let url = GarbageStationUrl.abnormal().list();
    let plain = instanceToPlain(params);
    return this.basic.paged(url, GarbageStation, plain);
  }
}
