import { Injectable } from '@angular/core';
import { EventRequestService } from '../../../../../common/network/request/garbage/event/event-request.service';
import { IasRequestService } from '../../../../../common/network/request/ias/ias-request.service';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { GarbageManagementListRecordEventItem } from './garbage-management-list-record-event.model';
import { GarbageManagementListRecordEventGarbageDropBusiness } from './service/garbage-management-list-record-event-garbage-drop.business';
import { GarbageManagementListRecordEventGarbageFullBusiness } from './service/garbage-management-list-record-event-garbage-full.business';
import { GarbageManagementListRecordEventIasBusiness } from './service/garbage-management-list-record-event-ias.service';
import { GarbageManagementListRecordEventMixedIntoBusiness } from './service/garbage-management-list-record-event-mixed-into.business';

import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementListRecordEventBusiness {
  constructor(
    event: EventRequestService,
    ias: IasRequestService,
    private global: GlobalStorageService
  ) {
    this.service = {
      garbagedrop: new GarbageManagementListRecordEventGarbageDropBusiness(
        event
      ),
      garbagefull: new GarbageManagementListRecordEventGarbageFullBusiness(
        event
      ),
      mixedinto: new GarbageManagementListRecordEventMixedIntoBusiness(event),
      ias: new GarbageManagementListRecordEventIasBusiness(ias),
    };
  }

  private service: {
    garbagedrop: GarbageManagementListRecordEventGarbageDropBusiness;
    garbagefull: GarbageManagementListRecordEventGarbageFullBusiness;
    mixedinto: GarbageManagementListRecordEventMixedIntoBusiness;
    ias: GarbageManagementListRecordEventIasBusiness;
  };

  async load(unit: TimeUnit) {
    let division = await this.global.division.selected;

    let items: GarbageManagementListRecordEventItem[] = [];
    let duration = DateTimeTool.TimeUnit(unit, new Date());

    let all = [
      this.service.garbagedrop.load(division.Id, duration),
      this.service.garbagefull.load(division.Id, duration),
      this.service.mixedinto.load(division.Id, duration),
      this.service.ias.load(division.Id, duration),
    ];

    let results = await Promise.all(all);
    results.forEach((x) => {
      items = items.concat(x);
    });
    items = items.sort((a, b) => {
      return LocaleCompare.compare(b.time, a.time);
    });
    return items;
  }
}
