import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import {
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationsParams,
} from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementRankingRecordEventStationService {
  constructor(private service: GarbageStationRequestService) {}

  load(divisionId: string, unit: TimeUnit, date: Date) {
    return this.today(divisionId);
    // if (unit === TimeUnit.Day && DateTimeTool.is.today(date)) {
    //   return this.today(divisionId);
    // } else {
    //   return this.history(divisionId, unit, date);
    // }
  }

  async today(divisionId: string) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    return this.service.statistic.number.cache.all(params);
  }

  private stations(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    return this.service.cache.all(params);
  }

  async history(divisionId: string, unit: TimeUnit, date: Date) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let stations = await this.stations(divisionId);
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.GarbageStationIds = stations.map((x) => x.Id);
    return this.service.statistic.number.history.cache.list(params);
  }
}
