import { Injectable } from '@angular/core';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';

import { KeyValue } from '@angular/common';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { EventNumberStatistic } from '../../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GridCell } from '../../../../../../common/network/model/garbage-station/grid-cell.model';
import { GetIasEventNumbersParams } from '../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { wait } from '../../../../../../common/tools/tools';
import { GarbageManagementRankingRecordEventIasGridService } from './garbage-management-ranking-record-event-ias-grid.service';

@Injectable()
export class GarbageManagementRankingRecordEventIasGridBusiness {
  constructor(
    grid: GarbageManagementRankingRecordEventIasGridService,
    ias: IasRequestService,
    private global: GlobalStorageService
  ) {
    this.service = { grid, ias };
  }

  private service: {
    grid: GarbageManagementRankingRecordEventIasGridService;
    ias: IasRequestService;
  };

  async load(unit: TimeUnit, date: Date) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let _default = await this.global.division.default;
    let grids = await this.service.grid.load(_default.Id);
    let keyvalues: KeyValue<GridCell, EventNumberStatistic[]>[] = [];

    for (let i = 0; i < grids.length; i++) {
      this.item(grids[i], duration).then((x) => {
        keyvalues.push(x);
      });
    }

    return new Promise<KeyValue<GridCell, EventNumberStatistic[]>[]>(
      (resolve) => {
        wait(
          () => {
            return keyvalues.length === grids.length;
          },
          () => {
            resolve(keyvalues);
          }
        );
      }
    );
  }

  private async item(grid: GridCell, duration: Duration) {
    let params = new GetIasEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.GridCellId = grid.Id;
    params.IasEventTypes = [103];
    let response = await this.service.ias.event.numbers(params);
    return {
      key: grid,
      value: response,
    };
  }
}
