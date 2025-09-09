import { Injectable } from '@angular/core';
import { GetGridCellsParams } from '../../../../../../common/network/request/grid-cell/grid-cell-request.params';
import { GridCellRequestService } from '../../../../../../common/network/request/grid-cell/grid-cell-request.service';

@Injectable()
export class GarbageManagementRankingRecordEventIasGridService {
  constructor(private service: GridCellRequestService) {}

  load(divisionId?: string) {
    let params = new GetGridCellsParams();
    params.AncestorId = divisionId;
    return this.service.all(params);
  }
}
