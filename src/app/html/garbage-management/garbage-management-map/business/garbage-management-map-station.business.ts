import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from '../../../../common/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';

@Injectable()
export class GarbageManagementMapStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private global: GlobalStorageService
  ) {}
  async load() {
    let division = await this.global.division.selected;
    let params = new GetGarbageStationsParams();
    params.AncestorId = division.Id;
    let stations = await this.service.all(params);

    return stations;
  }
}
