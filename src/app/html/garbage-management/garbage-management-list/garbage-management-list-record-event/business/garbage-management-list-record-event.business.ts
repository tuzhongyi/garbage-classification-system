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

import { StationType } from '../../../../../common/enum/station-type.enum';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { GetGarbageStationsParams } from '../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class GarbageManagementListRecordEventBusiness {
  constructor(
    event: EventRequestService,
    ias: IasRequestService,
    private station: GarbageStationRequestService,
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

  async load(unit: TimeUnit, types: StationType[]) {
    let division = await this.global.division.selected;

    let items: GarbageManagementListRecordEventItem<IEventRecord>[] = [];
    let duration = DateTimeTool.TimeUnit(unit, new Date());

    let stationIds: string[] = [];
    if (types.length > 0) {
      let params = new GetGarbageStationsParams();
      params.StationTypes = types;
      let stations = await this.station.cache.array(params);
      stationIds = stations.map((s) => s.Id);
    }

    let all = [
      this.service.garbagedrop.load(division.Id, duration, stationIds),
      // this.service.garbagefull.load(division.Id, duration),
      // this.service.mixedinto.load(division.Id, duration),
      // this.service.ias.load(division.Id, duration),
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
