import { Injectable } from '@angular/core';
import { GetDivisionsParams } from '../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../common/network/request/garbage/division/division-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';

@Injectable()
export class GarbageManagementMapDivisionBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}
  async load() {
    let division = await this.global.division.default;
    let params = new GetDivisionsParams();
    params.ParentId = division.Id;
    let stations = await this.service.all(params);

    return stations;
  }
}
