import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { IIdNameModel } from '../../../../../../common/network/model/model.interface';
import { Language } from '../../../../../../common/tools/language';
import { StatisticType } from '../garbage-management-station-statistic-details.model';

@Injectable()
export class GarbageManagementStationStatisticDetailsManagerSource {
  stations: GarbageStation[] = [];
  types: IIdNameModel<number>[];
  units: IIdNameModel<number>[];
  constructor() {
    this.types = this.init.type();
    this.units = this.init.unit();
  }

  private init = {
    type: () => {
      return [
        { Id: StatisticType.garde, Name: '达标率' },
        { Id: StatisticType.avgGarbageTime, Name: '平均落地时长' },
        { Id: StatisticType.maxGarbageTime, Name: '最大落地时长' },
        { Id: StatisticType.garbageDuration, Name: '总落地时长' },
        { Id: StatisticType.illegalDrop, Name: '垃圾落地' },
        { Id: StatisticType.mixedInto, Name: '混合投放' },
      ];
    },
    unit: () => {
      return [
        { Id: TimeUnit.Week, Name: Language.TimeUnit(TimeUnit.Week) },
        { Id: TimeUnit.Month, Name: Language.TimeUnit(TimeUnit.Month) },
        { Id: TimeUnit.Year, Name: Language.TimeUnit(TimeUnit.Year) },
      ];
    },
  };
}
