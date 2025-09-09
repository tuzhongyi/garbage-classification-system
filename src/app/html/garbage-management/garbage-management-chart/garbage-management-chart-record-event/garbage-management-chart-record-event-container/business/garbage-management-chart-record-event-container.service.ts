import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { GetDivisionEventNumbersParams } from '../../../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementChartRecordEventService {
  constructor(private service: DivisionRequestService) {}

  async history(divisionId: string, unit: TimeUnit, date: Date) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    switch (unit) {
      case TimeUnit.Day:
        params.TimeUnit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
      case TimeUnit.Month:
        params.TimeUnit = TimeUnit.Day;
        break;
      case TimeUnit.Year:
        params.TimeUnit = TimeUnit.Month;
        break;
      default:
        break;
    }
    let paged = await this.service.eventNumber.history.list(divisionId, params);
    return paged.Data;
  }
}
