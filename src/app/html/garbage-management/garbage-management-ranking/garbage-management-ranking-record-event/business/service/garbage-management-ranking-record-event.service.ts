import { Injectable } from '@angular/core';
import { DivisionType } from '../../../../../../common/enum/division-type.enum';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { GarbageManagementRankingRecordEventDivisionService } from './garbage-management-ranking-record-event-division.service';
import { GarbageManagementRankingRecordEventStationService } from './garbage-management-ranking-record-event-station.service';

@Injectable()
export class GarbageManagementRankingRecordEventService {
  constructor(
    station: GarbageStationRequestService,
    division: DivisionRequestService,
    private global: GlobalStorageService
  ) {
    this.station = new GarbageManagementRankingRecordEventStationService(
      station
    );
    this.division = new GarbageManagementRankingRecordEventDivisionService(
      division
    );
  }

  private station: GarbageManagementRankingRecordEventStationService;
  private division: GarbageManagementRankingRecordEventDivisionService;

  async load(unit: TimeUnit, date: Date) {
    let division = await this.global.division.selected;
    if (division.DivisionType === DivisionType.Committees) {
      return this.station.load(division.Id, unit, date);
    } else {
      return this.division.load(division.Id, unit, date);
    }
  }
}
