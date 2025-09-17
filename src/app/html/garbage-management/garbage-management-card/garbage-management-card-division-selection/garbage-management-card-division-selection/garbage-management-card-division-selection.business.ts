import { EventEmitter, Injectable } from '@angular/core';
import { IDivision } from '../../../../../common/network/model/garbage-station/division.model';
import { GetDivisionsParams } from '../../../../../common/network/request/garbage/division/division-request.params';
import { DivisionRequestService } from '../../../../../common/network/request/garbage/division/division-request.service';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';

@Injectable()
export class GarbageManagementCardDivisionSelectionBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {
    this.global.division.change.subscribe((x) => {
      this.change.emit(x);
    });
  }

  change = new EventEmitter<IDivision>();

  default() {
    return this.global.division.default;
  }

  selected() {
    return this.global.division.selected;
  }

  async load() {
    let _default = await this.global.division.default;
    let params = new GetDivisionsParams();
    params.ParentId = _default.Id;
    return this.service.all(params);
  }

  select(data: IDivision) {
    this.global.division.select(data);
  }
}
