import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../common/network/model/garbage-station/duration.model';
import {
  GetGarbageStationStatisticNumbersParamsV2,
  GetGarbageStationVolumesParams,
} from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { BusinessTool } from '../../../../common/tools/business-tool/business.tool';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementRecordEventDetailsConverter } from './garbage-management-record-event-details.converter';

@Injectable()
export class GarbageManagementRecordEventDetailsStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private converter: GarbageManagementRecordEventDetailsConverter
  ) {}

  async today(stationId: string) {
    let data = await this.service.statistic.number.cache.get(stationId);
    return this.converter.station(data);
  }

  async history(stationId: string, duration: Duration, unit: TimeUnit) {
    let params = new GetGarbageStationVolumesParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    switch (unit) {
      case TimeUnit.Year:
        params.TimeUnit = TimeUnit.Month;
        break;
      case TimeUnit.Day:
      case TimeUnit.Hour:
        params.TimeUnit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
      case TimeUnit.Month:
      default:
        params.TimeUnit = TimeUnit.Day;
        break;
    }
    let paged = await this.service.eventNumber.history.list(stationId, params);
    if (paged.Data.length == 0) {
      return [];
    }
    let data = paged.Data.map((x) => this.converter.statistic(stationId, x));
    if (DateTimeTool.is.than.unit(duration.end, new Date(), params.TimeUnit)) {
      let today = await this.today(stationId);
      data = data.concat(today);
    }
    let times = DateTimeTool.full.unit(duration.begin, unit);
    data = BusinessTool.full(data, times, params.TimeUnit, (index: number) =>
      this.converter.create(stationId, times[index])
    );

    return data;
  }
  async year(stationId: string, interval: Duration) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.TimeUnit = TimeUnit.Month;
    params.GarbageStationIds = [stationId];
    let list = await this.service.statistic.number.history.list(params);
    let data = list.map((x) => this.converter.station(x));
    let today = await this.today(stationId);
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
