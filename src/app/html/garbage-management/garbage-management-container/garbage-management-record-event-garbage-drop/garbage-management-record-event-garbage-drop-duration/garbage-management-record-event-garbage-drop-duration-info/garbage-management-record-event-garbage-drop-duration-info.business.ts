import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from '../../../../../../common/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GetGarbageStationStatisticNumbersParamsV2 } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementRecordEventGarbageDropDurationInfoBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async load(
    stationId: string,
    date: Date
  ): Promise<GarbageStationNumberStatisticV2> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    let interval = DateTimeTool.all.day(date);
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.GarbageStationIds = [stationId];
    params.TimeUnit = TimeUnit.Day;
    let datas = await this.service.statistic.number.history.list(params);
    return datas[0];
  }
}
