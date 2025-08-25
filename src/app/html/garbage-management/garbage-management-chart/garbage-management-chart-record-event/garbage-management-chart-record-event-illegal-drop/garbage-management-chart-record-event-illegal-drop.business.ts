import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { EventNumberStatistic } from '../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GetDivisionEventNumbersParams } from '../../../../../common/network/request/division/division-request.params';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { IGarbageManagementChartRecordEventData } from '../garbage-management-chart-record-event.model';

@Injectable()
export class GarbageManagementChartRecordEventIllegalDropBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  async load(date: Date) {
    let division = await this.global.division.selected;
    let data = await this.data(division.Id, date);
    let models = this.convert(data);
    return models;
  }

  private convert(
    source: EventNumberStatistic[]
  ): IGarbageManagementChartRecordEventData[] {
    let datas = source.map<IGarbageManagementChartRecordEventData>((data) => {
      let event = data.EventNumbers.find(
        (x) => x.EventType === EventType.IllegalDrop
      );
      let value = event?.DeltaNumber;
      return {
        time: data.BeginTime,
        value: value,
      };
    });

    return datas;
  }

  private async data(divisionId: string, date: Date) {
    let duration = DateTimeTool.allDay(date);
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    let paged = await this.service.eventNumber.history.list(divisionId, params);
    return paged.Data;
  }
}
