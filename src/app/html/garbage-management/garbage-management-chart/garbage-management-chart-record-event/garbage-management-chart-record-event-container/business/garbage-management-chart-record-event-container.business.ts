import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { EventNumberStatistic } from '../../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { IGarbageManagementChartRecordEventSource } from '../../garbage-management-chart-record-event.model';
import { GarbageManagementChartRecordEventService } from './garbage-management-chart-record-event-container.service';

@Injectable()
export class GarbageManagementChartRecordEventBusiness {
  constructor(
    private service: GarbageManagementChartRecordEventService,
    private global: GlobalStorageService
  ) {}

  async load(type: EventType, unit: TimeUnit, date: Date) {
    let division = await this.global.division.selected;
    let data = await this.service.history(division.Id, unit, date);
    let models = this.convert(data, type);
    return models;
  }

  private convert(
    source: EventNumberStatistic[],
    type: EventType
  ): IGarbageManagementChartRecordEventSource[] {
    let datas = source.map<IGarbageManagementChartRecordEventSource>((data) => {
      let event = data.EventNumbers.find((x) => x.EventType === type);
      let value = event?.DeltaNumber;
      return {
        time: data.BeginTime,
        value: value,
      };
    });

    return datas;
  }
}
