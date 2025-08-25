import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import {
  GetDivisionStatisticNumbersParams,
  GetDivisionsParams,
} from '../../../../../common/network/request/division/division-request.params';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { GarbageManagementRankingRecordEventConverter } from './garbage-management-ranking-record-event.converter';

@Injectable()
export class GarbageManagementRankingRecordEventDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  private converter = new GarbageManagementRankingRecordEventConverter();

  async load(type: EventType, date: Date, divisionId: string) {
    let children = await this.children(divisionId);
    let datas = await this.data(children, date);
    let models = datas
      .map((data) => this.converter.convert(type, data))
      .sort((a, b) => LocaleCompare.compare(a.value, b.value, false));
    return models;
  }

  private children(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    return this.service.cache.all(params);
  }

  private async data(divisions: Division[], date: Date) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = divisions.map((x) => x.Id);
    let paged = await this.service.statistic.number.cache.list(params);
    return paged.Data;
  }
}
