import { Injectable } from '@angular/core';
import { DivisionType } from '../../../../../common/enum/division-type.enum';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { GarbageManagementRankingRecordEventDivisionBusiness } from './garbage-management-ranking-record-event-division.business';
import { GarbageManagementRankingRecordEventStationBusiness } from './garbage-management-ranking-record-event-station.business';

@Injectable()
export class GarbageManagementRankingRecordEventBusiness {
  constructor(
    private station: GarbageManagementRankingRecordEventStationBusiness,
    private division: GarbageManagementRankingRecordEventDivisionBusiness,
    private global: GlobalStorageService
  ) {}

  async load(type: EventType, date: Date) {
    let division = await this.global.division.selected;
    if (division.DivisionType === DivisionType.Committees) {
      return this.station.load(type, date, division.Id);
    } else {
      return this.division.load(type, date, division.Id);
    }
  }
}
