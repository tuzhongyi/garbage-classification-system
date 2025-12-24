import { Injectable } from '@angular/core';
import { IDivision } from '../../../../common/network/model/garbage-station/division.model';
import { GetGridCellsParams } from '../../../../common/network/request/grid-cell/grid-cell-request.params';
import { GridCellRequestService } from '../../../../common/network/request/grid-cell/grid-cell-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';

@Injectable()
export class GarbageManagementCardGridCellSelectionBusiness {
  constructor(
    private service: GridCellRequestService,
    private global: GlobalStorageService
  ) {
    this.division = new DivisionBusiness(global);
  }

  division: DivisionBusiness;

  async load() {
    let _default = await this.global.division.default;
    let params = new GetGridCellsParams();
    params.AncestorId = _default.Id;
    return this.service.array(params);
  }
}

class DivisionBusiness {
  constructor(private global: GlobalStorageService) {}
  default() {
    return this.global.division.default;
  }

  selected() {
    return this.global.division.selected;
  }
  select(data: IDivision) {
    this.global.division.select(data);
  }
}
