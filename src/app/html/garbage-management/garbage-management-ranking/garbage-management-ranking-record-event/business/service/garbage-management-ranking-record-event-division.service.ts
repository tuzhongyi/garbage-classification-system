import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Division } from '../../../../../../common/network/model/garbage-station/division.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from '../../../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementRankingRecordEventDivisionService {
  constructor(private service: DivisionRequestService) {}

  async load(divisionId: string, unit: TimeUnit, date: Date) {
    let children = await this.children(divisionId);
    return this.today(children);
    // if (unit === TimeUnit.Day && DateTimeTool.is.today(date)) {
    //   return this.today(children);
    // } else {
    //   return this.history(children, unit, date);
    // }
  }

  private children(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    return this.service.cache.all(params);
  }

  private async today(divisions: Division[]) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = divisions.map((x) => x.Id);
    let paged = await this.service.statistic.number.cache.list(params);
    return paged.Data;
  }

  private history(divisions: Division[], unit: TimeUnit, date: Date) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = divisions.map((x) => x.Id);
    params.TimeUnit = unit;
    return this.service.statistic.number.history.cache.all(params);
  }
}
