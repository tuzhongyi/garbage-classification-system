import { TimeUnit } from '../../../../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../../../../common/network/model/garbage-station/duration.model';
import { GetDivisionStatisticNumbersParamsV2 } from '../../../../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../../../../common/network/request/garbage/division/division-request.service';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementChartPieRecordStatisticContainerDivisionService {
  constructor(private service: DivisionRequestService) {}

  load(divisionId: string, unit: TimeUnit) {
    let duration: Duration;
    switch (unit) {
      case TimeUnit.Day:
        return this.today(divisionId);
      case TimeUnit.Week:
        duration = DateTimeTool.allWeek(new Date());
        return this.history(divisionId, duration, unit);
      case TimeUnit.Month:
        duration = DateTimeTool.allMonth(new Date());
        return this.history(divisionId, duration, unit);
      case TimeUnit.Year:
        duration = DateTimeTool.allYear(new Date());
        return this.history(divisionId, duration, unit);
      default:
        throw new Error('不支持的时间单位');
    }
  }

  today(divisionId: string) {
    return this.service.statistic.number.get(divisionId);
  }

  async history(divisionId: string, duration: Duration, unit: TimeUnit) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    params.DivisionIds = [divisionId];
    let array = await this.service.statistic.number.history.array(params);
    return array.find((x) => x.Id === divisionId);
  }
}
