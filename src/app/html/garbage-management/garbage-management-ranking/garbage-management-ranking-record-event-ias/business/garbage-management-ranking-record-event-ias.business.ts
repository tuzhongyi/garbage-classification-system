import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { EventNumberStatistic } from '../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GridCell } from '../../../../../common/network/model/garbage-station/grid-cell.model';
import { GarbageManagementRankingRecordEventIasDivisionBusiness } from './division/garbage-management-ranking-record-event-ias-division.business';
import { GarbageManagementRankingRecordEventIasConverter } from './garbage-management-ranking-record-event-ias.converter';
import { IasRecordEventStatisticType } from './garbage-management-ranking-record-event-ias.model';
import { GarbageManagementRankingRecordEventIasGridBusiness } from './grid/garbage-management-ranking-record-event-ias-grid.business';

@Injectable()
export class GarbageManagementRankingRecordEventIasBusiness {
  constructor(
    division: GarbageManagementRankingRecordEventIasDivisionBusiness,
    grid: GarbageManagementRankingRecordEventIasGridBusiness
  ) {
    this.service = { division, grid };
  }

  private service: {
    division: GarbageManagementRankingRecordEventIasDivisionBusiness;
    grid: GarbageManagementRankingRecordEventIasGridBusiness;
  };
  private converter = new GarbageManagementRankingRecordEventIasConverter();

  async load(type: IasRecordEventStatisticType, unit: TimeUnit, date: Date) {
    let datas: KeyValue<GridCell | Division, EventNumberStatistic[]>[];
    switch (type) {
      case IasRecordEventStatisticType.division:
        datas = await this.service.division.load(unit, date);
        break;
      case IasRecordEventStatisticType.grid:
        datas = await this.service.grid.load(unit, date);
        break;
      default:
        return [];
    }
    let models = datas.map((x) => this.converter.convert(x.key, x.value));
    return models;
  }
}
