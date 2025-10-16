import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../../common/enum/time-unit.enum';
import { GarbageStationNumberStatisticV2 } from '../../../../../../../common/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GetGarbageStationStatisticNumbersParamsV2 } from '../../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { IGarbageManagementChartData } from '../../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementStationStatisticDetailsArgs } from '../../garbage-management-station-statistic-details.model';
import { GarbageManagementStationStatisticDetailsContainerConverter } from './garbage-management-station-statistic-details-container.converter';

@Injectable()
export class GarbageManagementStationStatisticDetailsContainerBusiness {
  constructor(private service: GarbageStationRequestService) {}

  private converter =
    new GarbageManagementStationStatisticDetailsContainerConverter();

  async load(
    opts: GarbageManagementStationStatisticDetailsArgs
  ): Promise<IGarbageManagementChartData[]> {
    let data = await this.getData(opts);
    let model = this.converter.Convert(data, opts.type);
    return model;
  }
  async getData(
    opts: GarbageManagementStationStatisticDetailsArgs
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    let duration = DateTimeTool.TimeUnit(opts.unit, opts.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.GarbageStationIds = opts.stationIds;
    if (opts.unit === TimeUnit.Year) {
      params.TimeUnit = TimeUnit.Month;
    } else {
      params.TimeUnit = TimeUnit.Day;
    }
    return this.service.statistic.number.history.list(params);
  }
}
