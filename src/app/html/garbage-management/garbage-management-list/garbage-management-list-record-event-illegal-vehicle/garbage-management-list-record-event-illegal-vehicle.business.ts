import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { EventRequestService } from '../../../../common/network/request/garbage/event/event-request.service';
import { GetIllegalVehicleEventRecordsParams } from '../../../../common/network/request/garbage/event/illegal-vehicle/event-request-illegal-vehicle.params';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementListRecordEventIllegalVehicleBusiness {
  constructor(
    private service: EventRequestService,
    private global: GlobalStorageService
  ) {}

  async load(unit: TimeUnit) {
    let division = await this.global.division.selected;
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let params = new GetIllegalVehicleEventRecordsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [division.Id];
    return this.service.record.IllegalVehicle.all(params);
  }
}
