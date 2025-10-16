import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../common/network/model/garbage-station/duration.model';
import {
  GetDivisionEventNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from '../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../common/network/request/garbage/division/division-request.service';
import { BusinessTool } from '../../../../common/tools/business-tool/business.tool';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementRecordEventDetailsConverter } from './garbage-management-record-event-details.converter';

@Injectable()
export class GarbageManagementRecordEventDetailsDivisionBusiness {
  constructor(
    private service: DivisionRequestService,
    private converter: GarbageManagementRecordEventDetailsConverter
  ) {}

  async get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }

  async today(divisionId: string) {
    let data = await this.service.statistic.number.get(divisionId);
    return this.converter.division(data);
  }
  async history(divisionId: string, interval: Duration, unit: TimeUnit) {
    let data = await this._history(divisionId, interval, unit);
    let times = DateTimeTool.full.unit(interval.begin, unit);

    let _unit = unit;
    switch (unit) {
      case TimeUnit.Day:
      case TimeUnit.Hour:
        _unit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
      default:
        _unit = TimeUnit.Day;
        break;
    }

    data = BusinessTool.full(data, times, _unit, (index: number) =>
      this.converter.create(divisionId, times[index])
    );

    return data;
  }
  private async _history(
    divisionId: string,
    interval: Duration,
    unit: TimeUnit
  ) {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    switch (unit) {
      case TimeUnit.Day:
      case TimeUnit.Hour:
        params.TimeUnit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
      default:
        params.TimeUnit = TimeUnit.Day;
        break;
    }
    let paged = await this.service.eventNumber.history.list(divisionId, params);
    let data = await paged.Data.map((x) =>
      this.converter.statistic(divisionId, x)
    );
    if (unit === TimeUnit.Day) {
      return data;
    }
    if (unit === TimeUnit.Week) {
      let thisweek = DateTimeTool.allWeek(new Date());
      if (interval.begin.getTime() !== thisweek.begin.getTime()) {
        return data;
      }
    }
    if (unit === TimeUnit.Month) {
      let thismonth = DateTimeTool.allMonth(new Date());
      if (interval.begin.getTime() !== thismonth.begin.getTime()) {
        return data;
      }
    }

    let today = await this.today(divisionId);
    return data.concat(today);
  }

  async year(divisionId: string, interval: Duration) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = TimeUnit.Month;
    params.DivisionIds = [divisionId];
    let list = await this.service.statistic.number.history.list(params);
    let data = list.map((x) => this.converter.division(x));
    let today = await this.today(divisionId);
    let now = new Date();
    if (now.getDate() === 1) {
      data = data.concat(today);
    } else {
      data[data.length - 1].EventNumbers?.forEach((x) => {
        let event = today.EventNumbers?.find(
          (y) => y.EventType === x.EventType
        );
        if (event) {
          x.DayNumber += event.DayNumber;
        }
      });
    }
    return data;
  }
}
