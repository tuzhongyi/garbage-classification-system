import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';

@Injectable()
export class SelectGarbageStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    return this.service.cache.all(params);
  }
}
