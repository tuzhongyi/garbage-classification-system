import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { GetEventRecordsParams } from '../../../../../../common/network/request/garbage/event/event-request.params';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetGarbageStationStatisticGarbageCountsParams } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { LineZoomChartConverter } from './line-zoom-chart.converter';
import {
  LineZoomChartModel,
  LineZoomChartSource,
} from './line-zoom-chart.model';

@Injectable()
export class LineZoomChartBusiness {
  constructor(
    private stationService: GarbageStationRequestService,
    private eventService: EventRequestService
  ) {}
  Converter = new LineZoomChartConverter();
  async load(
    stationId: string,
    date: Date,
    unit: TimeUnit
  ): Promise<LineZoomChartModel> {
    let station = await this.getStation(stationId);
    let data = await this.getData(stationId, date, unit);
    // console.log(data);
    let model = this.Converter.Convert(data);
    if (station.CountSchedule && station.CountSchedule.length) {
      // 测试代码
      // station.CountSchedule[0].BeginTime = new Time(8, 5, 10);
      // station.CountSchedule[0].EndTime = new Time(19, 10, 10);
      model.timeRange = station.CountSchedule[0];
    }
    // console.log(model);
    return model;
  }
  async getData(
    stationId: string,
    date: Date,
    unit: TimeUnit
  ): Promise<LineZoomChartSource> {
    let count = await this.getCount(stationId, date);
    let statistic = await this.getRecord(stationId, date);
    // console.log('count', count);

    // console.log('statistic', statistic);

    return {
      count: count,
      record: statistic,
    };
  }

  getCount(stationId: string, date: Date) {
    let params = new GetGarbageStationStatisticGarbageCountsParams();

    params.GarbageStationIds = [stationId];
    params.Date = date;
    return this.stationService.statistic.garbageCount.history.list(params);
  }

  async getRecord(stationId: string, date: Date) {
    let params = new GetEventRecordsParams();
    let interval = DateTimeTool.allDay(date);
    params.BeginTime = interval.begin;
    params.EndTime = interval.end;
    params.StationIds = [stationId];
    let paged = await this.eventService.record.IllegalDrop.list(params);

    return paged.Data;
  }
  getStation(stationId: string) {
    return this.stationService.get(stationId);
  }
}
