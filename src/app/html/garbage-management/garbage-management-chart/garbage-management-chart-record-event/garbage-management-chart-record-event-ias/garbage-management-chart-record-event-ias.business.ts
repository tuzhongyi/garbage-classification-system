import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { IasRequestService } from '../../../../../common/network/request/ias/ias-request.service';
import { GarbageManagementListRecordEventIasArgs } from '../../../garbage-management-list/garbage-management-list-record-event-ias/garbage-management-list-record-event-ias.model';
import { GarbageManagementChartRecordEventIasDayBusiness } from './service/garbage-management-chart-record-event-ias-day.business';
import { GarbageManagementChartRecordEventIasHourBusiness } from './service/garbage-management-chart-record-event-ias-hour.business';

@Injectable()
export class GarbageManagementChartRecordEventIasBusiness {
  constructor(service: IasRequestService) {
    this.service = {
      hour: new GarbageManagementChartRecordEventIasHourBusiness(service),
      day: new GarbageManagementChartRecordEventIasDayBusiness(service),
    };
  }

  private service: {
    hour: GarbageManagementChartRecordEventIasHourBusiness;
    day: GarbageManagementChartRecordEventIasDayBusiness;
  };

  async load(
    unit: TimeUnit,
    date: Date,
    args: GarbageManagementListRecordEventIasArgs
  ) {
    if (unit == TimeUnit.Day) {
      return this.service.hour.load(date, args);
    }
    return this.service.day.load(unit, date, args);
  }
}
