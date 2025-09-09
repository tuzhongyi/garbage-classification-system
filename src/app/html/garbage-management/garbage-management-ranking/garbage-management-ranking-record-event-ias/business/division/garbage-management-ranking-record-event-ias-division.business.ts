import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Division } from '../../../../../../common/network/model/garbage-station/division.model';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { EventNumberStatistic } from '../../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GetIasEventNumbersParams } from '../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { wait } from '../../../../../../common/tools/tools';
import { GarbageManagementRankingRecordEventIasDivisionService } from './garbage-management-ranking-record-event-ias-division.service';

@Injectable()
export class GarbageManagementRankingRecordEventIasDivisionBusiness {
  constructor(
    division: GarbageManagementRankingRecordEventIasDivisionService,
    ias: IasRequestService,
    private global: GlobalStorageService
  ) {
    this.service = { division, ias };
  }

  private service: {
    division: GarbageManagementRankingRecordEventIasDivisionService;
    ias: IasRequestService;
  };

  async load(unit: TimeUnit, date: Date) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let _default = await this.global.division.default;
    let divisions = await this.service.division.load(_default.Id);
    let keyvalues: KeyValue<Division, EventNumberStatistic[]>[] = [];

    for (let i = 0; i < divisions.length; i++) {
      this.item(divisions[i], duration).then((x) => {
        keyvalues.push(x);
      });
    }

    return new Promise<KeyValue<Division, EventNumberStatistic[]>[]>(
      (resolve) => {
        wait(
          () => {
            return keyvalues.length === divisions.length;
          },
          () => {
            resolve(keyvalues);
          }
        );
      }
    );
  }

  private async item(
    division: Division,
    duration: Duration
  ): Promise<KeyValue<Division, EventNumberStatistic[]>> {
    let params = new GetIasEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionId = division.Id;
    params.IasEventTypes = [103];
    let response = await this.service.ias.event.numbers(params);
    return {
      key: division,
      value: response,
    };
  }
}
