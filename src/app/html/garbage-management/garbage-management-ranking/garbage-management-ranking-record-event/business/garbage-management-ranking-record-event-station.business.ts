import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { GetGarbageStationStatisticNumbersParams } from '../../../../../common/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage-station/garbage-station-request.service';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { GarbageManagementRankingRecordEventConverter } from './garbage-management-ranking-record-event.converter';

@Injectable()
export class GarbageManagementRankingRecordEventStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  private converter = new GarbageManagementRankingRecordEventConverter();

  async load(type: EventType, date: Date, divisionId: string) {
    let datas = await this.data(divisionId, date);
    let models = datas
      .map((data) => this.converter.convert(type, data))
      .sort((a, b) => LocaleCompare.compare(a.value, b.value, false));
    return models;
  }

  // private children(divisionId: string) {
  //   let params = new GetGarbageStationsParams();
  //   params.DivisionId = divisionId;
  //   return this.service.cache.all(params);
  // }

  private async data(divisionId: string, date: Date) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    let paged = await this.service.statistic.number.cache.list(params);
    return paged.Data;
  }
}
