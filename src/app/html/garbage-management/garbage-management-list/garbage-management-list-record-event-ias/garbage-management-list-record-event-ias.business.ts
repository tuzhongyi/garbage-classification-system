import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GetIasEventsParams } from '../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../common/network/request/ias/ias-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementListRecordEventIasBusiness {
  constructor(
    private service: IasRequestService,
    private global: GlobalStorageService
  ) {}

  async load(unit: TimeUnit) {
    let division = await this.global.division.selected;
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let params = new GetIasEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [division.Id];
    return this.service.event.cache.all(params);
  }
}
