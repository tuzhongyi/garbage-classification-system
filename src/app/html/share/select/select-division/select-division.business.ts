import { Injectable } from '@angular/core';
import { GetDivisionsParams } from '../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../common/network/request/garbage/division/division-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';

@Injectable()
export class SelectDivisionBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  async load(divisionId?: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId ?? (await this.global.division.default).Id;
    return this.service.cache.all(params);
  }
}
