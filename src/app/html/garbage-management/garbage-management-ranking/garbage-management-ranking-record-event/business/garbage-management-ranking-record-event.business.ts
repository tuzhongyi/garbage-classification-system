import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';

import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { DivisionNumberStatistic } from '../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { IGarbageManagementRankingConverter } from '../../component/garbage-management-ranking.model';
import { GarbageManagementRankingRecordEventIndex } from '../garbage-management-ranking-record-event.model';
import { GarbageManagementRankingGarbageDropCountConverter } from './converter/garbage-management-ranking-garbage-drop-count.converter';
import { GarbageManagementRankingGarbageDropDurationConverter } from './converter/garbage-management-ranking-garbage-drop-duration.converter';
import { GarbageManagementRankingRecordEventConverter } from './converter/garbage-management-ranking-record-event-other.converter';
import { GarbageManagementRankingRecordEventService } from './service/garbage-management-ranking-record-event.service';

@Injectable()
export class GarbageManagementRankingRecordEventBusiness {
  constructor(private service: GarbageManagementRankingRecordEventService) {}

  load(
    index: GarbageManagementRankingRecordEventIndex,
    unit: TimeUnit,
    date: Date
  ) {
    switch (index) {
      case GarbageManagementRankingRecordEventIndex.garbagedropduration:
        return this._load(this.converter.garbage.drop.duration, unit, date);
      case GarbageManagementRankingRecordEventIndex.garbagedropcount:
        return this._load(this.converter.garbage.drop.count, unit, date);
      case GarbageManagementRankingRecordEventIndex.illegaldrop:
        return this._load(
          this.converter.event,
          unit,
          date,
          EventType.IllegalDrop
        );
      case GarbageManagementRankingRecordEventIndex.mixedinto:
        return this._load(
          this.converter.event,
          unit,
          date,
          EventType.MixedInto
        );
      case GarbageManagementRankingRecordEventIndex.garbagefull:
        return this._load(
          this.converter.event,
          unit,
          date,
          EventType.GarbageFull
        );
      case GarbageManagementRankingRecordEventIndex.illegalvehicle:
        return this._load(
          this.converter.event,
          unit,
          date,
          EventType.IllegalVehicle
        );
      default:
        throw new Error('没有该事件');
    }
  }

  private async _load(
    converter: IGarbageManagementRankingConverter<
      GarbageStationNumberStatistic | DivisionNumberStatistic
    >,
    unit: TimeUnit,
    date: Date,
    type?: EventType
  ) {
    let datas = await this.service.load(unit, date);
    let models = datas
      .map((data) => converter.convert(data, type))
      .sort((a, b) => LocaleCompare.compare(a.value, b.value, false));
    return models;
  }

  private converter = {
    garbage: {
      drop: {
        duration: new GarbageManagementRankingGarbageDropDurationConverter(),
        count: new GarbageManagementRankingGarbageDropCountConverter(),
      },
    },
    event: new GarbageManagementRankingRecordEventConverter(),
  };
}
