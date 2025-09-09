import { Injectable } from '@angular/core';
import { GetGridCellsParams } from '../../../../common/network/request/grid-cell/grid-cell-request.params';
import { GridCellRequestService } from '../../../../common/network/request/grid-cell/grid-cell-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';

@Injectable()
export class GarbageManagementMapGridBusiness {
  constructor(
    private service: GridCellRequestService,
    private global: GlobalStorageService
  ) {}
  async load() {
    let division = await this.global.division.selected;
    let params = new GetGridCellsParams();
    params.AncestorId = division.Id;
    return this.service.all(params);
  }
}
