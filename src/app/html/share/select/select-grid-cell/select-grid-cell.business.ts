import { Injectable } from '@angular/core';
import { GetGridCellsParams } from '../../../../common/network/request/grid-cell/grid-cell-request.params';
import { GridCellRequestService } from '../../../../common/network/request/grid-cell/grid-cell-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';

@Injectable()
export class SelectGridCellBusiness {
  constructor(
    private service: GridCellRequestService,
    private global: GlobalStorageService
  ) {}

  async load(divisionId?: string) {
    let params = new GetGridCellsParams();
    params.AncestorId = divisionId ?? (await this.global.division.default).Id;
    return this.service.array(params);
  }
}
