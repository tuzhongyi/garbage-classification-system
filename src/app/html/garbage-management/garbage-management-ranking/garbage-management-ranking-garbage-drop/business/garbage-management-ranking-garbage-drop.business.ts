import { Injectable } from '@angular/core';
import { DivisionType } from '../../../../../common/enum/division-type.enum';
import { DivisionNumberStatistic } from '../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { IGarbageManagementRankingConverter } from '../../component/garbage-management-ranking.model';
import { GarbageManagementRankingGarbageDropDivisionBusiness } from './garbage-management-ranking-garbage-drop-division.business';
import { GarbageManagementRankingGarbageDropStationBusiness } from './garbage-management-ranking-garbage-drop-station.business';

@Injectable()
export class GarbageManagementRankingGarbageDropBusiness {
  constructor(
    division: DivisionRequestService,
    station: GarbageStationRequestService,
    private global: GlobalStorageService
  ) {
    this.division = new GarbageManagementRankingGarbageDropDivisionBusiness(
      division
    );
    this.station = new GarbageManagementRankingGarbageDropStationBusiness(
      station
    );
  }

  private station: GarbageManagementRankingGarbageDropStationBusiness;
  private division: GarbageManagementRankingGarbageDropDivisionBusiness;

  async load(
    date: Date,
    converter: IGarbageManagementRankingConverter<
      DivisionNumberStatistic | GarbageStationNumberStatistic
    >
  ) {
    let division = await this.global.division.selected;
    if (division.DivisionType === DivisionType.Committees) {
      return this.station.load(date, division.Id, converter);
    } else {
      return this.division.load(date, division.Id, converter);
    }
  }
}
