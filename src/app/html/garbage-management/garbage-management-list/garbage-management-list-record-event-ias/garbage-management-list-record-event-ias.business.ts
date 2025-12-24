import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GetIasEventsParams } from '../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../common/network/request/ias/ias-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementListRecordEventIasArgs } from './garbage-management-list-record-event-ias.model';

@Injectable()
export class GarbageManagementListRecordEventIasBusiness {
  constructor(
    private service: IasRequestService,
    private global: GlobalStorageService
  ) {}

  async load(unit: TimeUnit, args: GarbageManagementListRecordEventIasArgs) {
    let division = await this.global.division.selected;
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let params = new GetIasEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [division.Id];
    params.EventType = 103;
    params.Desc = 'EventTime';
    if (args.gridcellId) {
      params.GridCellIds = [args.gridcellId];
    }
    return this.service.event.cache.array(params);
  }
}
