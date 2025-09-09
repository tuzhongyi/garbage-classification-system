import { Injectable } from '@angular/core';
import { GetDivisionsParams } from '../../../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';

@Injectable()
export class GarbageManagementRankingRecordEventIasDivisionService {
  constructor(private service: DivisionRequestService) {}

  load(divisionId?: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    return this.service.cache.all(params);
  }
}
